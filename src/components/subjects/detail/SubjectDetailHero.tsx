"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

type Crumb = { label: string; href?: string };

export default function SubjectDetailHero({
  title,
  subtitle,
  crumbs,
  image = "/images/breadcrumbs/master.jpg",
}: {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  image?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 1.8, ease: "easeOut" }}
        >
          <Image src={image} alt="" fill priority className="object-cover" />
        </motion.div>

        <div className="absolute inset-0 bg-slate-950/60" />
      </div>

      <div className="container-tight relative flex min-h-[300px] flex-col justify-end py-10 sm:min-h-[340px] sm:py-12">
        {crumbs?.length ? (
          <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs text-white/80">
            {crumbs.map((c, i) => (
              <span key={`${c.label}-${i}`} className="inline-flex items-center gap-2">
                {c.href ? (
                  <Link className="underline-offset-4 hover:underline" href={c.href}>
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/90">{c.label}</span>
                )}
                {i < crumbs.length - 1 ? <span className="text-white/50">/</span> : null}
              </span>
            ))}
          </nav>
        ) : null}

        <motion.h1
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease: "easeOut" }}
          className="max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          {title}
        </motion.h1>

        {subtitle ? (
          <motion.p
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80 sm:text-base"
          >
            {subtitle}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
