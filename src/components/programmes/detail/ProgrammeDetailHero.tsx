"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

type Crumb = { label: string; href?: string };

export default function ProgrammeDetailHero({
  title,
  subtitle,
  crumbs,
}: {
  title: string;
  subtitle: string;
  crumbs: Crumb[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/programmes/detail/hero.jpg"
          alt="Bridge The Gap programme"
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black/70" />
      </div>

      <div className="relative z-10">
        <div className="container-tight py-16 sm:py-20">
          {/* Breadcrumb */}
          <motion.nav
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur-xl"
            aria-label="Breadcrumb"
          >
            {crumbs.map((c, idx) => (
              <span key={c.label} className="inline-flex items-center gap-2">
                {idx !== 0 && <span className="text-white/45">/</span>}
                {c.href ? (
                  <Link href={c.href} className="water-hover font-semibold text-white/85">
                    {c.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-white/95">{c.label}</span>
                )}
              </span>
            ))}
          </motion.nav>

          {/* Title */}
          <motion.h1
            initial={
              reduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16, filter: "blur(10px)" }
            }
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="mt-6 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
            className="mt-4 max-w-2xl text-base leading-relaxed text-white/80"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
