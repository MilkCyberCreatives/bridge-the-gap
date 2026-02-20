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
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 hero-bg-motion">
          <Image
            src="/images/hero/hero-bg.webp"
            alt=""
            fill
            priority
            quality={68}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-white/66" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_22%,rgba(233,88,39,0.22),transparent_50%),radial-gradient(circle_at_90%_15%,rgba(196,132,61,0.16),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.18),rgba(247,243,237,0.6))]" />
      </div>

      <div className="container-tight relative min-h-[calc(100svh-var(--hdr))] py-14 sm:py-20">
        <div className="grid min-h-[calc(100svh-var(--hdr)-4rem)] items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/60">
              RushedTech Educational Services
            </p>

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-[60px] lg:leading-[1.01]">
              Education support and professional development that moves real outcomes.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-black/72 sm:text-[1.08rem]">
              Bridge The Gap serves school leaders, parents, and learners through four
              core areas: tutoring services, matric support, teacher professional
              development, and coaching. Subjects are offered across CAPS and IB
              curricula.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs sm:text-sm">
              <span className="rounded-full border border-border bg-white/80 px-4 py-2 font-semibold text-black/70">
                CAPS + IB Aligned
              </span>
              <span className="rounded-full border border-border bg-white/80 px-4 py-2 font-semibold text-black/70">
                Group + 1:1 + School Interventions
              </span>
              <span className="rounded-full border border-border bg-white/80 px-4 py-2 font-semibold text-black/70">
                Online and In-person
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact#book"
                data-track="hero_book_consultation"
                data-track-location="hero"
                className="btn-water inline-flex items-center justify-center rounded-full bg-[rgb(var(--brand))] px-8 py-3 text-sm font-extrabold text-white"
              >
                Book Consultation
              </Link>
              <Link
                href="/programmes"
                data-track="hero_explore_services"
                data-track-location="hero"
                className="btn-water inline-flex items-center justify-center rounded-full border border-border bg-white/86 px-8 py-3 text-sm font-semibold text-black/80"
              >
                Explore Service Areas
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {servicePillars.map((item, index) => (
              <div
                key={item.title}
                className="hero-service-card water-hover rounded-2xl px-5 py-4 backdrop-blur"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">
                  0{index + 1}
                </p>
                <p className="mt-1 text-sm font-semibold text-black/82">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-black/62">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
