"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessagesSquare, ShieldCheck, Target, Users } from "lucide-react";

export default function SupportPromiseSection() {
  const reduceMotion = useReducedMotion();

  const item = {
    hidden: reduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 30, scale: 0.98, filter: "blur(10px)" },
    show: reduceMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
  };

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid gap-8 lg:grid-cols-2 lg:items-center"
        >
          <motion.div variants={item} className="max-w-xl">
            <p className="text-xs font-semibold tracking-wide text-black/55">
              Support Promise
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Tutoring That Feels Clear And Supportive
            </h2>

            <p className="mt-3 text-base leading-relaxed text-black/70">
              We keep it simple: understand the learner, target the gaps, and
              track progress consistently — in a calm, supportive environment.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="btn-water inline-flex items-center justify-center rounded-full bg-[rgb(var(--brand))] px-7 py-4 text-sm font-extrabold text-white"
              >
                Book Free Consultation
              </Link>

              <a
                href="https://wa.me/27600000000"
                target="_blank"
                rel="noreferrer"
                className="btn-water inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/70 px-7 py-4 text-sm font-semibold text-black/75 backdrop-blur"
              >
                WhatsApp Us <MessagesSquare className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div variants={item} className="grid gap-4 sm:grid-cols-2">
            {[
              {
                Icon: Users,
                title: "Learner-first approach",
                desc: "Support tailored to the learner’s needs and pace.",
              },
              {
                Icon: Target,
                title: "Gap targeting",
                desc: "We focus on weak areas to improve marks faster.",
              },
              {
                Icon: ShieldCheck,
                title: "Safe learning space",
                desc: "Encouraging environment that builds confidence.",
              },
              {
                Icon: ArrowRight,
                title: "Clear next steps",
                desc: "Simple, structured plans that are easy to follow.",
              },
            ].map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="water-hover rounded-3xl border border-border bg-white/70 p-6 backdrop-blur-xl"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl border border-border bg-white/75 p-2 backdrop-blur">
                    <Icon className="h-5 w-5 text-[rgb(var(--brand))]" />
                  </div>

                  <div>
                    <p className="text-sm font-extrabold text-black/80">{title}</p>
                    <p className="mt-1 text-sm text-black/65">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
