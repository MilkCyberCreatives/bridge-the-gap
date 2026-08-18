import "server-only";

import type { ConsultationPayload } from "@/lib/booking";

type BackendBookingStatus = "reserved" | "confirmed" | "failed" | "cancelled";
type BackendCalendarStatus = "pending" | "created" | "skipped" | "conflict" | "failed";
type BackendNotificationStatus = "pending" | "delivered" | "skipped" | "failed";

type ReservationResult =
  | { status: "disabled" }
  | {
      status: "reserved";
      bookingId: string;
      duplicate: boolean;
      bookingStatus: BackendBookingStatus;
      calendarStatus: BackendCalendarStatus;
      notificationStatus: BackendNotificationStatus;
    }
  | { status: "conflict" }
  | { status: "unavailable" };

type BookingSync = {
  status?: BackendBookingStatus;
  calendarStatus?: BackendCalendarStatus;
  notificationStatus?: BackendNotificationStatus;
  providerReference?: string | null;
};

function backendUrl(): string | null {
  const configured = process.env.LARAVEL_BACKEND_URL?.trim();
  return configured ? configured.replace(/\/+$/, "") : null;
}

export async function reserveLaravelBooking(
  payload: ConsultationPayload,
  idempotencyKey: string
): Promise<ReservationResult> {
  const baseUrl = backendUrl();
  if (!baseUrl) return { status: "disabled" };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(`${baseUrl}/api/v1/bookings`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: "no-store",
    });

    if (response.status === 409) return { status: "conflict" };
    if (!response.ok) return { status: "unavailable" };

    const data = (await response.json()) as {
      ok?: boolean;
      bookingId?: string;
      status?: BackendBookingStatus;
      calendarStatus?: BackendCalendarStatus;
      notificationStatus?: BackendNotificationStatus;
      duplicate?: boolean;
    };

    if (
      data.ok !== true ||
      typeof data.bookingId !== "string" ||
      !data.status ||
      !data.calendarStatus ||
      !data.notificationStatus
    ) {
      return { status: "unavailable" };
    }

    return {
      status: "reserved",
      bookingId: data.bookingId,
      duplicate: Boolean(data.duplicate),
      bookingStatus: data.status,
      calendarStatus: data.calendarStatus,
      notificationStatus: data.notificationStatus,
    };
  } catch {
    return { status: "unavailable" };
  } finally {
    clearTimeout(timeout);
  }
}

export async function syncLaravelBooking(
  bookingId: string | null,
  sync: BookingSync
): Promise<void> {
  const baseUrl = backendUrl();
  const token = process.env.LARAVEL_SERVICE_TOKEN?.trim();
  if (!baseUrl || !token || !bookingId) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);

  try {
    await fetch(`${baseUrl}/api/v1/bookings/${encodeURIComponent(bookingId)}/sync`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sync),
      signal: controller.signal,
      cache: "no-store",
    });
  } catch {
    // Provider-status reconciliation is best-effort and must never lose the user booking response.
  } finally {
    clearTimeout(timeout);
  }
}
