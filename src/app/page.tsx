import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ProgrammesSection from "@/components/home/ProgrammesSection";
import SupportPromiseSection from "@/components/home/SupportPromiseSection";
import SubjectsSection from "@/components/home/SubjectsSection";
import ResultsSection from "@/components/home/ResultsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import FAQSection from "@/components/home/FAQSection";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";
import BlogPreviewSection from "@/components/home/BlogPreviewSection";
import StructuredData from "@/components/seo/StructuredData";
import { HOME_FAQS } from "@/data/faqs";
import { TARGET_AUDIENCES } from "@/data/site";
import {
  buildPageMetadata,
  getFaqSchema,
  getServiceCatalogSchema,
  getWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Education Support for Learners, Schools, and Educators",
  description:
    "Bridge The Gap offers tutoring services, matric support, teacher professional development, and coaching across CAPS and IB curricula in Kempton Park and online.",
  path: "/",
  keywords: [
    "tutoring services South Africa",
    "matric support services",
    "teacher development programmes",
    "coaching for learners and educators",
  ],
});

export default function HomePage() {
  const audienceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Target Clients",
    itemListElement: TARGET_AUDIENCES.map((audience, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: audience.title,
      description: audience.summary,
    })),
  };

  return (
    <>
      <StructuredData
        data={[
          getWebPageSchema({
            name: "Bridge The Gap Educational Services",
            path: "/",
            description:
              "Education support and professional development services across tutoring, matric support, teacher development, and coaching.",
          }),
          getServiceCatalogSchema(),
          getFaqSchema(HOME_FAQS),
          audienceSchema,
        ]}
      />
      <main className="w-full">
        <HeroSection />
        <ProgrammesSection />
        <SupportPromiseSection />
        <SubjectsSection />
        <ResultsSection />
        <HowItWorksSection />
        <WhyChooseSection />
        <FAQSection />
        <ConsultationFormSection />
        <BlogPreviewSection />
      </main>
    </>
  );
}
