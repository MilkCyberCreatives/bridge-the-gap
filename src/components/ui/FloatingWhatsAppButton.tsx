"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsAppButton() {
  return (
    <a
      href="https://wa.me/27600000000"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="btn-water fixed bottom-5 left-5 z-[60] inline-flex items-center justify-center rounded-full bg-[rgb(var(--brand))] p-4 text-white"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}
