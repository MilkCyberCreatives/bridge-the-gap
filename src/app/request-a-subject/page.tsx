import BreadcrumbHero from "@/components/ui/BreadcrumbHero";
import RequestSubjectFormSection from "@/components/subjects/request/RequestSubjectFormSection";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";

export default function RequestASubjectPage() {
  return (
    <>
      <BreadcrumbHero
        title="request a subject"
        subtitle="Tell us what subject you need and we’ll recommend the best support plan."
        crumbs={[
          { label: "home", href: "/" },
          { label: "request a subject" },
        ]}
      />

      <RequestSubjectFormSection />

      {/* ✅ must end with consultation form */}
      <ConsultationFormSection />
    </>
  );
}
