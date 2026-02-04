import ProgrammeDetailHero from "@/components/programmes/detail/ProgrammeDetailHero";
import ProgrammeDetailContent from "@/components/programmes/detail/ProgrammeDetailContent";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";

export default function MatricSupportPage() {
  return (
    <>
      <ProgrammeDetailHero
        title="Matric Support & Rewrite"
        subtitle="A practical matric preparation plan built around past papers, topic prioritisation, exam technique, and confidence."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Programmes", href: "/programmes" },
          { label: "Matric Support" },
        ]}
      />

      <ProgrammeDetailContent
        introTitle="Preparation that moves marks"
        introText="We focus on high-impact topics, consistent practice, and exam technique so learners improve with clarity — not overwhelm. Perfect for matric learners and rewrite candidates."
        highlights={[
          {
            title: "Past-paper strategy",
            desc: "We train learners on how to use past papers the right way for marks.",
          },
          {
            title: "Time management & technique",
            desc: "Learners learn how to answer efficiently under exam conditions.",
          },
          {
            title: "Topic prioritisation",
            desc: "We focus on what matters most and close gaps quickly.",
          },
        ]}
        includes={[
          { title: "Baseline assessment", desc: "We identify weak areas and mark patterns." },
          { title: "Revision plan", desc: "Weekly structure + measurable targets." },
          { title: "Past paper drills", desc: "Timed practice with feedback and corrections." },
          { title: "Exam-day readiness", desc: "Confidence, pacing, and answering strategy." },
        ]}
        gallery={[
          { src: "/images/programmes/detail/matric-1.jpg", alt: "Matric exam prep" },
          { src: "/images/programmes/detail/matric-2.jpg", alt: "Past paper practice" },
          { src: "/images/programmes/detail/matric-3.jpg", alt: "Focused revision" },
        ]}
        faqs={[
          {
            q: "Do you support matric rewrite learners?",
            a: "Yes. We help learners rebuild foundations, improve technique, and prepare with structure.",
          },
          {
            q: "Which subjects do you cover?",
            a: "We support major subjects depending on demand — specify your subjects in the form below.",
          },
          {
            q: "How soon should we start?",
            a: "As early as possible — but we can also support urgent preparation with a focused plan.",
          },
        ]}
      />

      {/* ✅ Must end with consultation form */}
      <ConsultationFormSection />
    </>
  );
}
