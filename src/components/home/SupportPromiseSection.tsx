"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SERVICE_AREAS } from "@/data/site";
import { EASE_OUT } from "@/lib/motion";

export default function SupportPromiseSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/55">
            Benefits by Service Area
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Why each service matters.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-black/70">
            The site now includes clear benefit blocks for tutoring, matric support,
            teacher professional development, and coaching as requested.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:auto-rows-fr lg:grid-cols-2">
          {SERVICE_AREAS.map((service) => (
            <motion.article
              key={service.id}
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
              className="water-hover flex h-full flex-col rounded-3xl border border-border bg-white/75 p-6 backdrop-blur-xl"
            >
              <h3 className="text-xl font-extrabold tracking-tight text-black/85">
                Benefits of {service.shortTitle}
              </h3>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-black/70">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[rgb(var(--brand))]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/programmes/${service.slug}`}
                className="btn-water mt-6 inline-flex self-start rounded-full border border-border bg-white/90 px-4 py-2 text-sm font-semibold text-black/80"
              >
                Learn more
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
