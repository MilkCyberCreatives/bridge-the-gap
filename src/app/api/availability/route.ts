import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getAvailabilityForDate } from "@/lib/calendar";
import { isSelectableBookingDate } from "@/lib/booking";
import { consumeRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
};

function responseHeaders(requestId: string, extra: Record<string, string> = {}) {
  return {
    ...NO_STORE_HEADERS,
    "X-Request-ID": requestId,
    ...extra,
  };
}

export async function GET(req: Request) {
  const requestId = randomUUID();
  const rateLimit = consumeRateLimit(req, "availability", 60, 5 * 60 * 1000);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many availability requests. Please try again shortly." },
      {
        status: 429,
        headers: responseHeaders(requestId, {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        }),
      }
    );
  }

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date || !isSelectableBookingDate(date)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please select a date within the available booking window.",
      },
      { status: 400, headers: responseHeaders(requestId) }
    );
  }

  try {
    const slots = await getAvailabilityForDate(date);
    return NextResponse.json(
      { ok: true, date, slots },
      { headers: responseHeaders(requestId) }
    );
  } catch (error) {
    console.error("Availability API error", {
      requestId,
      errorType: error instanceof Error ? error.name : "unknown",
    });
    return NextResponse.json(
      { ok: false, message: "Could not load availability for the selected date." },
      { status: 500, headers: responseHeaders(requestId) }
    );
  }
}
