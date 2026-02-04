"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useEffect } from "react";

export default function HeroSection() {
  // ✅ Hero water ripple
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  useEffect(() => {
    mx.set(50);
    my.set(50);
  }, [mx, my]);

  const ripple = useMotionTemplate`radial-gradient(circle at ${mx}% ${my}%, rgba(255,255,255,0.42), transparent 55%)`;

  return (
    <section
      // ✅ KEY FIX: hero is EXACTLY viewport height (no scroll)
      // ✅ box-border ensures padding is included inside the 100svh height
      className="relative h-[100svh] box-border overflow-hidden"
      onMouseMove={(e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        mx.set(x);
        my.set(y);
      }}
    >
      {/* ✅ Full-bleed background behind transparent headers */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05, x: 0, y: 0 }}
          animate={{
            scale: [1.05, 1.12, 1.05],
            x: [0, -14, 0],
            y: [0, 10, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/hero/hero-bg.jpg"
            alt=""
            fill
            priority
            // ✅ show more top of image (so it looks “lifted”)
            className="object-cover object-top"
          />
        </motion.div>

        {/* ✅ readability overlay */}
        <div className="absolute inset-0 bg-white/38" />

        {/* ✅ subtle animated wash */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at 18% 18%, rgba(250,78,27,0.20), transparent 55%), radial-gradient(circle at 82% 22%, rgba(248,135,24,0.16), transparent 55%)",
          }}
        />

        {/* ✅ water ripple */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundImage: ripple, opacity: 0.9 }}
        />

        {/* ✅ shimmer sweep */}
        <motion.div
          aria-hidden
          className="absolute -inset-x-40 inset-y-0 rotate-12"
          initial={{ x: "-40%" }}
          animate={{ x: "140%" }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
          }}
        />
      </div>

      {/* ✅ Content */}
      {/* KEY FIX: push content down by header height but keep hero at 100svh */}
      <div className="container-tight relative h-full pt-[var(--hdr)]">
        <div className="flex h-full items-center">
          {/* extra spacing so text never sticks to MainHeader */}
          <div className="max-w-2xl pt-8 sm:pt-12 lg:pt-14">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-2 text-xs font-semibold text-black/65 backdrop-blur"
            >
              <span className="h-2 w-2 rounded-full bg-brand" />
              CAPS & IEB Aligned • Grade R–12 • Matric Support
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
              className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[60px] lg:leading-[1.05]"
            >
              Improve Results With Focused Tutoring Support
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
              className="mt-4 max-w-xl text-base leading-relaxed text-black/70 sm:text-[17px]"
            >
              Bridge The Gap Educational Services offers structured learner
              support, matric assistance and educator development — built for
              South African standards.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/programmes"
                className="btn-water inline-flex items-center justify-center rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white"
              >
                Get Started
              </Link>

              <Link
                href="/subjects"
                className="btn-water inline-flex items-center justify-center rounded-full border border-border bg-white/75 px-8 py-3 text-sm font-semibold text-black/75 backdrop-blur"
              >
                Find A Subject
              </Link>
            </motion.div>

            <p className="mt-7 text-xs font-medium text-black/55">
              Learn smarter. Build confidence. Improve performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
