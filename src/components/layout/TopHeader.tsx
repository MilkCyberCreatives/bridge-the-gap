import { Facebook, Instagram, Linkedin } from "lucide-react";
export default function TopHeader() {
  return (
    <div className="w-full border-b border-white/10 bg-[linear-gradient(110deg,#121212,#1b1917_42%,#111111)] text-white">
      <div className="container-tight flex items-center justify-end gap-3 py-2 text-xs sm:justify-between sm:text-sm">
        <p className="hidden min-w-0 flex-1 truncate font-medium tracking-[0.01em] text-white/80 sm:block">
          Education support and professional development across CAPS and IB curricula.
        </p>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            data-track="topheader_instagram"
            data-track-location="top_header"
            className="water-hover inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-white/85 transition hover:bg-white/[0.16] hover:text-white"
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
            className="water-hover inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-white/85 transition hover:bg-white/[0.16] hover:text-white"
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
            className="water-hover inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-white/85 transition hover:bg-white/[0.16] hover:text-white"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
