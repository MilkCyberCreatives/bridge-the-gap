import type { Metadata } from "next";
import { CONTACT_DETAILS, SERVICE_AREAS } from "@/data/site";

export const SITE_NAME = "Bridge The Gap Educational Services";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bridge-the-gap-delta.vercel.app";
export const SITE_DESCRIPTION =
  "Bridge The Gap Educational Services delivers tutoring services, matric support, teacher professional development, and coaching across CAPS and IB curricula.";
export const SITE_KEYWORDS = [
  "Bridge The Gap Educational Services",
  "RushedTech Educational Services",
  "CAPS tutoring",
  "IB tutoring",
  "matric rewrite support",
  "teacher professional development",
  "educator coaching",
  "school intervention programmes",
  "education support services",
];

const DEFAULT_OG_IMAGE = "/images/hero/hero-bg.webp";

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  type?: "website" | "article";
  image?: string;
};

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

export function buildPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  keywords = [],
  noIndex = false,
  type = "website",
  image = DEFAULT_OG_IMAGE,
}: BuildMetadataInput): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const fullUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

  return {
    title: fullTitle,
    description,
    keywords: [...SITE_KEYWORDS, ...keywords],
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
      title: fullTitle,
      description,
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
      title: fullTitle,
      description,
      images: [imageUrl],
    },
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
    legalName: "RushedTech Educational Services",
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
    knowsAbout: SERVICE_AREAS.map((service) => service.title),
    sameAs: [
      "https://bridge-the-gap-delta.vercel.app",
      "https://www.bridgethegapeducationalservices.co.za",
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
