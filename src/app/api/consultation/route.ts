import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isSlotAvailable, createBookingCalendarEvent } from "@/lib/calendar";
import { sendConsultationNotification } from "@/lib/notifications";
import { validateConsultationPayload } from "@/lib/booking";
import { consumeRateLimit } from "@/lib/rate-limit";

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

    if (payload.preferredDate && payload.preferredTime) {
      const available = await isSlotAvailable(
        payload.preferredDate,
        payload.preferredTime
      );
      if (!available) {
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

    if (calendar.status !== "created" && !notification.delivered) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "The booking service is temporarily unavailable. Please contact us directly by email or WhatsApp.",
        },
        { status: 503, headers: responseHeaders(requestId) }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        notificationDelivered: notification.delivered,
        calendarLinked: calendar.status === "created",
      },
      { headers: responseHeaders(requestId) }
    );
  } catch (error) {
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
