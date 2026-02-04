"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const POSTS = [
  {
    topic: "Study Skills",
    title: "Study Habits That Improve Results",
    excerpt:
      "Simple routines that help learners stay consistent, reduce stress, and build confidence over time.",
    date: "04 Feb 2026",
    href: "/insights/study-habits",
    image: "/images/blog/blog-1.jpg",
  },
  {
    topic: "Matric Support",
    title: "A Practical Matric Preparation Plan",
    excerpt:
      "A clear approach to past papers, time management, and the topics that move marks the most.",
    date: "04 Feb 2026",
    href: "/insights/matric-plan",
    image: "/images/blog/blog-2.jpg",
  },
  {
    topic: "CAPS & IEB",
    title: "CAPS vs IEB: What Support Should Look Like",
    excerpt:
      "How curriculum depth and assessment style differs — so tutoring stays aligned and effective.",
    date: "04 Feb 2026",
    href: "/insights/caps-vs-ieb",
    image: "/images/blog/blog-3.jpg",
  },
];

export default function BlogPreviewSection() {
  const reduceMotion = useReducedMotion();

  const headerItem = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18, filter: "blur(10px)" },
    show: reduceMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
  };

  const cardItem = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 26, filter: "blur(12px)" },
    show: reduceMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
        },
  };

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.22 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="text-center"
        >
          <motion.p variants={headerItem} className="text-xs font-semibold tracking-wide text-black/55">
            Latest Articles
          </motion.p>

          <motion.h2
            variants={headerItem}
            className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            Helpful Tips For Learners & Parents
          </motion.h2>

          <motion.p
            variants={headerItem}
            className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-black/70"
          >
            Guidance designed for South African learning outcomes — practical, clean, and easy to apply.
          </motion.p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {POSTS.map((p) => (
              <motion.div
                key={p.title}
                variants={cardItem}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="h-full"
              >
                <Link
                  href={p.href}
                  className="water-hover group block h-full overflow-hidden rounded-3xl border border-border bg-white/65 text-left backdrop-blur-xl"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <motion.div
                      className="absolute inset-0"
                      initial={false}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : { scale: 1.06 }
                      }
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={false}
                      />
                    </motion.div>

                    {/* premium overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                    {/* soft top shine on hover */}
                    <div className="pointer-events-none absolute -inset-x-10 -top-10 h-24 rotate-6 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-semibold text-black/70">
                        {p.topic}
                      </span>
                      <span className="text-xs text-black/55">{p.date}</span>
                    </div>

                    <h3 className="mt-4 text-lg font-extrabold tracking-tight text-black/85">
                      {p.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-black/70">
                      {p.excerpt}
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-black/75">
                      Read more
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div variants={headerItem} className="mt-10">
            <Link
              href="/insights"
              className="btn-water inline-flex items-center justify-center rounded-full bg-[rgb(var(--brand))] px-8 py-4 text-sm font-extrabold text-white"
            >
              View All Articles
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
