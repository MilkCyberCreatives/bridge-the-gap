import { Facebook, Instagram, Linkedin } from "lucide-react";
import { CONTACT_DETAILS } from "@/data/site";

export default function TopHeader() {
  return (
    <div className="w-full border-b border-[#1f2937] bg-[#101828] text-white">
      <div className="container-tight flex items-center justify-end gap-3 py-2 text-xs sm:justify-between sm:py-2.5 sm:text-sm">
        <p className="hidden min-w-0 flex-1 truncate font-medium tracking-[0.01em] text-slate-200 sm:block">
          Education support and professional development across CAPS and IB curricula.
        </p>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={CONTACT_DETAILS.instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            data-track="topheader_instagram"
            data-track-location="top_header"
            className="water-hover inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] text-white/85 hover:bg-white/[0.14] hover:text-white"
          >
            <Instagram className="h-4 w-4" />
          </a>

          <a
            href={CONTACT_DETAILS.facebookUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            data-track="topheader_facebook"
            data-track-location="top_header"
            className="water-hover inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] text-white/85 hover:bg-white/[0.14] hover:text-white"
          >
            <Facebook className="h-4 w-4" />
          </a>

          <a
            href={CONTACT_DETAILS.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            data-track="topheader_linkedin"
            data-track-location="top_header"
            className="water-hover inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] text-white/85 hover:bg-white/[0.14] hover:text-white"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
