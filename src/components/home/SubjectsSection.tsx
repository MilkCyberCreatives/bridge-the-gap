"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

type Subject = {
  name: string;
  tags: ("Foundation" | "Intermediate" | "Senior" | "FET" | "Matric")[];
  route: string;
};

const FILTERS: Subject["tags"][number][] = [
  "Foundation",
  "Intermediate",
  "Senior",
  "FET",
  "Matric",
];

export default function SubjectsSection() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<"All" | Subject["tags"][number]>("All");

  const subjects: Subject[] = useMemo(
    () => [
      { name: "Mathematics", tags: ["Intermediate", "Senior", "FET", "Matric"], route: "/subjects/mathematics" },
      { name: "Mathematical Literacy", tags: ["FET", "Matric"], route: "/subjects/maths-literacy" },
      { name: "Physical Sciences", tags: ["FET", "Matric"], route: "/subjects/physical-sciences" },
      { name: "Life Sciences", tags: ["FET", "Matric"], route: "/subjects/life-sciences" },
      { name: "English Home Language", tags: ["Foundation", "Intermediate", "Senior", "FET", "Matric"], route: "/subjects/english-hl" },
      { name: "English First Additional Language", tags: ["Foundation", "Intermediate", "Senior", "FET", "Matric"], route: "/subjects/english-fal" },
      { name: "Accounting", tags: ["FET", "Matric"], route: "/subjects/accounting" },
      { name: "Business Studies", tags: ["FET", "Matric"], route: "/subjects/business-studies" },
      { name: "Economics", tags: ["FET", "Matric"], route: "/subjects/economics" },
      { name: "Natural Sciences", tags: ["Intermediate", "Senior"], route: "/subjects/natural-sciences" },
      { name: "Technology", tags: ["Senior"], route: "/subjects/technology" },
      { name: "EMS", tags: ["Senior"], route: "/subjects/ems" },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (active === "All") return subjects;
    return subjects.filter((s) => s.tags.includes(active));
  }, [active, subjects]);

  // Animations (same premium-visible style)
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0.01 }
        : { staggerChildren: 0.07, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: reduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 30, scale: 0.97, filter: "blur(10px)" },
    show: reduceMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
        },
  };

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        {/* Heading row */}
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-black/55">
              Subjects
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Find The Right Subject Support
            </h2>

            <p className="mt-3 text-base leading-relaxed text-black/70">
              From Foundation Phase to Matric, we offer focused support aligned
              to CAPS and IEB — with structured practice and progress tracking.
            </p>
          </div>

          <Link
            href="/subjects/request"
            className="btn-water inline-flex w-full items-center justify-center gap-2 rounded-full bg-[rgb(var(--brand))] px-6 py-3 text-sm font-extrabold text-white sm:w-auto"
          >
            Request A Subject <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Filter chips */}
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          <button
            onClick={() => setActive("All")}
            className={`btn-water rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur transition ${
              active === "All"
                ? "border-transparent bg-[rgb(var(--brand))] text-white"
                : "border-border bg-white/70 text-black/75 hover:bg-white"
            }`}
          >
            All
          </button>

          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`btn-water rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur transition ${
                active === f
                  ? "border-transparent bg-[rgb(var(--brand))] text-white"
                  : "border-border bg-white/70 text-black/75 hover:bg-white"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((s) => (
            <motion.div
              key={s.name}
              variants={item}
              className="water-hover group relative overflow-hidden rounded-3xl border border-border bg-white/70 backdrop-blur-xl"
              whileHover={
                reduceMotion ? undefined : { y: -5, transition: { duration: 0.22 } }
              }
            >
              {/* hover wash */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(250,78,27,0.16),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(248,135,24,0.12),transparent_60%)]" />
              </div>

              <div className="relative p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-extrabold tracking-tight">
                    {s.name}
                  </h3>

                  <span className="inline-flex items-center gap-1 rounded-full border border-border bg-white/70 px-3 py-1 text-[11px] font-semibold text-black/55 backdrop-blur">
                    <Sparkles className="h-3.5 w-3.5 text-[rgb(var(--brand))]" />
                    CAPS • IEB
                  </span>
                </div>

                <p className="mt-2 text-sm text-black/65">
                  Best for:{" "}
                  <span className="font-semibold text-black/75">
                    {s.tags.join(", ")}
                  </span>
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <Link
                    href={s.route}
                    className="btn-water inline-flex items-center gap-2 rounded-full border border-border bg-white/75 px-4 py-2 text-sm font-semibold text-black/75 backdrop-blur transition hover:bg-white"
                  >
                    View Subject <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/contact"
                    className="btn-water inline-flex items-center justify-center rounded-full bg-[rgb(var(--brand))] px-4 py-2 text-sm font-semibold text-white"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom mini CTA */}
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-10 rounded-3xl border border-border bg-white/65 px-6 py-6 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-black/80">
                Want a personalised learning plan?
              </p>
              <p className="mt-1 text-sm text-black/65">
                Tell us your grade and subject — we’ll recommend the best next steps.
              </p>
            </div>

            <Link
              href="/contact"
              className="btn-water inline-flex items-center justify-center rounded-full bg-[rgb(var(--brand))] px-6 py-3 text-sm font-extrabold text-white"
            >
              Book Free Consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
