export type SubjectList = {
  headline: string;
  items: string[];
};

export type ServiceArea = {
  id: "tutoring" | "matric-support" | "teacher-development" | "coaching";
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  audience: string;
  benefits: string[];
  focusAreas: string[];
  subjectLists: SubjectList[];
};

export const CONTACT_DETAILS = {
  phoneLocal: "084 233 1687",
  phoneIntl: "+27842331687",
  whatsappUrl: "https://wa.me/27842331687",
  bookingsEmail: "info@bridgethegapeducationalservices.co.za",
  generalEmail: "info@bridgethegapeducationalservices.co.za",
  addressLine: "Kempton Park, Birchleigh North, Gauteng, South Africa",
  timezone: "SAST (UTC+2)",
};

export const TARGET_AUDIENCES = [
  {
    title: "School Leaders",
    summary:
      "Intervention programmes, group tutoring, and teacher development aligned to school outcomes.",
  },
  {
    title: "Parents and Guardians",
    summary:
      "Reliable updates, clear action plans, and practical support for learner progress and matric readiness.",
  },
  {
    title: "Learners",
    summary:
      "Structured academic support, coaching, and confidence-building designed for measurable growth.",
  },
];

export const SERVICE_AREAS: ServiceArea[] = [
  {
    id: "tutoring",
    slug: "tutoring-services",
    title: "Tutoring Services",
    shortTitle: "Tutoring",
    summary:
      "Academic tutoring across CAPS and IB curricula for individual learners, small groups, and school intervention programmes.",
    audience: "Learners, parents, and school leadership teams",
    benefits: [
      "Clarifies concepts quickly and closes learning gaps.",
      "Builds confidence and stronger study habits.",
      "Supports both one-on-one and group tutoring models.",
      "Provides consistent feedback for parents and school teams.",
    ],
    focusAreas: [
      "Individual tutoring plans",
      "Group tutoring for school interventions",
      "Assessment and exam preparation",
      "Progress tracking and feedback loops",
    ],
    subjectLists: [
      {
        headline: "CAPS Subjects",
        items: [
          "Mathematics and Mathematical Literacy",
          "English Home Language and First Additional Language",
          "Physical Sciences and Life Sciences",
          "Accounting, Business Studies, Economics",
        ],
      },
      {
        headline: "IB Subjects",
        items: [
          "Mathematics AA and AI",
          "English A and English B",
          "Biology, Chemistry, Physics",
          "Business Management and Economics",
        ],
      },
      {
        headline: "Other",
        items: [
          "Additional subjects can be requested through the consultation form.",
        ],
      },
    ],
  },
  {
    id: "matric-support",
    slug: "matric-support",
    title: "Matric Support Services",
    shortTitle: "Matric Support",
    summary:
      "Matric rewrites, matric tutoring, subject additions, and SBA portfolio support for focused results improvement.",
    audience: "Matric learners, rewrite candidates, and parents",
    benefits: [
      "Creates structured rewrite and recovery plans.",
      "Targets high-impact topics and exam technique.",
      "Supports SBA portfolio quality and deadlines.",
      "Improves confidence under exam conditions.",
    ],
    focusAreas: [
      "Matric rewrite strategy",
      "Subject addition support",
      "SBA portfolio planning and review",
      "Past paper drills and exam readiness",
    ],
    subjectLists: [
      {
        headline: "CAPS Matric Subjects",
        items: [
          "Mathematics and Mathematical Literacy",
          "Physical Sciences and Life Sciences",
          "Accounting, Business Studies, Economics",
          "English HL and FAL",
        ],
      },
      {
        headline: "IB Diploma Support",
        items: [
          "Mathematics AA and AI exam prep",
          "Sciences practical and theory revision",
          "English response and essay support",
          "Business and Economics revision",
        ],
      },
      {
        headline: "Other",
        items: ["Custom subject support available on request."],
      },
    ],
  },
  {
    id: "teacher-development",
    slug: "teacher-professional-development",
    title: "Teacher Professional Development",
    shortTitle: "Teacher Development",
    summary:
      "Workshops, training programmes, and coaching for teachers and education professionals.",
    audience: "School leaders, teachers, and education professionals",
    benefits: [
      "Strengthens lesson delivery and classroom outcomes.",
      "Improves assessment quality and moderation consistency.",
      "Supports curriculum implementation across CAPS and IB.",
      "Provides practical classroom-ready strategies.",
    ],
    focusAreas: [
      "Teacher workshops and training sessions",
      "Professional development programmes",
      "Instructional coaching cycles",
      "Assessment design and moderation support",
    ],
    subjectLists: [
      {
        headline: "Curriculum Areas",
        items: [
          "CAPS curriculum planning and pacing",
          "IB curriculum alignment and assessment",
          "Phase and subject department strategy",
          "Whole-school intervention planning",
        ],
      },
      {
        headline: "Programme Focus Areas",
        items: [
          "Pedagogy and differentiated instruction",
          "Assessment literacy and data use",
          "Classroom management and engagement",
          "Leadership support for academic teams",
        ],
      },
      {
        headline: "Other",
        items: ["Tailored workshop themes can be scoped per school."],
      },
    ],
  },
  {
    id: "coaching",
    slug: "coaching-services",
    title: "Coaching Services",
    shortTitle: "Coaching",
    summary:
      "Stand-alone coaching for learners and education professionals, or integrated into development programmes.",
    audience: "Learners, teachers, and school leadership teams",
    benefits: [
      "Builds accountability with measurable growth plans.",
      "Improves performance mindset and follow-through.",
      "Supports personal leadership and communication skills.",
      "Integrates with tutoring or professional development where needed.",
    ],
    focusAreas: [
      "Learner performance coaching",
      "Educator coaching and reflective practice",
      "School leadership coaching conversations",
      "Goal-setting and accountability check-ins",
    ],
    subjectLists: [
      {
        headline: "Learner Coaching Focus",
        items: [
          "Study systems and consistency",
          "Exam confidence and focus",
          "Goal setting and accountability",
          "Learning resilience habits",
        ],
      },
      {
        headline: "Professional Coaching Focus",
        items: [
          "Instructional leadership",
          "Professional confidence and communication",
          "Team coaching for education staff",
          "Personal growth planning for educators",
        ],
      },
      {
        headline: "Other",
        items: ["Coaching tracks can be custom-designed per client."],
      },
    ],
  },
];

export const QUICK_STATS = [
  { label: "Core Service Areas", value: "4" },
  { label: "Target Client Segments", value: "3" },
  { label: "Curricula Supported", value: "CAPS + IB" },
  { label: "Delivery Models", value: "Online, In-person, Group" },
];

export const FORM_FOCUS_OPTIONS = [
  "Mathematics",
  "English",
  "Physical Sciences",
  "Life Sciences",
  "Accounting",
  "Business Studies",
  "Economics",
  "IB Mathematics",
  "IB Sciences",
  "IB English",
  "Matric Rewrite",
  "Subject Addition",
  "SBA Portfolio Support",
  "Teacher Workshop",
  "Professional Development Programme",
  "Learner Coaching",
  "Educator Coaching",
];
