import BreadcrumbHero from "@/components/ui/BreadcrumbHero";
import RequestSubjectFormSection from "./RequestSubjectFormSection";
import FooterSection from "@/components/layout/FooterSection";

export default function RequestASubjectPage() {
  return (
    <>
      <BreadcrumbHero
        title="request a subject"
        subtitle="Can’t find your subject on the list? Tell us what you need and we’ll recommend the best support plan — aligned to CAPS & IEB."
        crumbs={[
          { label: "home", href: "/" },
          { label: "request a subject" },
        ]}
        image="/images/breadcrumbs/master.jpg"
      />

      <RequestSubjectFormSection />

      <FooterSection />
    </>
  );
}
