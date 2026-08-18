import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubjectDetailHero from "@/components/subjects/detail/SubjectDetailHero";
import SubjectDetailContent from "@/components/subjects/detail/SubjectDetailContent";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";
import StructuredData from "@/components/seo/StructuredData";
import { SUBJECTS } from "@/data/subjects";
import { getCmsSubject } from "@/lib/cms";
import {
  absoluteUrl,
  buildPageMetadata,
  getBreadcrumbSchema,
  getFaqSchema,
  getWebPageSchema,
} from "@/lib/seo";

type SubjectDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SUBJECTS.map((subject) => ({ slug: subject.slug }));
}

export async function generateMetadata({
  params,
}: SubjectDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const subject = await getCmsSubject(slug);
  if (!subject) {
    return buildPageMetadata({
      title: "Subject Not Found",
      description: "The requested subject page could not be found.",
      path: "/subjects",
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${subject.name} Support`,
    description: subject.tagline,
    path: `/subjects/${subject.slug}`,
    keywords: [subject.name, subject.tagline, ...subject.topics],
    section: "Subjects",
  });
}

export default async function SubjectDetailPage({ params }: SubjectDetailProps) {
  const { slug } = await params;
  const subject = await getCmsSubject(slug);
  if (!subject) return notFound();

  const subjectFaqs = subject.faqs.map((faq) => ({
    question: faq.q,
    answer: faq.a,
  }));

  const subjectSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/subjects/${subject.slug}#service`),
    name: `${subject.name} Academic Support`,
    serviceType: `${subject.name} tutoring and academic support`,
    description: subject.tagline,
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: {
      "@type": "Country",
      name: "South Africa",
    },
    about: subject.topics,
    url: absoluteUrl(`/subjects/${subject.slug}`),
  };

  return (
    <>
      <StructuredData
        data={[
          getWebPageSchema({
            name: `${subject.name} Support`,
            path: `/subjects/${subject.slug}`,
            description: subject.tagline,
          }),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Subjects", path: "/subjects" },
            { name: subject.name, path: `/subjects/${subject.slug}` },
          ]),
          getFaqSchema(subjectFaqs),
          subjectSchema,
        ]}
      />
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
