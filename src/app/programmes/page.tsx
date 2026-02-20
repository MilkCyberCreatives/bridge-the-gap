import BreadcrumbHero from "@/components/ui/BreadcrumbHero";
import ProgrammesSection from "@/components/home/ProgrammesSection";
import SupportPromiseSection from "@/components/home/SupportPromiseSection";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";

export default function ProgrammesPage() {
  return (
    <>
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
