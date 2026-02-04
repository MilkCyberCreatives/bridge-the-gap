"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const PROGRAMMES = [
  {
    title: "Learner Support (Grade R–12)",
    desc: "Structured subject support that strengthens understanding, builds confidence, and improves performance.",
    href: "/programmes/learner-support",
    image: "/images/programmes/detail/learner-1.jpg",
    badge: "Grade R–12",
  },
  {
    title: "Matric Support & Rewrite",
    desc: "A practical preparation plan with past papers, strategy, and exam technique that improves marks.",
    href: "/programmes/matric-support",
    image: "/images/programmes/detail/matric-1.jpg",
    badge: "Matric",
  },
  {
    title: "Study Skills & Exam Prep",
    desc: "Study routines, focus systems, and revision methods learners can actually stick to — stress reduced.",
    href: "/programmes/study-skills",
    image: "/images/programmes/detail/study-1.jpg",
    badge: "Skills",
  },
];

export default function ProgrammesGridSection() {
  const reduceMotion = useReducedMotion();

  const wrap = {
    hidden: {},
    show: {
      transition: reduceMotion ? { duration: 0 } : { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18, filter: "blur(10px)" },
    show: reduceMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: "easeOut" },
        },
  };

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-wide text-black/55">Programmes</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Choose The Support That Fits Your Learner
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-black/70">
            Clean structure, consistent progress, and clear communication — built for South African learning outcomes.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={wrap}
          className="mt-10 grid gap-4 md:grid-cols-3"
        >
          {PROGRAMMES.map((p) => (
            <motion.div key={p.title} variants={item}>
              <Link
                href={p.href}
                className="water-hover group block overflow-hidden rounded-3xl border border-border bg-white/65 text-left backdrop-blur-xl"
              >
                {/* image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                  <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-extrabold text-white backdrop-blur-xl">
                    {p.badge}
                  </div>
                </div>

                {/* content */}
                <div className="p-6">
                  <h3 className="text-lg font-extrabold tracking-tight text-black/85">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/70">{p.desc}</p>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-black/75">
                    View programme
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
