import { SERVICE_AREAS } from "@/data/site";

export const SOUTH_AFRICA_OFFSET = "+02:00";
export const SOUTH_AFRICA_TIME_ZONE = "Africa/Johannesburg";
export const BOOKING_SLOT_MINUTES = 60;
export const BOOKING_WINDOW_DAYS = 21;
export const BUSINESS_HOURS = {
  start: 8,
  end: 17,
};

export type AvailabilitySlot = {
  time: string;
  label: string;
  available: boolean;
};

export type ConsultationPayload = {
  fullName: string;
  email: string;
  phone: string;
  organisation?: string;
  audience: string;
  service: string;
  curriculum: string;
  subjects: string[];
  otherSubject?: string;
  preferredDate?: string;
  preferredTime?: string;
  message: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  landingPage?: string;
  referrer?: string;
};

export type ConsultationValidationResult =
  | {
      ok: true;
      data: ConsultationPayload;
    }
  | {
      ok: false;
      message: string;
    };

export const SERVICE_OPTIONS = SERVICE_AREAS.map((service) => ({
  value: service.title,
  label: service.title,
}));

export const AUDIENCE_OPTIONS = [
  "Parent / Guardian",
  "Learner",
  "School Leader",
  "Teacher / Education Professional",
];

export const CURRICULUM_OPTIONS = ["CAPS", "IB", "CAPS and IB", "Other"];

