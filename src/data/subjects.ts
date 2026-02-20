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
    tagline:
      "Build strong fundamentals, improve problem-solving, and increase marks with structured support.",
    introTitle: "Mathematics support that improves confidence and results",
    introText:
      "We help learners understand concepts clearly, practise effectively, and improve accuracy. Lessons focus on closing gaps, building speed, and preparing learners for tests and exams.",
    outcomes: [
      { title: "Stronger fundamentals", desc: "Concept clarity from the basics upward." },
      { title: "Better exam technique", desc: "Method marks, timing, and error correction." },
      { title: "Consistent improvement", desc: "Weekly tracking and targeted revision." },
    ],
    topics: [
      "Number patterns and sequences",
      "Algebra and equations",
      "Functions and graphs",
      "Geometry and trigonometry",
      "Probability and statistics",
      "Past papers and exam drills",
    ],
    support: [
      { title: "Diagnostic check", desc: "Identify current gaps and design the right plan." },
      { title: "Concept sessions", desc: "Step-by-step teaching and applied practice." },
      { title: "Targeted worksheets", desc: "Homework and revision tasks matched to needs." },
      { title: "Exam readiness", desc: "Timed papers with feedback loops." },
    ],
    faqs: [
      {
        q: "Do you support CAPS and IB mathematics?",
        a: "Yes. Support is aligned to either CAPS or IB requirements.",
      },
      {
        q: "Can this be integrated with matric support?",
        a: "Yes. Mathematics tutoring and matric support can be combined.",
      },
      {
        q: "How do we start?",
        a: "Submit a booking request and we will recommend the best starting plan.",
      },
    ],
    images: [
      { src: "/images/subjects/detail/maths-1.jpg", alt: "Mathematics tutoring session" },
      { src: "/images/subjects/detail/maths-2.jpg", alt: "Learner solving mathematics tasks" },
      { src: "/images/subjects/detail/maths-3.jpg", alt: "Mathematics exam preparation" },
    ],
  },
  {
    slug: "english",
    name: "English",
    tagline:
      "Improve reading, writing, comprehension, and confidence with practical support.",
    introTitle: "English skills that translate to better school performance",
    introText:
      "We help learners strengthen comprehension, language use, writing quality, and exam responses. Support is practical, measurable, and aligned to curriculum outcomes.",
    outcomes: [
      { title: "Better comprehension", desc: "Improve reading strategy and answer quality." },
      { title: "Stronger writing", desc: "Structure, argument, and editing support." },
      { title: "Improved language", desc: "Grammar and vocabulary development." },
    ],
    topics: [
      "Comprehension strategy",
      "Language and grammar",
      "Creative and transactional writing",
      "Literature response technique",
      "Exam writing under time pressure",
      "Revision and editing systems",
    ],
    support: [
      { title: "Skills assessment", desc: "Determine strengths, gaps, and target outcomes." },
      { title: "Writing workshops", desc: "Practical support for essays and responses." },
      { title: "Language strengthening", desc: "Grammar and vocabulary improvement." },
      { title: "Exam response coaching", desc: "Answer for marks, not only completion." },
    ],
    faqs: [
      {
        q: "Do you support literature and writing?",
        a: "Yes. We support both literature and writing outcomes.",
      },
      {
        q: "Is support available for CAPS and IB English?",
        a: "Yes. We tailor support to the curriculum and assessment context.",
      },
      {
        q: "Can this run as a group intervention?",
        a: "Yes. Group English support can be delivered for school interventions.",
      },
    ],
    images: [
      { src: "/images/subjects/detail/english-1.jpg", alt: "English tutoring lesson" },
      { src: "/images/subjects/detail/english-2.jpg", alt: "Learner reading and study support" },
      { src: "/images/subjects/detail/english-3.jpg", alt: "Writing support and feedback" },
    ],
  },
  {
    slug: "physical-sciences",
    name: "Physical Sciences",
    tagline:
      "Understand concepts, apply formulas correctly, and prepare effectively for exams.",
    introTitle: "Physical sciences support for stronger conceptual understanding",
    introText:
      "We support learners with key physics and chemistry concepts, step-by-step calculations, and exam preparation. The process prioritises understanding first, then performance.",
    outcomes: [
      { title: "Concept clarity", desc: "Complex ideas simplified into practical steps." },
      { title: "Calculation accuracy", desc: "Method discipline and formula application." },
      { title: "Exam confidence", desc: "Past paper strategy and timed correction cycles." },
    ],
    topics: [
      "Mechanics and forces",
      "Electricity and circuits",
      "Waves and sound",
      "Chemical reactions",
      "Stoichiometry",
      "Past papers and exam drills",
    ],
    support: [
      { title: "Topic gap check", desc: "Map concepts that block performance." },
      { title: "Worked examples", desc: "Step-by-step guided solving." },
      { title: "Targeted revision", desc: "Focused activities by weak area." },
      { title: "Exam drills", desc: "Timing and mark-focused response practice." },
    ],
    faqs: [
      {
        q: "Do you support both physics and chemistry?",
        a: "Yes. Physical sciences support includes both components.",
      },
      {
        q: "Is this available for matric rewrite learners?",
        a: "Yes. It can be integrated with matric support services.",
      },
      {
        q: "Do you support IB sciences?",
        a: "Yes. Support can be adapted for IB science pathways where needed.",
      },
    ],
    images: [
      { src: "/images/subjects/detail/science-1.jpg", alt: "Physical sciences tutoring" },
      { src: "/images/subjects/detail/science-2.jpg", alt: "Science calculations and formulas" },
      { src: "/images/subjects/detail/science-3.jpg", alt: "Science exam preparation" },
    ],
  },
];
