import { NextResponse } from "next/server";
import { getAvailabilityForDate } from "@/lib/calendar";
import { isSelectableBookingDate } from "@/lib/booking";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date || !isSelectableBookingDate(date)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please select a date within the available booking window.",
      },
      { status: 400, headers: NO_STORE_HEADERS }
    );
  }

  try {
    const slots = await getAvailabilityForDate(date);
    return NextResponse.json(
      { ok: true, date, slots },
      { headers: NO_STORE_HEADERS }
    );
  } catch (error) {
    console.error("Availability API error:", error);
    return NextResponse.json(
      { ok: false, message: "Could not load availability for the selected date." },
      { status: 500, headers: NO_STORE_HEADERS }
    );
  }
}
