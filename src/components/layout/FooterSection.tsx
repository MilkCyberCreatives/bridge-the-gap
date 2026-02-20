"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CONTACT_DETAILS, SERVICE_AREAS } from "@/data/site";
import { INSIGHT_POSTS } from "@/data/insights";

export default function FooterSection() {
  const reduceMotion = useReducedMotion();

  const wrap: Variants = {
    hidden: {},
    show: {
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const item: Variants = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16, filter: "blur(8px)" },
    show: reduceMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.65, ease: "easeOut" },
        },
  };

  return (
    <footer
      id="site-footer"
      className="relative w-full bg-[linear-gradient(145deg,#121111,#0f0f0f_45%,#171513)] text-white"
    >
      <div className="container-tight pb-10 pt-10 sm:pt-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={wrap}
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]"
        >
          <motion.div variants={item}>
            <div className="relative h-20 w-full max-w-[300px]">
              <Image
                src="/bridge-the-gap-footer.svg"
                alt="Bridge The Gap Educational Services"
                fill
                className="object-contain"
                sizes="300px"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              RushedTech Educational Services trading as Bridge The Gap Educational
              Services offers tutoring, matric support, teacher professional development,
              and coaching services.
            </p>
            <div className="mt-4 space-y-3 text-sm text-white/80">
              <p className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[rgb(var(--brand))]" />
                <a href={`tel:${CONTACT_DETAILS.phoneIntl}`}>{CONTACT_DETAILS.phoneLocal}</a>
              </p>
              <p className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[rgb(var(--brand))]" />
                <a className="break-all" href={`mailto:${CONTACT_DETAILS.bookingsEmail}`}>
                  {CONTACT_DETAILS.bookingsEmail}
                </a>
              </p>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <h4 className="text-sm font-extrabold tracking-tight">Service Areas</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {SERVICE_AREAS.map((service) => (
                <li key={service.id}>
                  <Link className="water-hover inline-block" href={`/programmes/${service.slug}`}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

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

            <a
              href={CONTACT_DETAILS.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-water mt-5 inline-flex items-center gap-2 rounded-full bg-[rgb(var(--brand))] px-5 py-2.5 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
          </motion.div>

          <motion.div variants={item}>
            <h4 className="text-sm font-extrabold tracking-tight">Latest Insights</h4>
            <div className="mt-4 space-y-3">
              {INSIGHT_POSTS.slice(0, 2).map((post) => (
                <Link
                  key={post.slug}
                  href={`/insights/${post.slug}`}
                  className="water-hover block rounded-2xl border border-white/10 bg-white/[0.05] p-4"
                >
                  <p className="text-sm font-semibold text-white/90">{post.title}</p>
                  <p className="mt-1 text-xs text-white/55">{post.category}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/55">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>(c) 2026 Bridge The Gap Educational Services. All rights reserved.</p>
            <p>Bookings are managed in {CONTACT_DETAILS.timezone}.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
