"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SERVICE_AREAS } from "@/data/site";
import { EASE_OUT } from "@/lib/motion";

export default function SubjectsSection() {
  const reduceMotion = useReducedMotion();

  const item = {
    hidden: reduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 28, filter: "blur(8px)" },
    show: reduceMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.72, ease: EASE_OUT },
        },
  };

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="max-w-3xl"
        >
          <motion.p variants={item} className="text-xs font-semibold uppercase tracking-[0.16em] text-black/55">
            Subjects and Focus Areas
          </motion.p>
          <motion.h2
            variants={item}
            className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            Subjects across CAPS and IB curricula.
          </motion.h2>
          <motion.p variants={item} className="mt-3 text-base leading-relaxed text-black/70">
            The expandable lists below are available for tutoring, matric support, and
            professional development. Each list includes an &quot;Other&quot; option.
          </motion.p>
        </motion.div>

        <div className="mt-8 grid gap-4">
          {SERVICE_AREAS.map((service) => (
            <motion.article
              key={service.id}
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease: EASE_OUT }}
              className="rounded-3xl border border-border bg-white/75 p-5 backdrop-blur-xl sm:p-6"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-extrabold tracking-tight text-black/85">
                  {service.title}
                </h3>
                <Link
                  href={`/programmes/${service.slug}`}
                  className="text-sm font-semibold text-[rgb(var(--brand))]"
                >
                  View service page
                </Link>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-black/68">{service.summary}</p>

              <div className="mt-4 grid gap-3">
                {service.subjectLists.map((list) => (
                  <details
                    key={`${service.id}-${list.headline}`}
                    className="group rounded-2xl border border-border bg-white/80 p-4"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-black/80">
                      {list.headline}
                      <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                    </summary>
                    <ul className="mt-3 space-y-2 text-sm text-black/70">
                      {list.items.map((itemValue) => (
                        <li key={itemValue} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[rgb(var(--brand))]" />
                          <span>{itemValue}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-border bg-white/70 p-5 text-sm leading-relaxed text-black/68 backdrop-blur-xl sm:p-6">
          Need a subject not listed above? Use the request flow and select{" "}
          <span className="font-semibold text-black/82">Other</span>. We will confirm
          scope and availability.
          <Link
            href="/request-a-subject"
            className="ml-2 inline-flex font-semibold text-[rgb(var(--brand))]"
          >
            Request a subject
          </Link>
        </div>
      </div>
    </section>
  );
}
