import type { Metadata } from "next";
import { CONTACT_DETAILS, SERVICE_AREAS } from "@/data/site";

export const SITE_NAME = "Bridge The Gap Educational Services";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.bridgethegapeducationalservices.co.za";
export const SITE_DESCRIPTION =
  "Bridge The Gap Educational Services delivers tutoring services, matric support, teacher professional development, and coaching across CAPS and IB curricula.";

const BRAND_KEYWORDS = [
  "Bridge The Gap",
  "Bridge The Gap Educational Services",
  "Bridge The Gap services",
  "Bridge The Gap tutoring",
  "Bridge The Gap matric support",
  "Bridge The Gap teacher development",
  "Bridge The Gap coaching",
];

const DIRECT_SERVICE_KEYWORDS = [
  "tutoring services",
  "academic tutoring",
  "private tutoring",
  "one-on-one tutoring",
  "one to one tutoring",
  "group tutoring",
  "school intervention tutoring",
  "learner support services",
  "study support services",
  "homework support",
  "exam preparation tutoring",
  "online tutoring",
  "in-person tutoring",
  "CAPS tutoring",
  "IB tutoring",
  "CAPS and IB tutoring",
  "matric support services",
  "matric tutoring",
  "matric rewrite support",
  "matric exam support",
  "subject addition support",
  "SBA portfolio support",
  "teacher professional development",
  "teacher training workshops",
  "teacher coaching",
  "educator development programmes",
  "instructional coaching",
  "professional learning for teachers",
  "coaching services",
  "learner coaching",
  "student coaching",
  "educator coaching",
  "school leadership coaching",
  "education support services",
  "education intervention services",
];

const CURRICULUM_AND_SUBJECT_KEYWORDS = [
  "CAPS curriculum support",
  "IB curriculum support",
  "CAPS exam prep",
  "IB exam prep",
  "curriculum aligned tutoring",
  "mathematics tutoring",
  "maths tutoring",
  "English tutoring",
  "physical sciences tutoring",
  "science tutoring",
  "life sciences tutoring",
  "accounting tutoring",
  "business studies tutoring",
  "economics tutoring",
  "IB mathematics tutoring",
  "IB science tutoring",
  "IB English tutoring",
  "mathematics exam preparation",
  "English exam preparation",
  "science exam preparation",
  "past paper practice",
  "assessment preparation support",
];

const AUDIENCE_AND_INTENT_KEYWORDS = [
  "support for school leaders",
  "support for parents and learners",
  "support for teachers",
  "support for education professionals",
  "school academic intervention programmes",
  "school performance improvement support",
  "parent learner support programme",
  "learner confidence building",
  "study habits coaching",
  "exam confidence coaching",
  "marks improvement support",
  "academic recovery support",
  "academic progress tracking",
  "education consulting support",
  "education strategy support",
];

const INDIRECT_COMPETITION_KEYWORDS = [
  "learning centre",
  "study centre",
  "after school programme",
  "after school tutoring",
  "homework club",
  "exam prep center",
  "test prep services",
  "academic enrichment programme",
  "academic mentorship",
  "student mentoring programme",
  "educational consulting",
  "education consultancy",
  "education solutions provider",
  "edtech support services",
  "supplemental education services",
  "remedial education support",
  "academic support company",
  "learning support company",
  "teacher upskilling programme",
  "teacher capacity building",
  "classroom support programme",
  "school improvement consultancy",
  "student success programme",
  "career and study coaching",
  "personal development coaching for students",
];

const GEO_AND_CHANNEL_KEYWORDS = [
  "South Africa tutoring services",
  "South Africa education support",
  "online education support",
  "online teacher development",
  "online coaching for learners",
  "hybrid tutoring model",
  "in person and online tutoring",
];

const CONVERSION_KEYWORDS = [
  "book tutoring consultation",
  "book matric support consultation",
  "book teacher development workshop",
  "book coaching consultation",
  "education consultation services",
  "academic support consultation",
  "school intervention consultation",
  "free education consultation",
];

export const SITE_KEYWORDS = Array.from(
  new Set([
    ...BRAND_KEYWORDS,
    ...DIRECT_SERVICE_KEYWORDS,
    ...CURRICULUM_AND_SUBJECT_KEYWORDS,
    ...AUDIENCE_AND_INTENT_KEYWORDS,
    ...INDIRECT_COMPETITION_KEYWORDS,
    ...GEO_AND_CHANNEL_KEYWORDS,
    ...CONVERSION_KEYWORDS,
  ])
);

const KNOWS_ABOUT_TOPICS = Array.from(
  new Set([
    ...SERVICE_AREAS.map((service) => service.title),
    ...SERVICE_AREAS.flatMap((service) => service.focusAreas),
    ...CURRICULUM_AND_SUBJECT_KEYWORDS,
    ...AUDIENCE_AND_INTENT_KEYWORDS,
    ...INDIRECT_COMPETITION_KEYWORDS,
  ])
);

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
    keywords: Array.from(new Set([...SITE_KEYWORDS, ...keywords])),
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
      "https://www.bridgethegapeducationalservices.co.za",
      "https://bridge-the-gap-delta.vercel.app",
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
