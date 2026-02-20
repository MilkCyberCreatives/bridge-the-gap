import { SERVICE_AREAS } from "@/data/site";

export const SOUTH_AFRICA_OFFSET = "+02:00";
export const BOOKING_SLOT_MINUTES = 60;
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

export function getSelectableDates(numberOfDays = 21): string[] {
  const result: string[] = [];
  const now = new Date();

  for (let i = 0; i < numberOfDays; i += 1) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);

    const day = date.getDay();
    if (day === 0) continue;

    const isoDate = date.toISOString().slice(0, 10);
    result.push(isoDate);
  }

  return result;
}

export function buildSouthAfricaIsoDate(date: string, time: string): string {
  return `${date}T${time}:00${SOUTH_AFRICA_OFFSET}`;
}

export function validateConsultationPayload(input: unknown): ConsultationValidationResult {
  if (!input || typeof input !== "object") {
    return { ok: false, message: "Invalid request payload." };
  }

  const payload = input as Partial<ConsultationPayload>;
  const requiredFields: Array<keyof ConsultationPayload> = [
    "fullName",
    "email",
    "phone",
    "audience",
    "service",
    "curriculum",
    "message",
  ];

  for (const field of requiredFields) {
    if (!payload[field] || typeof payload[field] !== "string") {
      return { ok: false, message: `Missing required field: ${field}.` };
    }
  }

  const email = payload.email?.trim() ?? "";
  const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicEmailRegex.test(email)) {
    return { ok: false, message: "Please provide a valid email address." };
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

  const subjects = Array.isArray(payload.subjects)
    ? payload.subjects.filter((value): value is string => typeof value === "string")
    : [];

  return {
    ok: true,
    data: {
      fullName: payload.fullName?.trim() ?? "",
      email,
      phone: payload.phone?.trim() ?? "",
      organisation: payload.organisation?.trim() ?? "",
      audience: payload.audience?.trim() ?? "",
      service: payload.service?.trim() ?? "",
      curriculum: payload.curriculum?.trim() ?? "",
      subjects,
      otherSubject: payload.otherSubject?.trim() ?? "",
      preferredDate: payload.preferredDate,
      preferredTime: payload.preferredTime,
      message: payload.message?.trim() ?? "",
    },
  };
}
