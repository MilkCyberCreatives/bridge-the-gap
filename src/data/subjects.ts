export type SubjectDetail = {
  slug: string;
  name: string;
  tagline: string;
  introTitle: string;
  introText: string;
  outcomes: { title: string; desc: string }[];
  topics: string[];
  support: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  images: { src: string; alt: string }[];
};

export const SUBJECTS: SubjectDetail[] = [
  {
    slug: "mathematics",
    name: "Mathematics",
    tagline: "Build strong fundamentals, improve problem-solving, and increase marks with structured support.",
    introTitle: "Maths support that improves confidence and results",
    introText:
      "We help learners understand concepts clearly, practise effectively, and improve accuracy. Lessons focus on closing gaps, building speed, and preparing learners for tests and exams with confidence.",
    outcomes: [
      { title: "Stronger fundamentals", desc: "We rebuild understanding step by step (no guessing)." },
      { title: "Better exam technique", desc: "Time management, method marks, and past paper strategy." },
      { title: "Consistent improvement", desc: "Weekly tracking, targeted revision, and focused practice." },
    ],
    topics: [
      "Number patterns & sequences",
      "Algebra & equations",
      "Functions & graphs",
      "Geometry & trigonometry",
      "Probability & statistics",
      "Past papers & exam drills",
    ],
    support: [
      { title: "Diagnostic check", desc: "We identify gaps and create a plan that fits the learner’s level." },
      { title: "Concept clarity sessions", desc: "We explain concepts clearly and practise until it sticks." },
      { title: "Targeted worksheets", desc: "Homework + revision tasks matched to the learner’s needs." },
      { title: "Exam readiness", desc: "Past papers, timing practice, and common mistakes correction." },
    ],
    faqs: [
      {
        q: "Do you help with exam preparation?",
        a: "Yes. We use past papers, exam timing strategies, and targeted revision to raise marks.",
      },
      {
        q: "Is this CAPS or IEB aligned?",
        a: "Both. Support is aligned to the learner’s curriculum and assessment style.",
      },
      {
        q: "How do we start?",
        a: "Book a free consultation below and we’ll recommend the best plan.",
      },
    ],
    images: [
      { src: "/images/subjects/detail/maths-1.jpg", alt: "Math tutoring session" },
      { src: "/images/subjects/detail/maths-2.jpg", alt: "Learner solving maths problems" },
      { src: "/images/subjects/detail/maths-3.jpg", alt: "Math exam preparation" },
    ],
  },

  {
    slug: "english",
    name: "English",
    tagline: "Improve reading, writing, comprehension and confidence with practical support.",
    introTitle: "Clear English skills that translate to better marks",
    introText:
      "We help learners strengthen comprehension, language, writing, and exam responses. Support is practical and measurable — focused on improving school performance and communication.",
    outcomes: [
      { title: "Better comprehension", desc: "Reading strategy, question approach, and accuracy." },
      { title: "Stronger writing", desc: "Structure, planning, editing, and clear expression." },
      { title: "Improved language", desc: "Grammar, vocabulary, and confident communication." },
    ],
    topics: [
      "Comprehension strategies",
      "Language & grammar",
      "Creative writing & essays",
      "Transactional writing",
      "Literature support",
      "Exam technique",
    ],
    support: [
      { title: "Skills assessment", desc: "We check comprehension, writing style, and language gaps." },
      { title: "Writing workshops", desc: "Planning, structure, and clear writing that earns marks." },
      { title: "Language strengthening", desc: "Grammar and vocabulary that improves everyday performance." },
      { title: "Exam responses", desc: "How to answer for marks — not just for completion." },
    ],
    faqs: [
      {
        q: "Do you help with essays and creative writing?",
        a: "Yes. We help learners plan, structure and write effectively with strong editing support.",
      },
      {
        q: "Do you support literature?",
        a: "Yes. We help with themes, analysis, and answering exam questions with evidence.",
      },
      {
        q: "How often should a learner attend?",
        a: "It depends on the level and goals — we’ll advise after the free consultation.",
      },
    ],
    images: [
      { src: "/images/subjects/detail/english-1.jpg", alt: "English tutoring lesson" },
      { src: "/images/subjects/detail/english-2.jpg", alt: "Learner reading and studying" },
      { src: "/images/subjects/detail/english-3.jpg", alt: "Writing and editing support" },
    ],
  },

  {
    slug: "physical-sciences",
    name: "Physical Sciences",
    tagline: "Understand concepts, apply formulas correctly, and prepare properly for exams.",
    introTitle: "Science support that makes concepts easier to understand",
    introText:
      "We support learners with key physics and chemistry concepts, step-by-step calculations, and exam preparation. The goal is understanding first — then performance.",
    outcomes: [
      { title: "Concept clarity", desc: "We simplify complex ideas with structured explanations." },
      { title: "Calculation accuracy", desc: "We build step-by-step solving habits that improve marks." },
      { title: "Exam confidence", desc: "Past paper practice and common question types covered." },
    ],
    topics: [
      "Mechanics (motion, forces)",
      "Electricity & circuits",
      "Waves & sound",
      "Chemical reactions",
      "Stoichiometry",
      "Past papers & exam prep",
    ],
    support: [
      { title: "Topic gap check", desc: "We identify which topics are blocking progress." },
      { title: "Worked examples", desc: "We teach by doing — step-by-step until it’s clear." },
      { title: "Targeted revision", desc: "Focused revision tasks that match the curriculum." },
      { title: "Exam drills", desc: "Past paper strategy + timing + mark-focused responses." },
    ],
    faqs: [
      {
        q: "Do you help with calculations and formulas?",
        a: "Yes. We focus heavily on method, units, and correct substitution for marks.",
      },
      {
        q: "Do you support both physics and chemistry?",
        a: "Yes — Physical Sciences support covers both components.",
      },
      {
        q: "Can you help with past papers?",
        a: "Absolutely. Past papers and exam drills are part of our exam preparation approach.",
      },
    ],
    images: [
      { src: "/images/subjects/detail/science-1.jpg", alt: "Physical sciences tutoring" },
      { src: "/images/subjects/detail/science-2.jpg", alt: "Science calculations and formulas" },
      { src: "/images/subjects/detail/science-3.jpg", alt: "Exam preparation for science" },
    ],
  },
];
