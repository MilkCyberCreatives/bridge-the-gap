import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const servicePillars = [
    {
      title: "Tutoring Services",
      summary: "Individual and group support across CAPS and IB curricula.",
    },
    {
      title: "Matric Support Services",
      summary: "Rewrites, subject additions, and SBA portfolio guidance.",
    },
    {
      title: "Teacher Professional Development",
      summary: "Workshops, coaching, and practical classroom implementation.",
    },
    {
      title: "Coaching Services",
      summary: "Performance coaching for learners and education professionals.",
    },
  ];

  return (
    <section className="relative -mt-[var(--hdr)] overflow-hidden bg-[rgb(var(--bg))] pt-[var(--hdr)]">
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-bg.webp"
            alt=""
            fill
            priority
            quality={72}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-white/76" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.25),rgba(243,246,250,0.92)_72%,rgb(var(--bg)))]" />
        <div className="pointer-events-none absolute inset-x-0 -bottom-px h-14 bg-gradient-to-b from-transparent to-[rgb(var(--bg))]" />
      </div>

      <div className="container-tight relative min-h-[calc(100svh-var(--hdr))] py-12 sm:py-16">
        <div className="grid min-h-[calc(100svh-var(--hdr)-3rem)] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              Bridge The Gap Educational Services
            </p>

            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-[58px]">
              Education support and professional development that moves real outcomes.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-[1.05rem]">
              Bridge The Gap serves school leaders, parents, and learners through four
              core areas: tutoring services, matric support, teacher professional
              development, and coaching. Subjects are offered across CAPS and IB
              curricula.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs sm:text-sm">
              <span className="rounded-full border border-border bg-white px-4 py-2 font-semibold text-slate-700">
                CAPS + IB Aligned
              </span>
              <span className="rounded-full border border-border bg-white px-4 py-2 font-semibold text-slate-700">
                Group + 1:1 + School Interventions
              </span>
              <span className="rounded-full border border-border bg-white px-4 py-2 font-semibold text-slate-700">
                Online and In-person
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact#book"
                data-track="hero_book_consultation"
                data-track-location="hero"
                className="btn-water inline-flex items-center justify-center rounded-full bg-[rgb(var(--brand))] px-8 py-3 text-sm font-bold text-white"
              >
                Book Consultation
              </Link>
              <Link
                href="/programmes"
                data-track="hero_explore_services"
                data-track-location="hero"
                className="btn-water inline-flex items-center justify-center rounded-full border border-border bg-white px-8 py-3 text-sm font-semibold text-slate-800"
              >
                Explore Service Areas
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {servicePillars.map((item, index) => (
              <div
                key={item.title}
                className="hero-service-card water-hover rounded-2xl px-5 py-4"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  0{index + 1}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
