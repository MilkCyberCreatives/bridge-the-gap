import { notFound } from "next/navigation";
import SubjectDetailHero from "@/components/subjects/detail/SubjectDetailHero";
import SubjectDetailContent from "@/components/subjects/detail/SubjectDetailContent";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";
import { SUBJECTS } from "@/data/subjects";

export function generateStaticParams() {
  return SUBJECTS.map((subject) => ({ slug: subject.slug }));
}

export default function SubjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const subject = SUBJECTS.find((item) => item.slug === params.slug);
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
      <ConsultationFormSection
        title={`Book support for ${subject.name}`}
        subtitle="Select your preferred date and service model and we will confirm the best support structure."
        presetService="Tutoring Services"
      />
    </>
  );
}
