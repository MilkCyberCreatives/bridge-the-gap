"use client";

import { MessageCircle } from "lucide-react";
import { CONTACT_DETAILS } from "@/data/site";
import { useFooterDockOffset } from "@/hooks/useFooterDockOffset";

export default function FloatingWhatsAppButton() {
  const dockStyle = useFooterDockOffset(20);

  return (
    <a
      href={CONTACT_DETAILS.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      data-track="floating_whatsapp"
      data-track-location="floating_cta"
      style={dockStyle}
      className="btn-water fixed left-5 z-[60] inline-flex items-center justify-center rounded-full bg-[rgb(var(--brand))] p-4 text-white"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}
