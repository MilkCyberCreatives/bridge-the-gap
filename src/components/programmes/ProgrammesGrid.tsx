"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const PROGRAMMES = [
  {
    title: "Learner Support (Grade R–12)",
    desc: "Structured tutoring support designed for steady progress, improved understanding, and confidence.",
    href: "/contact",
    image: "/images/programmes/programme-1.jpg",
    tag: "CAPS & IEB",
  },
  {
    title: "Matric Support & Rewrite",
    desc: "Targeted preparation, past paper strategy, and a practical plan that improves results.",
    href: "/contact",
    image: "/images/programmes/programme-2.jpg",
    tag: "Grade 12",
  },
  {
    title: "Study Skills & Exam Prep",
    desc: "Study routines, time management, and exam technique for consistent performance.",
    href: "/contact",
    image: "/images/programmes/programme-3.jpg",
    tag: "Exam Ready",
  },
];

export default function ProgrammesGrid() {
  const reduceMotion = useReducedMotion();

  const wrap: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
  };

  const item: Variants = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18, filter: "blur(10px)" },
    show: reduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={wrap}
          className="text-center"
        >
          <motion.p variants={item} className="text-xs font-semibold tracking-wide text-black/55">
            Programmes
          </motion.p>

          <motion.h2
            variants={item}
            className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            Choose The Support That Fits
          </motion.h2>

          <motion.p
            variants={item}
            className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-black/70"
          >
            Premium tutoring programmes designed for South African learning outcomes —
            clean, practical, and results-focused.
          </motion.p>

          <motion.div variants={item} className="mt-10 grid gap-4 md:grid-cols-3">
            {PROGRAMMES.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="water-hover group block overflow-hidden rounded-3xl border border-border bg-white/65 text-left backdrop-blur-xl"
              >
                {/* image with “slide” effect */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] group-hover:translate-x-2"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                  <div className="absolute left-4 top-4">
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-xl">
                      {p.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-extrabold tracking-tight text-black/85">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/70">{p.desc}</p>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-black/75">
                    Enquire now
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
