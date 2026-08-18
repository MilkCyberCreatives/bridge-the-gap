"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SERVICE_AREAS } from "@/data/site";
import type { CmsProgramme } from "@/lib/cms-types";
import { EASE_OUT } from "@/lib/motion";

type ProgrammesSectionProps = {
  programmes?: CmsProgramme[];
};

export default function ProgrammesSection({
  programmes = SERVICE_AREAS as unknown as CmsProgramme[],
}: ProgrammesSectionProps) {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0.01 }
        : { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: reduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 30, scale: 0.98, filter: "blur(8px)" },
    show: reduceMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.75, ease: EASE_OUT },
        },
  };

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="max-w-3xl"
        >
          <motion.p variants={item} className="text-xs font-semibold uppercase tracking-[0.16em] text-black/55">
            Core Service Areas
          </motion.p>
          <motion.h2
            variants={item}
            className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            A full education support model, not only tutoring.
          </motion.h2>
          <motion.p variants={item} className="mt-3 text-base leading-relaxed text-black/70">
            The structure below reflects the full operating scope, including learner
            services and professional development support.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid gap-5 md:auto-rows-fr md:grid-cols-2"
        >
          {programmes.map((service) => (
            <motion.article
              key={service.id}
              variants={item}
              className="water-hover flex h-full flex-col rounded-3xl border border-border bg-white/75 p-6 backdrop-blur-xl"
              whileHover={reduceMotion ? undefined : { y: -5, transition: { duration: 0.2 } }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/50">
                {service.shortTitle}
              </p>
              <h3 className="mt-2 text-xl font-extrabold tracking-tight text-black/85">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-black/70">{service.summary}</p>
              <p className="mt-3 text-sm font-medium text-black/65">
                Target clients: {service.audience}
              </p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-black/70">
                {service.focusAreas.slice(0, 3).map((focus) => (
                  <li key={focus} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[rgb(var(--brand))]" />
                    <span>{focus}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/programmes/${service.slug}`}
                className="btn-water card-cta inline-flex items-center gap-2 self-start rounded-full border border-border bg-white/90 px-4 py-2 text-sm font-semibold text-black/80"
              >
                View service details <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
