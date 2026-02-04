import ProgrammeDetailHero from "@/components/programmes/detail/ProgrammeDetailHero";
import ProgrammeDetailContent from "@/components/programmes/detail/ProgrammeDetailContent";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";

export default function StudySkillsPage() {
  return (
    <>
      <ProgrammeDetailHero
        title="Study Skills & Exam Prep"
        subtitle="Study systems learners can actually stick to — focus, revision methods, exam planning, and confidence."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Programmes", href: "/programmes" },
          { label: "Study Skills" },
        ]}
      />

      <ProgrammeDetailContent
        introTitle="Better habits, better results"
        introText="We help learners create sustainable study routines, manage time, and revise effectively. This programme is perfect for learners who struggle with consistency, focus, or exam pressure."
        highlights={[
          {
            title: "Routine & discipline",
            desc: "A realistic plan that fits school load and home life.",
          },
          {
            title: "Revision methods that work",
            desc: "Active recall, spaced repetition, and topic prioritisation.",
          },
          {
            title: "Exam calm + confidence",
            desc: "Practical strategies to reduce anxiety and improve performance.",
          },
        ]}
        includes={[
          { title: "Study schedule setup", desc: "A weekly plan learners can maintain." },
          { title: "Revision system", desc: "Tools for retention and confident recall." },
          { title: "Exam prep plan", desc: "Past paper guidance + time planning." },
          { title: "Progress check-ins", desc: "Accountability and adjustments." },
        ]}
        gallery={[
          { src: "/images/programmes/detail/study-1.jpg", alt: "Study skills" },
          { src: "/images/programmes/detail/study-2.jpg", alt: "Exam preparation" },
          { src: "/images/programmes/detail/study-3.jpg", alt: "Learner confidence" },
        ]}
        faqs={[
          {
            q: "Is this only for high school learners?",
            a: "No — study skills can benefit upper primary, high school, and matric learners.",
          },
          {
            q: "Do you combine this with subject tutoring?",
            a: "Yes. We can add subject support depending on the learner’s needs.",
          },
          {
            q: "How do we book?",
            a: "Complete the consultation form below and we’ll recommend the best structure.",
          },
        ]}
      />

      {/* ✅ Must end with consultation form */}
      <ConsultationFormSection />
    </>
  );
}
