import BreadcrumbHero from "@/components/ui/BreadcrumbHero";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";

export default function RequestASubjectPage() {
  return (
    <>
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
