import type { Metadata } from "next";
import BreadcrumbHero from "@/components/ui/BreadcrumbHero";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";
import StructuredData from "@/components/seo/StructuredData";
import {
  buildPageMetadata,
  getBreadcrumbSchema,
  getWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Request a Subject",
  description:
    "Request additional subjects or focus areas across CAPS and IB curricula for tutoring, matric support, and professional development.",
  path: "/request-a-subject",
  keywords: ["request a subject", "custom education support", "CAPS and IB subjects"],
});

export default function RequestASubjectPage() {
  return (
    <>
      <StructuredData
        data={[
          getWebPageSchema({
            name: "Request a Subject",
            path: "/request-a-subject",
            description:
              "Submit custom subject and focus area requests across Bridge The Gap services.",
          }),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Request a Subject", path: "/request-a-subject" },
          ]),
        ]}
      />
      <BreadcrumbHero
        title="Request a Subject"
        subtitle="Select the service area and choose Other if the subject or focus area is not listed."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Request a Subject" },
        ]}
      />
      <ConsultationFormSection
        title="Request a custom subject or focus area"
        subtitle="Use the expandable focus list and Other field to submit specific needs across CAPS and IB."
      />
    </>
  );
}
