"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Mail, Phone, Send, Facebook, Instagram, Linkedin } from "lucide-react";

/** ✅ TikTok icon (clean inline SVG) */
function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21 8.5c-1.9.1-3.7-.5-5.1-1.7v8.1c0 3.4-2.7 6.1-6.1 6.1S3.7 18.3 3.7 14.9c0-3.4 2.7-6.1 6.1-6.1.4 0 .9.1 1.3.2v3.2c-.4-.2-.8-.3-1.3-.3-1.6 0-2.9 1.3-2.9 2.9s1.3 2.9 2.9 2.9 2.9-1.3 2.9-2.9V3h3.2c.2 1.4.9 2.7 2 3.6 1 .9 2.2 1.4 3.5 1.5v.4z" />
    </svg>
  );
}

const RECENT = [
  {
    title: "Study Habits That Improve Results",
    date: "04 Feb, 2026",
    href: "/insights/study-habits",
    image: "/images/blog/blog-1.webp",
  },
  {
    title: "A Practical Matric Preparation Plan",
    date: "04 Feb, 2026",
    href: "/insights/matric-plan",
    image: "/images/blog/blog-2.webp",
  },
];

export default function FooterSection() {
  const reduceMotion = useReducedMotion();

  const wrap: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const item: Variants = {
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
    <footer className="relative w-full bg-black text-white">
      {/* Top newsletter strip */}
      <div className="container-tight pt-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={wrap}
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/10 backdrop-blur-2xl"
        >
          {/* ✅ no logo here */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08), transparent 55%), radial-gradient(circle at 80% 20%, rgba(250,78,27,0.18), transparent 55%)",
            }}
          />

          <div className="relative grid gap-6 px-6 py-6 sm:px-8 md:grid-cols-[1.2fr_1.8fr] md:items-center">
            <motion.div variants={item}>
              <p className="text-sm font-extrabold tracking-tight sm:text-base">
                Subscribe Newsletter
              </p>
              <p className="mt-1 text-sm text-white/70">
                Get useful tips, updates and learning support guidance.
              </p>
            </motion.div>

            <motion.form
              variants={item}
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full items-center gap-3"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 w-full rounded-full border border-white/10 bg-white/10 pl-11 pr-4 text-sm text-white placeholder:text-white/50 outline-none backdrop-blur-xl"
                />
              </div>

              <button
                type="submit"
                className="btn-water inline-flex h-12 w-12 items-center justify-center rounded-full bg-[rgb(var(--brand))] text-white"
                aria-label="Subscribe"
              >
                <Send className="h-5 w-5" />
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>

      {/* Main footer content */}
      <div className="container-tight pb-10 pt-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          variants={wrap}
          className="grid gap-10 md:grid-cols-4"
        >
          {/* Column 1 */}
          <motion.div variants={item}>
            {/* ✅ cleaner logo positioning */}
            <div className="flex items-start">
              <div className="relative h-20 w-[300px] sm:h-24 sm:w-[340px]">
                <Image
                  src="/bridge-the-gap-footer.svg"
                  alt="Bridge The Gap Educational Services"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 300px, 340px"
                  priority={false}
                />
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              Bridge The Gap Educational Services provides structured learner support,
              matric assistance, and educator development aligned to South African standards.
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-start gap-3 text-white/80">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[rgb(var(--brand))]" />
                <a className="water-hover inline-block" href="tel:+27000000000">
                  +27 (0) XX XXX XXXX
                </a>
              </div>

              {/* ✅ FIX: email will never cut off */}
              <div className="flex items-start gap-3 text-white/80">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[rgb(var(--brand))]" />
                <a
                  className="water-hover inline-block break-all"
                  href="mailto:info@bridgethegapeducationalservices.co.za"
                >
                  info@bridgethegapeducationalservices.co.za
                </a>
              </div>
            </div>
          </motion.div>

          {/* Column 2 */}
          <motion.div variants={item}>
            <h4 className="text-sm font-extrabold tracking-tight">Programmes</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li>
                <Link className="water-hover inline-block" href="/programmes">
                  Learner Support (Grade R–12)
                </Link>
              </li>
              <li>
                <Link className="water-hover inline-block" href="/programmes">
                  Matric Support & Rewrite
                </Link>
              </li>
              <li>
                <Link className="water-hover inline-block" href="/programmes">
                  Study Skills & Exam Prep
                </Link>
              </li>
              <li>
                <Link className="water-hover inline-block" href="/programmes">
                  Educator Development
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 3 */}
          <motion.div variants={item}>
            <h4 className="text-sm font-extrabold tracking-tight">Quick Links</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li>
                <Link className="water-hover inline-block" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="water-hover inline-block" href="/subjects">
                  Subjects
                </Link>
              </li>
              <li>
                <Link className="water-hover inline-block" href="/how-it-works">
                  How It Works
                </Link>
              </li>
              <li>
                <Link className="water-hover inline-block" href="/insights">
                  Insights
                </Link>
              </li>
              <li>
                <Link className="water-hover inline-block" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 4 */}
          <motion.div variants={item}>
            <h4 className="text-sm font-extrabold tracking-tight">Recent Posts</h4>

            <div className="mt-4 space-y-4">
              {RECENT.map((p) => (
                <Link
                  key={p.title}
                  href={p.href}
                  className="water-hover group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                >
                  {/* ✅ image that matches article */}
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/10">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-transparent to-transparent" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold text-white/90">
                      {p.title}
                    </p>
                    <p className="mt-1 text-xs text-white/55">{p.date}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* ✅ add LinkedIn + TikTok */}
            <div className="mt-5 flex items-center gap-3">
              <a
                className="water-hover inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5"
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 text-white/80" />
              </a>

              <a
                className="water-hover inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 text-white/80" />
              </a>

              <a
                className="water-hover inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5"
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 text-white/80" />
              </a>

              <a
                className="water-hover inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5"
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-4 w-4 text-white/80" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/55">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Bridge The Gap Educational Services. All rights reserved.</p>
            <p>
              Designed & built by{" "}
              <a
                className="water-hover font-extrabold text-white/80"
                href="https://milkcybercreatives.co.za"
                target="_blank"
                rel="noreferrer"
              >
                Milk Cyber Creatives
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
