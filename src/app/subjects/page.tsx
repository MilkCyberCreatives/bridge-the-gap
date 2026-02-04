import BreadcrumbHero from "@/components/ui/BreadcrumbHero";
import ScienceOverviewSection from "@/components/subjects/science/ScienceOverviewSection";
import ScienceTopicsSection from "@/components/subjects/science/ScienceTopicsSection";
import ScienceSupportSection from "@/components/subjects/science/ScienceSupportSection";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";

export default function SciencePage() {
  return (
    <>
      <BreadcrumbHero
        title="science support"
        subtitle="Clear, structured science tutoring that strengthens understanding, improves marks, and builds confidence — aligned to CAPS & IEB."
        crumbs={[
          { label: "home", href: "/" },
          { label: "subjects", href: "/subjects" },
          { label: "science" },
        ]}
      />

      <ScienceOverviewSection />
      <ScienceTopicsSection />
      <ScienceSupportSection />

      {/* ✅ all detail pages must end with consultation */}
      <ConsultationFormSection />
    </>
  );
}
