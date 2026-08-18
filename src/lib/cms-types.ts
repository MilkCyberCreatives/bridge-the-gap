export type CmsProgramme = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  audience: string;
  benefits: string[];
  focusAreas: string[];
  subjectLists: Array<{ headline: string; items: string[] }>;
  image?: string | null;
};

export type CmsSubject = {
  slug: string;
  name: string;
  tagline: string;
  introTitle: string;
  introText: string;
  outcomes: Array<{ title: string; desc: string }>;
  topics: string[];
  support: Array<{ title: string; desc: string }>;
  faqs: Array<{ q: string; a: string }>;
  images: Array<{ src: string; alt: string }>;
};

export type CmsInsight = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingMinutes: number;
  category: string;
  image: string;
  content: string[];
};

export type CmsFaq = {
  question: string;
  answer: string;
};

export type CmsContactDetails = {
  phoneLocal: string;
  phoneIntl: string;
  whatsappUrl: string;
  bookingsEmail: string;
  generalEmail: string;
  instagramUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  googleReviewUrl: string;
  googleProfileUrl: string;
  timezone: string;
};

export type CmsBootstrap = {
  programmes: CmsProgramme[];
  subjects: CmsSubject[];
  insights: CmsInsight[];
  faqs: CmsFaq[];
  settings: Record<string, unknown>;
  source: "laravel" | "static";
};
