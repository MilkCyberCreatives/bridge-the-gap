import { Resend } from "resend";
import { CONTACT_DETAILS } from "@/data/site";
import { type ConsultationPayload } from "@/lib/booking";

type NotificationResult = {
  delivered: boolean;
  reason?: string;
};

function buildEmailBody(payload: ConsultationPayload, calendarLink: string | null): string {
  const subjects =
    payload.subjects.length > 0
      ? payload.subjects.join(", ")
      : payload.otherSubject || "Not specified";

  const attributionLines = [
    payload.utmSource ? `UTM Source: ${payload.utmSource}` : "",
    payload.utmMedium ? `UTM Medium: ${payload.utmMedium}` : "",
    payload.utmCampaign ? `UTM Campaign: ${payload.utmCampaign}` : "",
    payload.utmTerm ? `UTM Term: ${payload.utmTerm}` : "",
    payload.utmContent ? `UTM Content: ${payload.utmContent}` : "",
    payload.landingPage ? `Landing page: ${payload.landingPage}` : "",
    payload.referrer ? `Referrer: ${payload.referrer}` : "",
  ].filter(Boolean);

  return [
    `New consultation request from ${payload.fullName}`,
    "",
    `Service: ${payload.service}`,
    `Audience: ${payload.audience}`,
    `Curriculum: ${payload.curriculum}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    payload.organisation ? `Organisation: ${payload.organisation}` : "",
    `Subjects / focus areas: ${subjects}`,
    payload.preferredDate ? `Preferred date: ${payload.preferredDate}` : "Preferred date: Not set",
    payload.preferredTime ? `Preferred time: ${payload.preferredTime}` : "Preferred time: Not set",
    calendarLink ? `Calendar event: ${calendarLink}` : "",
    ...(attributionLines.length > 0 ? ["", "Marketing attribution:", ...attributionLines] : []),
    "",
    "Client message:",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendConsultationNotification(
  payload: ConsultationPayload,
  calendarLink: string | null
): Promise<NotificationResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("Consultation notification skipped: RESEND_API_KEY is not configured.");
    return {
      delivered: false,
      reason: "RESEND_API_KEY is not configured.",
    };
  }

  const resend = new Resend(apiKey);
  const recipient = (
    process.env.BOOKING_RECIPIENT_EMAIL || CONTACT_DETAILS.bookingsEmail
  ).trim();
  const from = (
    process.env.BOOKING_FROM_EMAIL || "Bridge The Gap <bookings@updates.bridgethegap.co.za>"
  ).trim();

  await resend.emails.send({
    from,
    to: [recipient],
    replyTo: payload.email,
    subject: `New booking: ${payload.service} - ${payload.fullName}`,
    text: buildEmailBody(payload, calendarLink),
  });

  return { delivered: true };
}
