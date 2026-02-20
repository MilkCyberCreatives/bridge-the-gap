"use client";

import { MessageCircle } from "lucide-react";
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
        </div>
      </div>
    </div>
  );
}
