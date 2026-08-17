import type { Metadata } from "next";
import { CONTACT_DETAILS, SERVICE_AREAS } from "@/data/site";

export const SITE_NAME = "Bridge The Gap Educational Services";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.bridgethegapeducationalservices.co.za";
export const SITE_DESCRIPTION =
  "Bridge The Gap Educational Services delivers tutoring services, matric support, teacher professional development, and coaching across CAPS and IB curricula.";

// Kept as a compact, factual reference for any internal consumers. Search engines do
// not need a large legacy meta-keywords tag, so buildPageMetadata does not emit one.
export const SITE_KEYWORDS = [
  "Bridge The Gap Educational Services",
  "tutoring services",
  "matric support",
  "teacher professional development",
  "coaching services",
  "CAPS curriculum",
  "IB curriculum",
  "South Africa education support",
];

const KNOWS_ABOUT_TOPICS = Array.from(
  new Set([
    ...SERVICE_AREAS.map((service) => service.title),
    ...SERVICE_AREAS.flatMap((service) => service.focusAreas),
    "CAPS curriculum",
    "IB curriculum",
  ])
);

const DEFAULT_OG_IMAGE = "/images/hero/hero-bg.webp";

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  // Retained for backwards compatibility with existing page declarations. Modern
  // search engines do not use meta keywords, so this is intentionally not emitted.
  keywords?: string[];
  noIndex?: boolean;
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
};

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

export function buildPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  noIndex = false,
  type = "website",
  image = DEFAULT_OG_IMAGE,
  publishedTime,
  modifiedTime,
  section,
}: BuildMetadataInput): Metadata {
  const pageTitle = title || SITE_NAME;
  const socialTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const fullUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

  return {
    // The root layout applies the site-name template once. Supplying an already
    // branded title here caused duplicate brand text in rendered page titles.
    title: pageTitle,
    description,
    alternates: {
      canonical: fullUrl,
      languages: {
        "en-ZA": fullUrl,
      },
    },
    openGraph: {
      type,
      url: fullUrl,
      siteName: SITE_NAME,
      locale: "en_ZA",
      title: socialTitle,
      description,
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime: modifiedTime || publishedTime,
            section,
          }
        : {}),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} preview image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [imageUrl],
    },
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: section || "Education",
    referrer: "origin-when-cross-origin",
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      google: googleVerification,
      other: bingVerification ? { "msvalidate.01": bingVerification } : undefined,
    },
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": absoluteUrl("#organization"),
    name: SITE_NAME,
    legalName: "Bridge The Gap Educational Services",
    url: SITE_URL,
    logo: absoluteUrl("/bridge-the-gap-icon.svg"),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    email: CONTACT_DETAILS.generalEmail,
    telephone: CONTACT_DETAILS.phoneIntl,
    description: SITE_DESCRIPTION,
    areaServed: [
      {
        "@type": "Country",
        name: "South Africa",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: CONTACT_DETAILS.phoneIntl,
        email: CONTACT_DETAILS.generalEmail,
        contactType: "customer support",
        areaServed: "ZA",
        availableLanguage: ["English"],
      },
    ],
    knowsAbout: KNOWS_ABOUT_TOPICS,
    sameAs: [
      CONTACT_DETAILS.instagramUrl,
      CONTACT_DETAILS.facebookUrl,
      CONTACT_DETAILS.linkedinUrl,
      CONTACT_DETAILS.googleProfileUrl,
    ],
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("#website"),
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-ZA",
    description: SITE_DESCRIPTION,
    publisher: {
      "@id": absoluteUrl("#organization"),
    },
    potentialAction: {
      "@type": "CommunicateAction",
      target: absoluteUrl("/contact#book"),
      name: "Book a consultation",
    },
  };
}

export function getWebPageSchema({
  name,
  path,
  description,
}: {
  name: string;
  path: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl(`${path}#webpage`),
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-ZA",
    isPartOf: {
      "@id": absoluteUrl("#website"),
    },
    about: {
      "@id": absoluteUrl("#organization"),
    },
  };
}

export function getBreadcrumbSchema(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function getServiceCatalogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Core Service Areas",
    itemListElement: SERVICE_AREAS.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/programmes/${service.slug}`),
      name: service.title,
      description: service.summary,
    })),
  };
}

export function getFaqSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
