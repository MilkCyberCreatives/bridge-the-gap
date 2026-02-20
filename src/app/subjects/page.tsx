import BreadcrumbHero from "@/components/ui/BreadcrumbHero";
import SubjectsSection from "@/components/home/SubjectsSection";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";

export default function SubjectsPage() {
  return (
    <>
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
