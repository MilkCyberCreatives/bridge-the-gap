"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { SERVICE_AREAS } from "@/data/site";

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string; desc?: string }[];
};

function toLabelCase(value: string): string {
  return value
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

export default function MainHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  const nav = useMemo<NavItem[]>(
    () => [
      {
        label: "Services",
        children: SERVICE_AREAS.map((service) => ({
          label: service.title,
          href: `/programmes/${service.slug}`,
          desc: service.summary,
        })),
      },
      { label: "Subjects", href: "/subjects" },
      { label: "Insights", href: "/insights" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    []
  );

  const { scrollY } = useScroll();
  const headerBackground = useTransform(
    scrollY,
    [0, 120],
    ["rgba(255,255,255,0.88)", "rgba(255,255,255,0.98)"]
  );

  return (
    <>
      <motion.div
        style={{ backgroundColor: headerBackground }}
        className="w-full border-b border-slate-200/90 shadow-[0_8px_20px_rgba(15,23,42,0.06)]"
      >
        <div className="container-tight flex min-h-[84px] items-center justify-between py-2 sm:min-h-[96px] sm:py-3">
          <Link href="/" className="flex items-center" aria-label="Bridge The Gap">
            <div className="relative h-24 w-24 sm:h-28 sm:w-28">
              <Image
                src="/bridge-the-gap-icon.svg"
                alt="Bridge The Gap"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) =>
              item.children ? (
                <div key={item.label} className="group relative">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    className="nav-dance inline-flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-slate-900"
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4 text-slate-500 transition group-hover:rotate-180" />
                  </button>
                  <div className="pointer-events-none absolute left-1/2 top-full z-40 w-[430px] -translate-x-1/2 translate-y-1 scale-[0.98] pt-3 opacity-0 transition duration-150 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100">
                    <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_45px_rgba(15,23,42,0.12)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-4 py-3 transition hover:bg-slate-50 focus-visible:bg-slate-50"
                        >
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{child.label}</p>
                            {child.desc ? (
                              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                                {child.desc}
                              </p>
                            ) : null}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href || "/"}
                  className="nav-dance text-sm font-semibold text-slate-700 hover:text-slate-900"
                >
                  {toLabelCase(item.label)}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact#book"
              data-track="header_book_consultation"
              data-track-location="header"
              className="btn-water hidden rounded-full bg-[rgb(var(--brand))] px-6 py-3 text-sm font-bold text-white sm:inline-flex"
            >
              Book Consultation
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="water-hover inline-flex items-center justify-center rounded-full border border-slate-300 bg-white p-2 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.div
              className="fixed inset-0 z-[70] bg-black/35 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-[80] h-full w-[90%] max-w-[380px] border-l border-slate-200 bg-white p-5"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 30, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <p className="text-sm font-bold tracking-tight text-slate-800">Menu</p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="water-hover rounded-full border border-slate-200 p-2"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {nav.map((item) =>
                  item.children ? (
                    <div key={item.label} className="rounded-xl border border-slate-200 bg-white">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedMobile((prev) => (prev === item.label ? null : item.label))
                        }
                        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700"
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 transition ${
                            expandedMobile === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {expandedMobile === item.label ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden px-2 pb-2"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="water-hover block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href || "/"}
                      onClick={() => setMobileOpen(false)}
                      className="water-hover block rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      {toLabelCase(item.label)}
                    </Link>
                  )
                )}
              </div>

              <Link
                href="/contact#book"
                onClick={() => setMobileOpen(false)}
                data-track="mobile_header_book_consultation"
                data-track-location="mobile_menu"
                className="btn-water mt-5 inline-flex w-full items-center justify-center rounded-full bg-[rgb(var(--brand))] px-5 py-3 text-sm font-bold text-white"
              >
                Book Consultation
              </Link>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
