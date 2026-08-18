import type { Metadata } from "next";
import BreadcrumbHero from "@/components/ui/BreadcrumbHero";
import ProgrammesSection from "@/components/home/ProgrammesSection";
import SupportPromiseSection from "@/components/home/SupportPromiseSection";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";
import StructuredData from "@/components/seo/StructuredData";
import { getCmsProgrammes } from "@/lib/cms";
import {
  absoluteUrl,
  buildPageMetadata,
  getBreadcrumbSchema,
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
    "group tutoring for schools",
    "coaching for learners and educators",
  ],
  section: "Services",
});

export default async function ProgrammesPage() {
  const programmes = await getCmsProgrammes();

  const serviceCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Bridge The Gap Service Areas",
    itemListElement: programmes.map((programme, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: programme.title,
      description: programme.summary,
      url: absoluteUrl(`/programmes/${programme.slug}`),
    })),
  };

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
          serviceCatalogSchema,
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
      <ProgrammesSection programmes={programmes} />
      <SupportPromiseSection />
      <ConsultationFormSection
        title="Book a service consultation"
        subtitle="Choose the service area that best fits your learner, school, or professional development needs."
      />
    </>
  );
}
