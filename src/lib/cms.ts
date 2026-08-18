import "server-only";

import { HOME_FAQS } from "@/data/faqs";
import { INSIGHT_POSTS } from "@/data/insights";
import { CONTACT_DETAILS, SERVICE_AREAS } from "@/data/site";
import { SUBJECTS } from "@/data/subjects";
import type {
  CmsBootstrap,
  CmsContactDetails,
  CmsFaq,
  CmsInsight,
  CmsProgramme,
  CmsSubject,
} from "@/lib/cms-types";

const STATIC_PROGRAMMES = SERVICE_AREAS as unknown as CmsProgramme[];
const STATIC_SUBJECTS = SUBJECTS as unknown as CmsSubject[];
const STATIC_INSIGHTS = INSIGHT_POSTS as unknown as CmsInsight[];
const STATIC_FAQS = HOME_FAQS as unknown as CmsFaq[];
const STATIC_CONTACT = CONTACT_DETAILS as unknown as CmsContactDetails;

function backendUrl(): string | null {
  const configured = process.env.LARAVEL_BACKEND_URL?.trim();
  if (!configured) return null;
  return configured.replace(/\/+$/, "");
}

async function fetchBackend(path: string): Promise<Record<string, unknown> | null> {
  const baseUrl = backendUrl();
  if (!baseUrl) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
      next: { revalidate: 60 },
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as unknown;
    if (!payload || typeof payload !== "object") return null;

    return payload as Record<string, unknown>;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function isContactDetails(value: unknown): value is CmsContactDetails {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return [
    "phoneLocal",
    "phoneIntl",
    "whatsappUrl",
    "bookingsEmail",
    "generalEmail",
    "instagramUrl",
    "facebookUrl",
    "linkedinUrl",
    "googleReviewUrl",
    "googleProfileUrl",
    "timezone",
  ].every((key) => typeof candidate[key] === "string" && candidate[key] !== "");
}

export function resolveCmsContactDetails(
  settings: Record<string, unknown>
): CmsContactDetails {
  const value = settings.contact_details;
  return isContactDetails(value) ? value : STATIC_CONTACT;
}

export async function getCmsBootstrap(): Promise<CmsBootstrap> {
  const payload = await fetchBackend("/api/v1/bootstrap");

  if (
    payload?.ok === true &&
    Array.isArray(payload.programmes) &&
    Array.isArray(payload.subjects) &&
    Array.isArray(payload.insights) &&
    Array.isArray(payload.faqs)
  ) {
    return {
      programmes: payload.programmes as CmsProgramme[],
      subjects: payload.subjects as CmsSubject[],
      insights: payload.insights as CmsInsight[],
      faqs: payload.faqs as CmsFaq[],
      settings:
        payload.settings && typeof payload.settings === "object"
          ? (payload.settings as Record<string, unknown>)
          : {},
      source: "laravel",
    };
  }

  return {
    programmes: STATIC_PROGRAMMES,
    subjects: STATIC_SUBJECTS,
    insights: STATIC_INSIGHTS,
    faqs: STATIC_FAQS,
    settings: {},
    source: "static",
  };
}

export async function getCmsContactDetails(): Promise<CmsContactDetails> {
  const cms = await getCmsBootstrap();
  return resolveCmsContactDetails(cms.settings);
}

export async function getCmsProgrammes(): Promise<CmsProgramme[]> {
  const payload = await fetchBackend("/api/v1/programmes");
  return payload?.ok === true && Array.isArray(payload.programmes)
    ? (payload.programmes as CmsProgramme[])
    : STATIC_PROGRAMMES;
}

export async function getCmsProgramme(slug: string): Promise<CmsProgramme | null> {
  const payload = await fetchBackend(`/api/v1/programmes/${encodeURIComponent(slug)}`);
  if (payload?.ok === true && payload.programme && typeof payload.programme === "object") {
    return payload.programme as CmsProgramme;
  }
  return STATIC_PROGRAMMES.find((item) => item.slug === slug) ?? null;
}

export async function getCmsSubjects(): Promise<CmsSubject[]> {
  const payload = await fetchBackend("/api/v1/subjects");
  return payload?.ok === true && Array.isArray(payload.subjects)
    ? (payload.subjects as CmsSubject[])
    : STATIC_SUBJECTS;
}

export async function getCmsSubject(slug: string): Promise<CmsSubject | null> {
  const payload = await fetchBackend(`/api/v1/subjects/${encodeURIComponent(slug)}`);
  if (payload?.ok === true && payload.subject && typeof payload.subject === "object") {
    return payload.subject as CmsSubject;
  }
  return STATIC_SUBJECTS.find((item) => item.slug === slug) ?? null;
}

export async function getCmsInsights(): Promise<CmsInsight[]> {
  const payload = await fetchBackend("/api/v1/insights");
  return payload?.ok === true && Array.isArray(payload.insights)
    ? (payload.insights as CmsInsight[])
    : STATIC_INSIGHTS;
}

export async function getCmsInsight(slug: string): Promise<CmsInsight | null> {
  const payload = await fetchBackend(`/api/v1/insights/${encodeURIComponent(slug)}`);
  if (payload?.ok === true && payload.insight && typeof payload.insight === "object") {
    return payload.insight as CmsInsight;
  }
  return STATIC_INSIGHTS.find((item) => item.slug === slug) ?? null;
}

export async function getCmsFaqs(): Promise<CmsFaq[]> {
  const payload = await fetchBackend("/api/v1/faqs");
  return payload?.ok === true && Array.isArray(payload.faqs)
    ? (payload.faqs as CmsFaq[])
    : STATIC_FAQS;
}
