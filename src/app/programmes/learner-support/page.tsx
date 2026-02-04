import ProgrammeDetailHero from "@/components/programmes/detail/ProgrammeDetailHero";
import ProgrammeDetailContent from "@/components/programmes/detail/ProgrammeDetailContent";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";

export default function LearnerSupportPage() {
  return (
    <>

      <ProgrammeDetailHero
        title="Learner Support (Grade R–12)"
        subtitle="Targeted tutoring support designed to strengthen understanding, build confidence, and improve results — aligned to CAPS & IEB."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Programmes", href: "/programmes" },
          { label: "Learner Support" },
        ]}
      />

      <ProgrammeDetailContent
        introTitle="Structured support for steady improvement"
        introText="We focus on foundations first, then build learners up with clear steps, targeted practice, and ongoing feedback. Support is tailored by grade, subject, and the learner’s pace."
        highlights={[
          {
            title: "Targeted subject support",
            desc: "Support built around the learner’s gaps — not generic tutoring.",
          },
          {
            title: "Confidence + accountability",
            desc: "We help learners stay consistent with clear milestones and follow-ups.",
          },
          {
            title: "Measurable progress",
            desc: "Clear feedback and improvement tracking over time.",
          },
        ]}
        includes={[
          { title: "Assessment & plan", desc: "We identify gaps and map a practical plan." },
          { title: "Weekly support sessions", desc: "Focused lessons + targeted practice." },
          { title: "Homework & revision guidance", desc: "Support that reinforces learning." },
          { title: "Parent feedback", desc: "Clear updates and recommendations." },
        ]}
        gallery={[
          { src: "/images/programmes/detail/learner-1.jpg", alt: "Learner support session" },
          { src: "/images/programmes/detail/learner-2.jpg", alt: "Focused tutoring" },
          { src: "/images/programmes/detail/learner-3.jpg", alt: "Study and revision" },
        ]}
        faqs={[
          {
            q: "Which grades do you support?",
            a: "We support Grade R to Grade 12, aligned to CAPS & IEB learning outcomes.",
          },
          {
            q: "Is support offered for multiple subjects?",
            a: "Yes. We can support one subject or multiple subjects depending on the learner’s needs.",
          },
          {
            q: "How do we start?",
            a: "Complete the consultation form below — we’ll confirm needs and recommend the best support plan.",
          },
        ]}
      />

      {/* ✅ Must end with consultation form */}
      <ConsultationFormSection />
    </>
  );
}
