import { NextResponse } from "next/server";
import { isSlotAvailable, createBookingCalendarEvent } from "@/lib/calendar";
import { sendConsultationNotification } from "@/lib/notifications";
import { validateConsultationPayload } from "@/lib/booking";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = validateConsultationPayload(body);
    if (!validation.ok) {
      return NextResponse.json(
        { ok: false, message: validation.message },
        { status: 400 }
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
          { status: 409 }
        );
      }
    }

    const calendarLink = await createBookingCalendarEvent(payload);
    const notification = await sendConsultationNotification(payload, calendarLink);

    return NextResponse.json({
      ok: true,
      notificationDelivered: notification.delivered,
      notificationReason: notification.reason ?? null,
      calendarLinked: Boolean(calendarLink),
      calendarLink,
    });
  } catch (error) {
    console.error("Consultation API error:", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not process the request at this time. Please try again shortly.",
      },
      { status: 500 }
    );
  }
}
