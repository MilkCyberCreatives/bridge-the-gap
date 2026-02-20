"use client";

import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { CONTACT_DETAILS } from "@/data/site";

export default function TopHeader() {
  return (
    <div className="w-full border-b border-white/10 bg-black text-white">
      <div className="container-tight flex flex-wrap items-center justify-between gap-2 py-2 text-xs sm:text-sm">
        <p className="font-medium text-white/80">
          Education support and professional development across CAPS and IB curricula.
        </p>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <a
            href={CONTACT_DETAILS.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-water inline-flex items-center gap-1 rounded-full bg-[rgb(var(--brand))] px-3 py-1 font-semibold text-white"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp {CONTACT_DETAILS.phoneLocal}
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="water-hover inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/85 transition hover:bg-white/15 hover:text-white"
          >
            <Instagram className="h-4 w-4" />
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="water-hover inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/85 transition hover:bg-white/15 hover:text-white"
          >
            <Facebook className="h-4 w-4" />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="water-hover inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/85 transition hover:bg-white/15 hover:text-white"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
