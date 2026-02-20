"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

type Crumb = { label: string; href?: string };

const DEFAULT_IMAGE = "/images/breadcrumbs/master.jpg";

export default function BreadcrumbHero({
  title,
  subtitle,
  crumbs,
  image = DEFAULT_IMAGE,
}: {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  image?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative min-h-[300px] sm:min-h-[340px]">
        <div className="absolute inset-0">
          <motion.div
            initial={reduceMotion ? { scale: 1 } : { scale: 1.06 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: 1.8, ease: "easeOut" }
            }
            className="absolute inset-0"
          >
            <Image
              src={image}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>

          <div className="absolute inset-0 bg-slate-950/62" />
        </div>

        <div className="relative z-10">
          <div className="container-tight flex min-h-[300px] flex-col justify-end pb-10 sm:min-h-[340px] sm:pb-12">
            {crumbs?.length ? (
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/15 bg-black/25 px-4 py-2 text-xs text-white/80">
                  {crumbs.map((c, i) => (
                    <span key={`${c.label}-${i}`} className="inline-flex items-center gap-2">
                      {c.href ? (
                        <Link
                          href={c.href}
                          className="font-semibold text-white/90 hover:text-white"
                        >
                          {c.label}
                        </Link>
                      ) : (
                        <span className="font-semibold text-white">{c.label}</span>
                      )}
                      {i < crumbs.length - 1 ? (
                        <span className="text-white/45">/</span>
                      ) : null}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <motion.h1
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease: "easeOut" }}
              className="max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
            >
              {title}
            </motion.h1>

            {subtitle ? (
              <motion.p
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.75, ease: "easeOut", delay: 0.05 }
                }
                className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80 sm:text-base"
              >
                {subtitle}
              </motion.p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
