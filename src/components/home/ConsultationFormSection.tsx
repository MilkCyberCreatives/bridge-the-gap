"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  AUDIENCE_OPTIONS,
  CURRICULUM_OPTIONS,
  SERVICE_OPTIONS,
  getSelectableDates,
  type AvailabilitySlot,
} from "@/lib/booking";
import { CONTACT_DETAILS, FORM_FOCUS_OPTIONS } from "@/data/site";

type ConsultationFormSectionProps = {
  title?: string;
  subtitle?: string;
  presetService?: string;
};

type SubmitState =
  | { status: "idle"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const INITIAL_SUBMIT_STATE: SubmitState = {
  status: "idle",
  message: "",
};

function formatDateLabel(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-ZA", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ConsultationFormSection({
  title = "Book a Consultation",
  subtitle = "Choose your service, preferred time, and focus areas. We will confirm your booking by email and WhatsApp.",
  presetService,
}: ConsultationFormSectionProps) {
  const reduceMotion = useReducedMotion();
  const selectableDates = useMemo(() => getSelectableDates(21), []);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [audience, setAudience] = useState(AUDIENCE_OPTIONS[0]);
  const [service, setService] = useState(presetService || SERVICE_OPTIONS[0]?.value || "");
  const [curriculum, setCurriculum] = useState(CURRICULUM_OPTIONS[0]);
  const [preferredDate, setPreferredDate] = useState(selectableDates[0] ?? "");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");
  const [otherSubject, setOtherSubject] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);

  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>(INITIAL_SUBMIT_STATE);

  useEffect(() => {
    if (!preferredDate) {
      setSlots([]);
      setPreferredTime("");
      return;
    }

    let mounted = true;
    setLoadingSlots(true);
    setSubmitState(INITIAL_SUBMIT_STATE);

    fetch(`/api/availability?date=${preferredDate}`)
      .then(async (response) => {
        const data = await response.json();
        if (!mounted) return;

        if (!response.ok || !data.ok) {
          setSlots([]);
          setPreferredTime("");
          return;
        }

        const availableSlots: AvailabilitySlot[] = data.slots || [];
        setSlots(availableSlots);

        const firstAvailable = availableSlots.find((slot) => slot.available);
        setPreferredTime(firstAvailable?.time || "");
      })
      .catch(() => {
        if (!mounted) return;
        setSlots([]);
        setPreferredTime("");
      })
      .finally(() => {
        if (mounted) setLoadingSlots(false);
      });

    return () => {
      mounted = false;
    };
  }, [preferredDate]);

  useEffect(() => {
    if (!presetService) return;
    setService(presetService);
  }, [presetService]);

  function toggleSubject(value: string) {
    setSubjects((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setSubmitState(INITIAL_SUBMIT_STATE);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          organisation,
          audience,
          service,
          curriculum,
          preferredDate,
          preferredTime,
          message,
          subjects,
          otherSubject,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setSubmitState({
          status: "error",
          message:
            data.message ||
            "We could not complete the booking. Please try again with another slot.",
        });
        return;
      }

      const availabilityNote = data.calendarLinked
        ? "Calendar sync is active for this booking."
        : "Booking was received. Calendar sync can be enabled in Vercel environment settings.";

      setSubmitState({
        status: "success",
        message: `Request submitted successfully. ${availabilityNote}`,
      });

      setMessage("");
      setOtherSubject("");
      setSubjects([]);
    } catch {
      setSubmitState({
        status: "error",
        message: "We could not send your request. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const item = {
    hidden: reduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 16, filter: "blur(8px)" },
    show: reduceMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.65, ease: EASE_OUT },
        },
  };

  return (
    <section className="relative w-full py-16 sm:py-20" id="book">
      <div className="container-tight">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={item}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55"
          >
            Consultation Booking
          </motion.p>
          <motion.h2
            variants={item}
            className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={item}
            className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-black/70"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        <motion.form
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: EASE_OUT }}
          className="mx-auto mt-10 w-full max-w-6xl rounded-[28px] border border-border bg-white/80 p-6 backdrop-blur-xl sm:p-8"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4 lg:grid-cols-3">
            <input
              className="water-hover h-12 rounded-full border border-border bg-white/80 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/25"
              placeholder="Full Name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
            <input
              className="water-hover h-12 rounded-full border border-border bg-white/80 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/25"
              placeholder="Phone / WhatsApp"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
            />
            <input
              type="email"
              className="water-hover h-12 rounded-full border border-border bg-white/80 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/25"
              placeholder="Email Address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <input
              className="water-hover h-12 rounded-full border border-border bg-white/80 px-5 text-sm outline-none placeholder:text-black/45 focus:border-black/25"
              placeholder="School / Organisation (Optional)"
              value={organisation}
              onChange={(event) => setOrganisation(event.target.value)}
            />

            <select
              className="water-hover h-12 rounded-full border border-border bg-white/80 px-5 text-sm outline-none focus:border-black/25"
              value={audience}
              onChange={(event) => setAudience(event.target.value)}
            >
              {AUDIENCE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              className="water-hover h-12 rounded-full border border-border bg-white/80 px-5 text-sm outline-none focus:border-black/25"
              value={service}
              onChange={(event) => setService(event.target.value)}
            >
              {SERVICE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              className="water-hover h-12 rounded-full border border-border bg-white/80 px-5 text-sm outline-none focus:border-black/25"
              value={curriculum}
              onChange={(event) => setCurriculum(event.target.value)}
            >
              {CURRICULUM_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              className="water-hover h-12 rounded-full border border-border bg-white/80 px-5 text-sm outline-none focus:border-black/25"
              value={preferredDate}
              onChange={(event) => setPreferredDate(event.target.value)}
            >
              {selectableDates.map((date) => (
                <option key={date} value={date}>
                  {formatDateLabel(date)}
                </option>
              ))}
            </select>

            <div className="rounded-2xl border border-border bg-white/75 px-4 py-3 text-xs text-black/60">
              Availability is checked against {CONTACT_DETAILS.bookingsEmail} when Google
              Calendar credentials are configured in Vercel.
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-white/65 p-4">
            <p className="text-sm font-semibold text-black/80">Choose a preferred time</p>
            {loadingSlots ? (
              <p className="mt-3 text-sm text-black/55">Loading available slots...</p>
            ) : slots.length === 0 ? (
              <p className="mt-3 text-sm text-black/55">
                No slots are available on this date.
              </p>
            ) : (
              <div className="mt-3 flex flex-wrap gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setPreferredTime(slot.time)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                      preferredTime === slot.time
                        ? "border-transparent bg-[rgb(var(--brand))] text-white"
                        : slot.available
                        ? "border-border bg-white/90 text-black/75 hover:bg-white"
                        : "cursor-not-allowed border-border bg-black/5 text-black/35"
                    }`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <details className="mt-5 rounded-2xl border border-border bg-white/65 p-4 open:pb-5">
            <summary className="cursor-pointer text-sm font-semibold text-black/80">
              Subjects / focus areas (CAPS and IB) - expand to select
            </summary>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {FORM_FOCUS_OPTIONS.map((option) => {
                const selected = subjects.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleSubject(option)}
                    className={`rounded-full border px-4 py-2 text-left text-xs font-semibold transition ${
                      selected
                        ? "border-transparent bg-[rgb(var(--brand))] text-white"
                        : "border-border bg-white/90 text-black/75 hover:bg-white"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <input
              className="water-hover mt-4 h-11 w-full rounded-full border border-border bg-white/90 px-4 text-sm outline-none placeholder:text-black/45 focus:border-black/25"
              placeholder="Other subject or focus area"
              value={otherSubject}
              onChange={(event) => setOtherSubject(event.target.value)}
            />
          </details>

          <textarea
            className="water-hover mt-5 min-h-[160px] w-full rounded-3xl border border-border bg-white/80 px-5 py-4 text-sm outline-none placeholder:text-black/45 focus:border-black/25"
            placeholder="Please share your goals, challenges, preferred session format, and deadlines."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
          />

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <button
              type="submit"
              disabled={submitting}
              className="btn-water inline-flex h-12 items-center justify-center rounded-full bg-[rgb(var(--brand))] px-8 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Submitting..." : "Submit Booking Request"}
            </button>
            <p className="text-xs text-black/55">
              We respond during business hours. WhatsApp: {CONTACT_DETAILS.phoneLocal}
            </p>
          </div>

          {submitState.status !== "idle" ? (
            <p
              className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
                submitState.status === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {submitState.message}
            </p>
          ) : null}
        </motion.form>
      </div>
    </section>
  );
}