export function isIsoDateString(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function getDayOfWeek(date: string): number {
  return new Date(`${date}T00:00:00Z`).getUTCDay();
}

export function createTimeLabel(time: string): string {
  const [hoursString, minutesString] = time.split(":");
  const hours = Number(hoursString);
  const minutes = Number(minutesString);
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${suffix}`;
}

export function getSlotsForDate(date: string): AvailabilitySlot[] {
  if (!isIsoDateString(date)) return [];

  const weekday = getDayOfWeek(date);
  if (weekday === 0) return [];

  const slots: AvailabilitySlot[] = [];
  for (let hour = BUSINESS_HOURS.start; hour < BUSINESS_HOURS.end; hour += 1) {
    const time = `${hour.toString().padStart(2, "0")}:00`;
    slots.push({
      time,
      label: createTimeLabel(time),
      available: true,
    });
  }

  return slots;
}

function getSouthAfricaDateParts(date: Date): {
  year: number;
  month: number;
  day: number;
} {
  const parts = new Intl.DateTimeFormat("en-ZA", {
    timeZone: SOUTH_AFRICA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = new Map(parts.map((part) => [part.type, part.value]));
  return {
    year: Number(values.get("year")),
    month: Number(values.get("month")),
    day: Number(values.get("day")),
  };
}

function formatUtcIsoDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isBusinessHourTime(time: string): boolean {
  if (!/^\d{2}:\d{2}$/.test(time)) return false;
  const [hourString, minuteString] = time.split(":");
  const hour = Number(hourString);
  const minute = Number(minuteString);

  if (!Number.isInteger(hour) || !Number.isInteger(minute)) return false;
  if (minute !== 0) return false;
  return hour >= BUSINESS_HOURS.start && hour < BUSINESS_HOURS.end;
}

export function getSelectableDates(numberOfDays = BOOKING_WINDOW_DAYS): string[] {
  const result: string[] = [];
  const today = getSouthAfricaDateParts(new Date());
  const start = new Date(Date.UTC(today.year, today.month - 1, today.day));

  for (let i = 0; i < numberOfDays; i += 1) {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + i);

    if (date.getUTCDay() === 0) continue;
    result.push(formatUtcIsoDate(date));
  }

  return result;
}

export function isSelectableBookingDate(
  value: string,
  numberOfDays = BOOKING_WINDOW_DAYS
): boolean {
  return isIsoDateString(value) && getSelectableDates(numberOfDays).includes(value);
}

export function buildSouthAfricaIsoDate(date: string, time: string): string {
  return `${date}T${time}:00${SOUTH_AFRICA_OFFSET}`;
}

export function validateConsultationPayload(input: unknown): ConsultationValidationResult {
  if (!input || typeof input !== "object") {
    return { ok: false, message: "Invalid request payload." };
  }

  const payload = input as Partial<ConsultationPayload>;
  const fullName = typeof payload.fullName === "string" ? payload.fullName.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const audience = typeof payload.audience === "string" ? payload.audience.trim() : "";
  const service = typeof payload.service === "string" ? payload.service.trim() : "";
  const curriculum =
    typeof payload.curriculum === "string" ? payload.curriculum.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const organisation =
    typeof payload.organisation === "string" ? payload.organisation.trim() : "";
  const otherSubject =
    typeof payload.otherSubject === "string" ? payload.otherSubject.trim() : "";

  if (!fullName || !email || !phone || !audience || !service || !curriculum || !message) {
    return { ok: false, message: "Please complete all required fields." };
  }

  const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.length > 254 || !basicEmailRegex.test(email)) {
    return { ok: false, message: "Please provide a valid email address." };
  }

  if (fullName.length > 120) {
    return { ok: false, message: "Full name is too long." };
  }

  if (phone.length > 30) {
    return { ok: false, message: "Phone number is too long." };
  }

  if (message.length > 2500) {
    return { ok: false, message: "Message is too long." };
  }

  if (organisation.length > 160 || otherSubject.length > 160) {
    return { ok: false, message: "Some optional fields are too long." };
  }

  if (!AUDIENCE_OPTIONS.includes(audience)) {
    return { ok: false, message: "Please select a valid audience type." };
  }

  if (!SERVICE_OPTIONS.some((option) => option.value === service)) {
    return { ok: false, message: "Please select a valid service." };
  }

  if (!CURRICULUM_OPTIONS.includes(curriculum)) {
    return { ok: false, message: "Please select a valid curriculum." };
  }

  if (
    (payload.preferredDate && !isIsoDateString(payload.preferredDate)) ||
    (payload.preferredTime && !/^\d{2}:\d{2}$/.test(payload.preferredTime))
  ) {
    return { ok: false, message: "Invalid booking date or time." };
  }

  if (payload.preferredDate && !payload.preferredTime) {
    return { ok: false, message: "Please choose a preferred time slot." };
  }

  if (payload.preferredTime && !payload.preferredDate) {
    return { ok: false, message: "Please choose a preferred date." };
  }

  if (payload.preferredDate && !isSelectableBookingDate(payload.preferredDate)) {
    return {
      ok: false,
      message: "Please select a date within the available booking window.",
    };
  }

  if (payload.preferredTime && !isBusinessHourTime(payload.preferredTime)) {
    return { ok: false, message: "Please select a valid business-hour time slot." };
  }

  const subjects = Array.isArray(payload.subjects)
    ? payload.subjects
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.trim())
        .filter(Boolean)
    : [];

  if (subjects.length > 20 || subjects.some((subject) => subject.length > 80)) {
    return { ok: false, message: "Please reduce subject selections." };
  }

  const optionalTrackingFields: Array<
    keyof Pick<
      ConsultationPayload,
      | "utmSource"
      | "utmMedium"
      | "utmCampaign"
      | "utmTerm"
      | "utmContent"
      | "landingPage"
      | "referrer"
    >
  > = [
    "utmSource",
    "utmMedium",
    "utmCampaign",
    "utmTerm",
    "utmContent",
    "landingPage",
    "referrer",
  ];

  for (const field of optionalTrackingFields) {
    const value = payload[field];
    if (value !== undefined && typeof value !== "string") {
      return { ok: false, message: `Invalid field: ${field}.` };
    }
    if (typeof value === "string" && value.length > 240) {
      return { ok: false, message: `Field too long: ${field}.` };
    }
  }

  return {
    ok: true,
    data: {
      fullName,
      email,
      phone,
      organisation,
      audience,
      service,
      curriculum,
      subjects,
      otherSubject,
      preferredDate: payload.preferredDate,
      preferredTime: payload.preferredTime,
      message,
      utmSource: payload.utmSource?.trim() ?? "",
      utmMedium: payload.utmMedium?.trim() ?? "",
      utmCampaign: payload.utmCampaign?.trim() ?? "",
      utmTerm: payload.utmTerm?.trim() ?? "",
      utmContent: payload.utmContent?.trim() ?? "",
      landingPage: payload.landingPage?.trim() ?? "",
      referrer: payload.referrer?.trim() ?? "",
    },
  };
}
