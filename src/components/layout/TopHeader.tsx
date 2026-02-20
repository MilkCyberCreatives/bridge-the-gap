import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { CONTACT_DETAILS } from "@/data/site";

export default function TopHeader() {
  return (
    <div className="w-full border-b border-white/10 bg-[linear-gradient(110deg,#121212,#1b1917_42%,#111111)] text-white">
      <div className="container-tight flex items-center justify-between gap-3 py-2 text-xs sm:text-sm">
        <p className="max-w-[52%] truncate font-medium tracking-[0.01em] text-white/80 sm:max-w-none">
          Education support and professional development across CAPS and IB curricula.
        </p>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={CONTACT_DETAILS.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            data-track="topheader_whatsapp"
            data-track-location="top_header"
            className="btn-water inline-flex items-center gap-1 rounded-full bg-[linear-gradient(120deg,rgb(var(--brand)),rgb(var(--brand-2)))] px-3 py-1 font-semibold text-white"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp {CONTACT_DETAILS.phoneLocal}
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            data-track="topheader_instagram"
            data-track-location="top_header"
            className="water-hover inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white/85 transition hover:bg-white/16 hover:text-white"
          >
            <Instagram className="h-4 w-4" />
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            data-track="topheader_facebook"
            data-track-location="top_header"
            className="water-hover inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white/85 transition hover:bg-white/16 hover:text-white"
          >
            <Facebook className="h-4 w-4" />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            data-track="topheader_linkedin"
            data-track-location="top_header"
            className="water-hover inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white/85 transition hover:bg-white/16 hover:text-white"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
