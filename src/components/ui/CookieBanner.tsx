"use client";

import { useEffect, useState } from "react";

const KEY = "btg_cookie_consent"; // "granted" | "denied"

export function getCookieConsent(): "granted" | "denied" | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(KEY);
  if (v === "granted" || v === "denied") return v;
  return null;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = getCookieConsent();
    setVisible(existing === null);
  }, []);

  function setConsent(value: "granted" | "denied") {
    window.localStorage.setItem(KEY, value);
    setVisible(false);
    // Reload once so analytics can mount/unmount cleanly based on consent
    window.location.reload();
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] p-4 sm:p-5">
      <div className="container-tight">
        <div className="water-hover rounded-3xl border border-border bg-white/85 p-5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-extrabold text-black/85">
                Cookies & Privacy
              </p>
              <p className="mt-1 text-sm leading-relaxed text-black/65">
                We use cookies to understand how visitors use our website and to
                improve the experience. This helps us measure performance and
                visitor behaviour. You can accept or decline analytics cookies.
              </p>
              <p className="mt-2 text-xs text-black/55">
                This is aligned to POPIA principles (minimum data, purpose-limited usage).
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                onClick={() => setConsent("denied")}
                className="btn-water rounded-full border border-border bg-white/70 px-6 py-3 text-sm font-semibold text-black/75 backdrop-blur"
              >
                Decline
              </button>

              <button
                onClick={() => setConsent("granted")}
                className="btn-water rounded-full bg-[rgb(var(--brand))] px-6 py-3 text-sm font-extrabold text-white"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
