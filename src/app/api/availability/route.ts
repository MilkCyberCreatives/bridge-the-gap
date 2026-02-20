import { NextResponse } from "next/server";
import { getAvailabilityForDate } from "@/lib/calendar";
import { isIsoDateString } from "@/lib/booking";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date || !isIsoDateString(date)) {
    return NextResponse.json(
      { ok: false, message: "Please provide a valid date in YYYY-MM-DD format." },
      { status: 400 }
    );
  }

  try {
    const slots = await getAvailabilityForDate(date);
    return NextResponse.json({ ok: true, date, slots });
  } catch (error) {
    console.error("Availability API error:", error);
    return NextResponse.json(
      { ok: false, message: "Could not load availability for the selected date." },
      { status: 500 }
    );
  }
}
