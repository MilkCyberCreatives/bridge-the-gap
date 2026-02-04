"use client";

import Link from "next/link";
import { Mail, Phone, Instagram, Facebook } from "lucide-react";

export default function TopHeader() {
  return (
    <div className="w-full bg-black text-white">
      <div className="container-tight flex items-center justify-between py-2 text-xs sm:text-sm">
        <p className="truncate text-white/85">
          Touching the future through meaningful learning.
        </p>

        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href="mailto:info@bridgethegap.co.za"
            className="water-hover hidden items-center gap-2 rounded-full px-3 py-1 text-white/85 transition hover:text-white sm:flex"
          >
            <Mail className="h-4 w-4" />
            info@bridgethegap.co.za
          </a>

          <a
            href="https://wa.me/27600000000"
            target="_blank"
            rel="noreferrer"
            className="btn-water inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-semibold text-white transition hover:bg-white/15"
          >
            <Phone className="h-4 w-4" />
            WhatsApp
          </a>

          <Link
            href="#"
            className="water-hover inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/85 transition hover:bg-white/15 hover:text-white"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </Link>

          <Link
            href="#"
            className="water-hover inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/85 transition hover:bg-white/15 hover:text-white"
            aria-label="Facebook"
          >
            <Facebook className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
