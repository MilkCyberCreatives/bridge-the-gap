import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isSlotAvailable, createBookingCalendarEvent } from "@/lib/calendar";
import { sendConsultationNotification } from "@/lib/notifications";
import { validateConsultationPayload } from "@/lib/booking";
import { consumeRateLimit } from "@/lib/rate-limit";
import {
  reserveLaravelBooking,
  syncLaravelBooking,
} from "@/lib/laravel-backend";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
};

const MAX_REQUEST_BYTES = 24_000;
const CONSULTATION_LIMIT = 5;
const CONSULTATION_WINDOW_MS = 10 * 60 * 1000;

function responseHeaders(requestId: string, extra: Record<string, string> = {}) {
  return {
    ...NO_STORE_HEADERS,
    "X-Request-ID": requestId,
    ...extra,
  };
}

export async function POST(req: Request) {
  const requestId = randomUUID();
  let backendBookingId: string | null = null;

  const rateLimit = consumeRateLimit(
    req,
    "consultation",
    CONSULTATION_LIMIT,
    CONSULTATION_WINDOW_MS
  );

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: "Too many booking attempts. Please try again shortly.",
      },
      {
        status: 429,
        headers: responseHeaders(requestId, {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        }),
      }
    );
  }

  const contentType = req.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { ok: false, message: "Unsupported request format." },
      { status: 415, headers: responseHeaders(requestId) }
    );
  }

  const contentLength = Number(req.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json(
      { ok: false, message: "Request is too large." },
      { status: 413, headers: responseHeaders(requestId) }
    );
  }

  const origin = req.headers.get("origin");
  if (origin && origin !== new URL(req.url).origin) {
    return NextResponse.json(
      { ok: false, message: "Request origin is not allowed." },
      { status: 403, headers: responseHeaders(requestId) }
    );
  }

  try {
    const body = await req.json();
    const validation = validateConsultationPayload(body);
    if (!validation.ok) {
      return NextResponse.json(
        { ok: false, message: validation.message },
        { status: 400, headers: responseHeaders(requestId) }
      );
    }

    const payload = validation.data;
    const suppliedIdempotencyKey = req.headers.get("idempotency-key")?.trim();
    const idempotencyKey = suppliedIdempotencyKey || requestId;

    const reservation = await reserveLaravelBooking(payload, idempotencyKey);

    if (reservation.status === "conflict") {
      return NextResponse.json(
        {
          ok: false,
          message:
            "The selected slot is no longer available. Please select another time.",
        },
        { status: 409, headers: responseHeaders(requestId) }
      );
    }

    if (reservation.status === "unavailable") {
      console.warn("Laravel booking persistence temporarily unavailable", { requestId });
    }

    if (reservation.status === "reserved") {
      backendBookingId = reservation.bookingId;

      if (reservation.duplicate) {
        if (reservation.bookingStatus === "failed") {
          return NextResponse.json(
            {
              ok: false,
              message:
                "The previous booking attempt could not be completed. Please try again.",
            },
            { status: 503, headers: responseHeaders(requestId) }
          );
        }

        if (reservation.bookingStatus === "cancelled") {
          return NextResponse.json(
            {
              ok: false,
              message: "This booking request was cancelled. Please submit a new request.",
            },
            { status: 409, headers: responseHeaders(requestId) }
          );
        }

        return NextResponse.json(
          {
            ok: true,
            bookingId: reservation.bookingId,
            notificationDelivered: reservation.notificationStatus === "delivered",
            calendarLinked: reservation.calendarStatus === "created",
            bookingPending: reservation.bookingStatus === "reserved",
          },
          {
            status: reservation.bookingStatus === "reserved" ? 202 : 200,
            headers: responseHeaders(requestId),
          }
        );
      }
    }

    if (payload.preferredDate && payload.preferredTime) {
      const available = await isSlotAvailable(
        payload.preferredDate,
        payload.preferredTime
      );
      if (!available) {
        await syncLaravelBooking(backendBookingId, {
          status: "failed",
          calendarStatus: "conflict",
          notificationStatus: "skipped",
        });

        return NextResponse.json(
          {
            ok: false,
            message:
              "The selected slot is no longer available. Please select another time.",
          },
          { status: 409, headers: responseHeaders(requestId) }
        );
      }
    }

    const calendar = await createBookingCalendarEvent(payload);
    if (calendar.status === "conflict") {
      await syncLaravelBooking(backendBookingId, {
        status: "failed",
        calendarStatus: "conflict",
        notificationStatus: "skipped",
      });

      return NextResponse.json(
        {
          ok: false,
          message:
            "The selected slot was just booked. Please select another available time.",
        },
        { status: 409, headers: responseHeaders(requestId) }
      );
    }

    const notification = await sendConsultationNotification(payload, calendar.link);
    const calendarStatus = calendar.status === "created" ? "created" : "skipped";
    const notificationStatus = notification.delivered
      ? "delivered"
      : notification.reason === "not-configured"
        ? "skipped"
        : "failed";

    if (calendar.status !== "created" && !notification.delivered) {
      await syncLaravelBooking(backendBookingId, {
        status: "failed",
        calendarStatus,
        notificationStatus,
      });

      return NextResponse.json(
        {
          ok: false,
          message:
            "The booking service is temporarily unavailable. Please contact us directly by email or WhatsApp.",
        },
        { status: 503, headers: responseHeaders(requestId) }
      );
    }

    await syncLaravelBooking(backendBookingId, {
      status: "confirmed",
      calendarStatus,
      notificationStatus,
    });

    return NextResponse.json(
      {
        ok: true,
        bookingId: backendBookingId,
        notificationDelivered: notification.delivered,
        calendarLinked: calendar.status === "created",
      },
      { headers: responseHeaders(requestId) }
    );
  } catch (error) {
    await syncLaravelBooking(backendBookingId, {
      status: "failed",
      calendarStatus: "failed",
      notificationStatus: "skipped",
    });

    console.error("Consultation API error", {
      requestId,
      errorType: error instanceof Error ? error.name : "unknown",
    });
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not process the request at this time. Please try again shortly.",
      },
      { status: 500, headers: responseHeaders(requestId) }
    );
  }
}
