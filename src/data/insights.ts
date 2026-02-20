export type InsightPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingMinutes: number;
  category: string;
  image: string;
  content: string[];
};

export const INSIGHT_POSTS: InsightPost[] = [
  {
    slug: "study-habits",
    title: "Study Habits That Improve Results",
    excerpt:
      "Simple systems that help learners stay consistent and reduce revision stress.",
    publishedAt: "2026-02-04",
    readingMinutes: 5,
    category: "Learner Success",
    image: "/images/blog/blog-1.webp",
    content: [
      "Strong results rarely come from last-minute effort. They usually come from simple habits repeated every week.",
      "Start with a fixed weekly study rhythm. Block specific times for difficult subjects first, then easier subjects second.",
      "Use active recall instead of passive rereading. Ask questions, test memory, and explain key ideas out loud.",
      "Review progress each week. A short 10-minute check-in helps learners adjust quickly before small gaps become large gaps.",
    ],
  },
  {
    slug: "matric-plan",
    title: "A Practical Matric Preparation Plan",
    excerpt:
      "How to combine topic prioritisation, past papers, and exam technique for higher-impact preparation.",
    publishedAt: "2026-02-04",
    readingMinutes: 6,
    category: "Matric Support",
    image: "/images/blog/blog-2.webp",
    content: [
      "Matric preparation works best when learners focus on high-impact topics and practise under exam conditions.",
      "Begin with a baseline review of past scripts and recent results. This identifies which topics will move marks fastest.",
      "Build a weekly cycle: concept revision, timed past-paper practice, and targeted corrections.",
      "Exam technique matters. Learners should practise mark allocation, timing, and question interpretation every week.",
    ],
  },
  {
    slug: "caps-vs-ib",
    title: "CAPS and IB: What Effective Support Looks Like",
    excerpt:
      "Support should match curriculum standards, assessment style, and learner context.",
    publishedAt: "2026-02-04",
    readingMinutes: 5,
    category: "Curriculum Strategy",
    image: "/images/blog/blog-3.webp",
    content: [
      "CAPS and IB both require deep understanding, but they differ in pacing, assessment style, and evidence expectations.",
      "Support for CAPS learners often focuses on alignment to term pacing and exam structure.",
      "Support for IB learners usually requires stronger integration of conceptual understanding, extended responses, and reflection.",
      "In both systems, high-quality support is diagnostic, targeted, and tracked over time rather than generic.",
    ],
  },
  {
    slug: "group-tutoring-interventions",
    title: "How Group Tutoring Interventions Improve School Outcomes",
    excerpt:
      "A practical model for school leaders to structure group tutoring for measurable impact.",
    publishedAt: "2026-02-12",
    readingMinutes: 6,
    category: "School Leadership",
    image: "/images/blog/blog-1.webp",
    content: [
      "Group tutoring can deliver strong gains when it is tightly linked to school performance data and timetable realities.",
      "Start by identifying specific learner groups and target topics that will produce the largest marks improvement in a short cycle.",
      "Use fixed intervention windows, weekly progress checks, and feedback loops between tutors, teachers, and leadership.",
      "The highest-impact programmes are consistent, measurable, and aligned to curriculum pacing and assessment dates.",
    ],
  },
  {
    slug: "teacher-development-that-sticks",
    title: "Teacher Professional Development That Sticks",
    excerpt:
      "How schools can move from one-off workshops to sustained classroom improvement.",
    publishedAt: "2026-02-14",
    readingMinutes: 7,
    category: "Teacher Development",
    image: "/images/blog/blog-2.webp",
    content: [
      "Many training sessions create momentum but fail to produce sustained classroom change.",
      "A stronger model combines workshops with coaching cycles, clear implementation targets, and classroom follow-through.",
      "Leaders should prioritize a few high-value practices, then measure adoption through lesson observation and learner evidence.",
      "Professional development works best when it is practical, contextualized, and reinforced over time.",
    ],
  },
  {
    slug: "coaching-for-learners-and-educators",
    title: "Coaching for Learners and Educators: What Works",
    excerpt:
      "Coaching builds accountability, confidence, and performance when goals are specific and tracked.",
    publishedAt: "2026-02-16",
    readingMinutes: 5,
    category: "Coaching",
    image: "/images/blog/blog-3.webp",
    content: [
      "Coaching is most effective when goals are concrete, time-bound, and connected to real outcomes.",
      "For learners, coaching improves consistency, focus, and follow-through on study plans and exam preparation.",
      "For educators and school leaders, coaching supports reflective practice, communication, and leadership execution.",
      "Short, structured coaching check-ins with progress measures create momentum and long-term behavioural change.",
    ],
  },
];
