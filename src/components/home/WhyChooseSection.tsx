"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Target, ShieldCheck, TrendingUp, ArrowRight } from "lucide-react";

function useCountUp(target: number, startCounting: boolean, durationMs = 900) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!startCounting) return;

    const start = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(from + (target - from) * eased);
      setValue(next);

      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, startCounting, durationMs]);

  return value;
}

export default function WhyChooseSection() {
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  const stats = useMemo(
    () => [
      { label: "Learner Support", value: 100, suffix: "%", hint: "Focused support approach" },
      { label: "Curriculum Alignment", value: 2, suffix: "x", hint: "CAPS + IEB coverage" },
      { label: "Progress Focus", value: 3, suffix: " Steps", hint: "Assess • Teach • Track" },
      { label: "Confidence Building", value: 1, suffix: " Goal", hint: "Better results + mindset" },
    ],
    []
  );

  const count1 = useCountUp(stats[0].value, inView, 950);
  const count2 = useCountUp(stats[1].value, inView, 850);
  const count3 = useCountUp(stats[2].value, inView, 850);
  const count4 = useCountUp(stats[3].value, inView, 850);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduceMotion ? { duration: 0.01 } : { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: reduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 34, scale: 0.98, filter: "blur(10px)" },
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
    <section className="relative w-full overflow-hidden">
      {/* ✅ Full-width background image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/why-choose.jpg')" }}
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.3, ease: "easeOut" }}
      />

      {/* Premium overlay (keeps it readable + on-brand) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(250,78,27,0.20),transparent_55%),radial-gradient(circle_at_85%_25%,rgba(248,135,24,0.14),transparent_55%)]" />

      <div className="relative z-10">
        <div className="container-tight py-16 sm:py-20">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            onViewportEnter={() => setInView(true)}
            className="grid gap-10 lg:grid-cols-2 lg:items-center"
          >
            {/* Left: Trust message */}
            <motion.div variants={item} className="max-w-xl">
              <p className="text-xs font-semibold tracking-wide text-white/70">
                Why Choose Us
              </p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Premium Support Built For South African Learners
              </h2>

              <p className="mt-4 text-base leading-relaxed text-white/85">
                We bridge learning gaps through structured tutoring support, smart revision,
                and consistent progress tracking — aligned to CAPS and IEB standards.
              </p>

              <div className="mt-7 grid gap-3">
                {[
                  {
                    Icon: BadgeCheck,
                    title: "CAPS & IEB aligned support",
                    desc: "Tutoring that matches what learners are assessed on in South Africa.",
                  },
                  {
                    Icon: Target,
                    title: "Focused gap targeting",
                    desc: "We identify the gaps and work on them directly — no guessing.",
                  },
                  {
                    Icon: TrendingUp,
                    title: "Progress tracking & feedback",
                    desc: "Clear feedback so learners improve with confidence over time.",
                  },
                  {
                    Icon: ShieldCheck,
                    title: "Safe, supportive learning environment",
                    desc: "A calm space that helps learners feel capable and motivated.",
                  },
                ].map(({ Icon, title, desc }) => (
                  <div
                    key={title}
                    className="water-hover rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl"
                  >
                    <div className="flex gap-3">
                      <div className="rounded-2xl border border-white/15 bg-white/10 p-2">
                        <Icon className="h-5 w-5 text-[rgb(var(--brand))]" />
                      </div>
                      <div>
                        <p className="font-bold text-white">{title}</p>
                        <p className="mt-1 text-sm text-white/80">{desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="btn-water inline-flex items-center justify-center rounded-full bg-[rgb(var(--brand))] px-7 py-4 text-sm font-extrabold text-white"
                >
                  Book Free Consultation
                </Link>

                <Link
                  href="/programmes"
                  className="btn-water inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-xl"
                >
                  Explore Programmes <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Right: Stats grid */}
            <motion.div variants={item} className="grid gap-4 sm:grid-cols-2">
              <div className="water-hover rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
                <p className="text-sm font-semibold text-white/80">{stats[0].label}</p>
                <p className="mt-2 text-4xl font-extrabold tracking-tight text-white">
                  {count1}
                  {stats[0].suffix}
                </p>
                <p className="mt-2 text-sm text-white/75">{stats[0].hint}</p>
              </div>

              <div className="water-hover rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
                <p className="text-sm font-semibold text-white/80">{stats[1].label}</p>
                <p className="mt-2 text-4xl font-extrabold tracking-tight text-white">
                  {count2}
                  {stats[1].suffix}
                </p>
                <p className="mt-2 text-sm text-white/75">{stats[1].hint}</p>
              </div>

              <div className="water-hover rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
                <p className="text-sm font-semibold text-white/80">{stats[2].label}</p>
                <p className="mt-2 text-4xl font-extrabold tracking-tight text-white">
                  {count3}
                  {stats[2].suffix}
                </p>
                <p className="mt-2 text-sm text-white/75">{stats[2].hint}</p>
              </div>

              <div className="water-hover rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
                <p className="text-sm font-semibold text-white/80">{stats[3].label}</p>
                <p className="mt-2 text-4xl font-extrabold tracking-tight text-white">
                  {count4}
                  {stats[3].suffix}
                </p>
                <p className="mt-2 text-sm text-white/75">{stats[3].hint}</p>
              </div>

              <div className="sm:col-span-2 water-hover rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
                <p className="text-sm font-semibold text-white/85">
                  Tip: Matric & exam support works best with consistency.
                </p>
                <p className="mt-2 text-sm text-white/75">
                  Book a free consultation and we’ll recommend a practical tutoring plan.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
