import { google } from "googleapis";
import {
  BOOKING_SLOT_MINUTES,
  buildSouthAfricaIsoDate,
  getSlotsForDate,
  type AvailabilitySlot,
  type ConsultationPayload,
} from "@/lib/booking";

type BusyWindow = {
  start: string;
  end: string;
};

type CalendarClient = {
  calendar: ReturnType<typeof google.calendar>;
  calendarId: string;
};

export type CalendarBookingResult =
  | { status: "created"; link: string | null }
  | { status: "not-configured"; link: null }
  | { status: "conflict"; link: null };

function getCalendarClient(): CalendarClient | null {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;

  if (!calendarId || !clientEmail || !privateKeyRaw) {
    return null;
  }

  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return {
    calendar: google.calendar({ version: "v3", auth }),
    calendarId,
  };
}

function overlapsBusyWindow(startIso: string, endIso: string, busyWindows: BusyWindow[]): boolean {
  const start = new Date(startIso).getTime();
  const end = new Date(endIso).getTime();

  return busyWindows.some((window) => {
    const busyStart = new Date(window.start).getTime();
    const busyEnd = new Date(window.end).getTime();
    return start < busyEnd && end > busyStart;
  });
}

function getSlotEventId(date: string, time: string): string {
  return `btg${date.replace(/-/g, "")}${time.replace(":", "")}`;
}

export async function getAvailabilityForDate(date: string): Promise<AvailabilitySlot[]> {
  const slots = getSlotsForDate(date);
  const client = getCalendarClient();
  if (!client || slots.length === 0) return slots;

  const { calendar, calendarId } = client;
  const dayStartIso = buildSouthAfricaIsoDate(date, "00:00");
  const dayEndIso = buildSouthAfricaIsoDate(date, "23:59");

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: new Date(dayStartIso).toISOString(),
      timeMax: new Date(dayEndIso).toISOString(),
      items: [{ id: calendarId }],
    },
  });

  const rawBusyWindows = response.data.calendars?.[calendarId]?.busy ?? [];
  const busyWindows: BusyWindow[] = rawBusyWindows.filter(
    (window): window is BusyWindow =>
      typeof window.start === "string" && typeof window.end === "string"
  );

  return slots.map((slot) => {
    const slotStartIso = buildSouthAfricaIsoDate(date, slot.time);
    const slotEndIso = new Date(
      new Date(slotStartIso).getTime() + BOOKING_SLOT_MINUTES * 60 * 1000
    ).toISOString();

    return {
      ...slot,
      available: !overlapsBusyWindow(
        new Date(slotStartIso).toISOString(),
        slotEndIso,
        busyWindows
      ),
    };
  });
}

export async function isSlotAvailable(date: string, time: string): Promise<boolean> {
  const availability = await getAvailabilityForDate(date);
  const selected = availability.find((slot) => slot.time === time);
  return Boolean(selected?.available);
}

export async function createBookingCalendarEvent(
  payload: ConsultationPayload
): Promise<CalendarBookingResult> {
  const client = getCalendarClient();
  if (!client || !payload.preferredDate || !payload.preferredTime) {
    return { status: "not-configured", link: null };
  }

  const { calendar, calendarId } = client;
  const startIso = buildSouthAfricaIsoDate(payload.preferredDate, payload.preferredTime);
  const endIso = new Date(
    new Date(startIso).getTime() + BOOKING_SLOT_MINUTES * 60 * 1000
  ).toISOString();

  try {
    const event = await calendar.events.insert({
      calendarId,
      requestBody: {
        id: getSlotEventId(payload.preferredDate, payload.preferredTime),
        summary: `Consultation: ${payload.service} - ${payload.fullName}`,
        description: [
          `Audience: ${payload.audience}`,
          `Curriculum: ${payload.curriculum}`,
          `Phone: ${payload.phone}`,
          payload.organisation ? `Organisation: ${payload.organisation}` : "",
          payload.subjects.length > 0 ? `Subjects: ${payload.subjects.join(", ")}` : "",
          payload.otherSubject ? `Other subject/focus area: ${payload.otherSubject}` : "",
          "",
          "Client message:",
          payload.message,
        ]
          .filter(Boolean)
          .join("\n"),
        start: {
          dateTime: new Date(startIso).toISOString(),
          timeZone: "Africa/Johannesburg",
        },
        end: {
          dateTime: endIso,
          timeZone: "Africa/Johannesburg",
        },
        attendees: [{ email: payload.email }],
        visibility: "private",
      },
      sendUpdates: "all",
    });

    return { status: "created", link: event.data.htmlLink ?? null };
  } catch (error) {
    const status =
      (error as { code?: number; response?: { status?: number } })?.code ??
      (error as { response?: { status?: number } })?.response?.status;

    if (status === 409) {
      return { status: "conflict", link: null };
    }

    throw error;
  }
}
