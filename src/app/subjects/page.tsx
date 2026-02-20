import type { Metadata } from "next";
import BreadcrumbHero from "@/components/ui/BreadcrumbHero";
import SubjectsSection from "@/components/home/SubjectsSection";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";
import StructuredData from "@/components/seo/StructuredData";
import { SUBJECTS } from "@/data/subjects";
import {
  absoluteUrl,
  buildPageMetadata,
  getBreadcrumbSchema,
  getWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Subjects and Focus Areas",
  description:
    "Review supported CAPS and IB subjects and focus areas for tutoring, matric support, and professional development.",
  path: "/subjects",
  keywords: [
    "CAPS subjects support",
    "IB subjects support",
    "subjects and focus areas",
  ],
});

export default function SubjectsPage() {
  const subjectSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Subjects and Focus Areas",
    itemListElement: SUBJECTS.map((subject, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: subject.name,
      url: absoluteUrl(`/subjects/${subject.slug}`),
      description: subject.tagline,
    })),
  };

  return (
    <>
      <StructuredData
        data={[
          getWebPageSchema({
            name: "Subjects and Focus Areas",
            path: "/subjects",
            description:
              "Supported subject and focus area coverage across CAPS and IB curricula.",
          }),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Subjects", path: "/subjects" },
          ]),
          subjectSchema,
        ]}
      />
      <BreadcrumbHero
        title="Subjects and Focus Areas"
        subtitle="Subjects across CAPS and IB curricula for tutoring, matric support, and professional development services."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Subjects" },
        ]}
      />
      <SubjectsSection />
      <ConsultationFormSection
        title="Discuss subject requirements"
        subtitle="Select service type and subject requirements and we will recommend the right support model."
      />
    </>
  );
}
