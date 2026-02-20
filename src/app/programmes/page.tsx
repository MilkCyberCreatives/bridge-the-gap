import type { Metadata } from "next";
import BreadcrumbHero from "@/components/ui/BreadcrumbHero";
import ProgrammesSection from "@/components/home/ProgrammesSection";
import SupportPromiseSection from "@/components/home/SupportPromiseSection";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";
import StructuredData from "@/components/seo/StructuredData";
import {
  buildPageMetadata,
  getBreadcrumbSchema,
  getServiceCatalogSchema,
  getWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Service Areas",
  description:
    "Explore tutoring services, matric support, teacher professional development, and coaching services across CAPS and IB curricula.",
  path: "/programmes",
  keywords: [
    "education service areas",
    "teacher professional development workshops",
    "matric tutoring and rewrites",
  ],
});

export default function ProgrammesPage() {
  return (
    <>
      <StructuredData
        data={[
          getWebPageSchema({
            name: "Service Areas",
            path: "/programmes",
            description:
              "Core service areas including tutoring, matric support, teacher professional development, and coaching.",
          }),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/programmes" },
          ]),
          getServiceCatalogSchema(),
        ]}
      />
      <BreadcrumbHero
        title="Service Areas"
        subtitle="Tutoring services, matric support, teacher professional development, and coaching services."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />
      <ProgrammesSection />
      <SupportPromiseSection />
      <ConsultationFormSection
        title="Book a service consultation"
        subtitle="Choose the service area that best fits your learner, school, or professional development needs."
      />
    </>
  );
}
