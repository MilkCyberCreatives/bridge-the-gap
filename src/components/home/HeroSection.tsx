"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CONTACT_DETAILS } from "@/data/site";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.04 }}
          animate={{ scale: [1.04, 1.1, 1.04], x: [0, -10, 0], y: [0, 6, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/hero/hero-bg.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-white/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(250,78,27,0.23),transparent_52%),radial-gradient(circle_at_86%_18%,rgba(248,135,24,0.17),transparent_50%)]" />
      </div>

      <div className="container-tight relative min-h-[calc(100svh-var(--hdr))] py-14 sm:py-20">
        <div className="grid min-h-[calc(100svh-var(--hdr)-4rem)] items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-black/60"
            >
              RushedTech Educational Services
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
              className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[58px] lg:leading-[1.02]"
            >
              Education support and professional development that moves real outcomes.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
              className="mt-5 max-w-2xl text-base leading-relaxed text-black/72 sm:text-lg"
            >
              Bridge The Gap serves school leaders, parents, and learners through four
              core areas: tutoring services, matric support, teacher professional
              development, and coaching. Subjects are offered across CAPS and IB
              curricula.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/contact#book"
                className="btn-water inline-flex items-center justify-center rounded-full bg-[rgb(var(--brand))] px-8 py-3 text-sm font-extrabold text-white"
              >
                Book Consultation
              </Link>
              <Link
                href="/programmes"
                className="btn-water inline-flex items-center justify-center rounded-full border border-border bg-white/80 px-8 py-3 text-sm font-semibold text-black/80"
              >
                Explore Service Areas
              </Link>
            </motion.div>

            <p className="mt-6 text-xs text-black/60">
              WhatsApp {CONTACT_DETAILS.phoneLocal} | {CONTACT_DETAILS.addressLine}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"
          >
            {[
              "Tutoring Services",
              "Matric Support Services",
              "Teacher Professional Development",
              "Coaching Services",
            ].map((item) => (
              <div
                key={item}
                className="water-hover rounded-2xl border border-border bg-white/75 px-5 py-4 backdrop-blur"
              >
                <p className="text-sm font-semibold text-black/80">{item}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
