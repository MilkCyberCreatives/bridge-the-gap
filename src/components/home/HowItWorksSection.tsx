"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarCheck2, ClipboardList, MessageCircleReply, UsersRound } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";
import { CONTACT_DETAILS } from "@/data/site";

const STEPS = [
  {
    title: "1. Submit your booking request",
    description:
      "Select service area, audience type, subjects/focus areas, and preferred slot.",
    Icon: ClipboardList,
  },
  {
    title: "2. Availability is checked",
    description:
      "When calendar credentials are enabled, available times sync with the bookings mailbox and calendar.",
    Icon: CalendarCheck2,
  },
  {
    title: "3. We confirm scope and format",
    description:
      "We align on delivery model: one-on-one, group intervention, workshop, or coaching.",
    Icon: UsersRound,
  },
  {
    title: "4. Support starts with clear milestones",
    description:
      "You receive practical next steps and communication channels for progress tracking.",
    Icon: MessageCircleReply,
  },
];

export default function HowItWorksSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        <div className="rounded-[32px] border border-border bg-black p-7 text-white sm:p-10">
          <motion.div
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
              Booking Journey
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Clear process from first enquiry to delivery.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/78">
              Bookings are routed to {CONTACT_DETAILS.bookingsEmail}. If you enable
              Google Calendar integration in Vercel, unavailable slots are blocked
              automatically.
            </p>
          </motion.div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {STEPS.map((step) => (
              <motion.article
                key={step.title}
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className="water-hover rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-xl border border-white/15 bg-white/10 p-2">
                    <step.Icon className="h-5 w-5 text-[rgb(var(--brand-2))]" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold tracking-tight text-white/95">
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-white/78">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact#book"
              className="btn-water inline-flex items-center justify-center rounded-full bg-[rgb(var(--brand))] px-7 py-3 text-sm font-extrabold text-white"
            >
              Start Booking
            </Link>
            <a
              href={CONTACT_DETAILS.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="water-hover inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-3 text-sm font-semibold text-white"
            >
              WhatsApp {CONTACT_DETAILS.phoneLocal}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
