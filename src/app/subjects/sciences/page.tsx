import BreadcrumbHero from "@/components/ui/BreadcrumbHero";
import ScienceOverviewSection from "@/components/subjects/sciences/ScienceOverviewSection";
import ScienceTopicsSection from "@/components/subjects/sciences/ScienceTopicsSection";
import ScienceSupportSection from "@/components/subjects/sciences/ScienceSupportSection";
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
          { label: "sciences" },
        ]}
        image="/images/breadcrumbs/master.jpg"
      />

      <ScienceOverviewSection />
      <ScienceTopicsSection />
      <ScienceSupportSection />

      {/* ✅ detail pages must end with consultation form */}
      <ConsultationFormSection />
    </>
  );
}
