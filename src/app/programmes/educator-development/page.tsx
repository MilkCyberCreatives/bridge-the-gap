import ProgrammeDetailHero from "@/components/programmes/detail/ProgrammeDetailHero";
import ProgrammeDetailContent from "@/components/programmes/detail/ProgrammeDetailContent";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";

export default function EducatorDevelopmentPage() {
  return (
    <>
      <ProgrammeDetailHero
        title="Educator Development"
        subtitle="Practical educator support focused on stronger lesson delivery, assessment alignment, and learner progress — built for South African classroom realities."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Programmes", href: "/programmes" },
          { label: "Educator Development" },
        ]}
      />

      <ProgrammeDetailContent
        introTitle="Better teaching systems, better learner outcomes"
        introText="We support educators with practical tools and strategies to improve planning, delivery, assessment quality, and learner performance. This programme is designed to be hands-on and immediately usable in class."
        highlights={[
          {
            title: "Planning & pacing support",
            desc: "Improve lesson structure, weekly pacing, and content coverage with clarity.",
          },
          {
            title: "Assessment alignment",
            desc: "Strengthen tasks, tests, and moderation with CAPS/IEB-aligned approach.",
          },
          {
            title: "Classroom strategy upgrades",
            desc: "Practical techniques for engagement, support, and performance improvement.",
          },
        ]}
        includes={[
          { title: "Needs assessment", desc: "We identify challenges and set clear targets." },
          { title: "Lesson planning support", desc: "Templates + methods that save time and improve delivery." },
          { title: "Assessment improvement", desc: "Better tasks, rubrics, and feedback methods." },
          { title: "Progress strategy", desc: "Simple tracking systems that show improvement." },
        ]}
        gallery={[
          { src: "/images/programmes/detail/educator-1.jpg", alt: "Educator development workshop" },
          { src: "/images/programmes/detail/educator-2.jpg", alt: "Teaching and planning support" },
          { src: "/images/programmes/detail/educator-3.jpg", alt: "Assessment and learner progress" },
        ]}
        faqs={[
          {
            q: "Is this for individuals or schools?",
            a: "Both. We can support individual educators or provide structured support to a school team.",
          },
          {
            q: "Do you align to CAPS and IEB?",
            a: "Yes. Support is aligned to the relevant curriculum expectations and assessment approach.",
          },
          {
            q: "How do we start?",
            a: "Complete the consultation form below and we’ll recommend the best support structure.",
          },
        ]}
      />

      {/* ✅ Must end with consultation form */}
      <ConsultationFormSection />
    </>
  );
}
