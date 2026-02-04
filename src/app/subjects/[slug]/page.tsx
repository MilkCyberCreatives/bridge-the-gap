import { notFound } from "next/navigation";
import SubjectDetailHero from "@/components/subjects/detail/SubjectDetailHero";
import SubjectDetailContent from "@/components/subjects/detail/SubjectDetailContent";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";
import { SUBJECTS } from "@/data/subjects";

export function generateStaticParams() {
  return SUBJECTS.map((s) => ({ slug: s.slug }));
}

export default function SubjectDetailPage({ params }: { params: { slug: string } }) {
  const subject = SUBJECTS.find((s) => s.slug === params.slug);
  if (!subject) return notFound();

  return (
    <>
      <SubjectDetailHero
        title={subject.name}
        subtitle={subject.tagline}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Subjects", href: "/subjects" },
          { label: subject.name },
        ]}
      />

      <SubjectDetailContent
        introTitle={subject.introTitle}
        introText={subject.introText}
        outcomes={subject.outcomes}
        topics={subject.topics}
        support={subject.support}
        faqs={subject.faqs}
        images={subject.images}
      />

      {/* ✅ MUST end with consultation form */}
      <ConsultationFormSection />
    </>
  );
}
