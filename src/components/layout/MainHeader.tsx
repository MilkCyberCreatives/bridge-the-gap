"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string; desc?: string }[];
};

function titleCase(input: string) {
  return input
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export default function MainHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav: NavItem[] = useMemo(
    () => [
      {
        label: "Programmes",
        children: [
          {
            label: "Learner Support (Grade R–12)",
            href: "/programmes/learner-support",
            desc: "Tutoring, homework, tests & exam prep",
          },
          {
            label: "Matric Support",
            href: "/programmes/matric-support",
            desc: "Rewrites, subject additions & revision",
          },
          {
            label: "Educator Development",
            href: "/programmes/educator-development",
            desc: "Coaching, workshops & classroom strategies",
          },
        ],
      },
      {
        label: "Subjects",
        children: [
          { label: "Mathematics", href: "/subjects/mathematics" },
          { label: "Sciences", href: "/subjects/sciences" },
          { label: "English", href: "/subjects/english" },
          { label: "Request A Subject", href: "/subjects/request" },
        ],
      },
      {
        label: "Resources",
        children: [
          { label: "Study Skills", href: "/success-toolkit/study-skills" },
          { label: "Exam Preparation", href: "/success-toolkit/exam-prep" },
          { label: "Learning Tips", href: "/success-toolkit/tips" },
        ],
      },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
    []
  );

  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 120],
    ["rgba(255,255,255,0.68)", "rgba(255,255,255,0.92)"]
  );

  return (
    <>
      {/* ✅ STRONG seam fix: overlap header upward slightly */}
      <motion.header
        style={{ backgroundColor: bg }}
        className="sticky top-0 z-50 w-full backdrop-blur-xl -mt-[6px]"
      >
        {/* ✅ add the same padding back so layout stays the same */}
        <div className="pt-[6px]">
          <div className="container-tight flex items-center justify-between py-2">
            <Link href="/" className="flex items-center" aria-label="Bridge The Gap">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28">
                <Image
                  src="/bridge-the-gap-icon.svg"
                  alt="Bridge The Gap"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-7 lg:flex">
              {nav.map((item) =>
                item.children ? (
                  <div key={item.label} className="group relative">
                    <span className="nav-dance water-hover relative cursor-pointer text-sm font-semibold text-black/75 transition hover:text-black">
                      {titleCase(item.label)}
                      <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                    </span>

                    {/* hover bridge */}
                    <div className="pointer-events-none absolute left-0 top-full h-4 w-[360px] opacity-0 group-hover:pointer-events-auto" />

                    <div className="pointer-events-none absolute left-0 top-full mt-3 w-[360px] opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                      <div className="rounded-2xl border border-border bg-white/90 p-2 backdrop-blur-xl">
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className="water-hover flex rounded-xl px-4 py-3 transition hover:bg-brand/5"
                          >
                            <div className="min-w-0">
                              <p className="nav-dance text-sm font-semibold text-black/80">
                                {c.label}
                              </p>
                              {c.desc ? (
                                <p className="mt-1 text-xs text-black/55">{c.desc}</p>
                              ) : null}
                            </div>
                            <span className="ml-auto mt-1 h-2 w-2 rounded-full bg-brand/25 transition group-hover:bg-brand" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href || "/"}
                    className="nav-dance water-hover group relative text-sm font-semibold text-black/75 transition hover:text-black"
                  >
                    <span>{titleCase(item.label)}</span>
                    <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                  </Link>
                )
              )}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="btn-water hidden sm:inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-extrabold text-white"
              >
                Book Free Consultation
              </Link>

              <button
                onClick={() => setMobileOpen(true)}
                className="water-hover inline-flex items-center justify-center rounded-full border border-border bg-white/70 p-2 backdrop-blur transition hover:bg-white lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>

          {/* subtle separator */}
          <div className="h-[1px] w-full bg-black/5" />
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-[70] h-full w-[86%] max-w-[380px] border-l border-border bg-white/92 backdrop-blur-xl"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 30, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="relative h-20 w-20">
                  <Image
                    src="/bridge-the-gap-icon.svg"
                    alt="Bridge The Gap"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="water-hover rounded-full border border-border bg-white/60 p-2 transition hover:bg-white"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-5 py-4">
                <p className="mb-3 text-xs font-semibold text-black/50">Menu</p>
                <div className="space-y-2">
                  {nav.map((item) =>
                    item.children ? (
                      <MobileAccordion
                        key={item.label}
                        title={titleCase(item.label)}
                        items={item.children}
                        onNavigate={() => setMobileOpen(false)}
                      />
                    ) : (
                      <Link
                        key={item.label}
                        href={item.href || "/"}
                        onClick={() => setMobileOpen(false)}
                        className="water-hover flex items-center justify-between rounded-xl border border-border bg-white/60 px-4 py-3 text-sm font-semibold text-black/80 transition hover:bg-brand/5"
                      >
                        {titleCase(item.label)}
                        <span className="h-2 w-2 rounded-full bg-brand/25" />
                      </Link>
                    )
                  )}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileAccordion({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: { label: string; href: string; desc?: string }[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-white/60">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-black/80"
      >
        {title}
        <span className="text-black/40">{open ? "−" : "+"}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-2 pb-2">
              {items.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  onClick={onNavigate}
                  className="water-hover block rounded-lg px-3 py-2 text-sm font-medium text-black/75 transition hover:bg-brand/5"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
