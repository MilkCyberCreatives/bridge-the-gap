import { notFound } from "next/navigation";
import BreadcrumbHero from "@/components/ui/BreadcrumbHero";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";
import { SERVICE_AREAS } from "@/data/site";

type ServicePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return SERVICE_AREAS.map((service) => ({ slug: service.slug }));
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = SERVICE_AREAS.find((item) => item.slug === params.slug);
  if (!service) return notFound();

  return (
    <>
      <BreadcrumbHero
        title={service.title}
        subtitle={service.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/programmes" },
          { label: service.title },
        ]}
      />

      <section className="relative w-full py-16 sm:py-20">
        <div className="container-tight">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-3xl border border-border bg-white/75 p-6 backdrop-blur-xl sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/55">
                Programme Overview
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {service.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-black/70">{service.summary}</p>
              <ul className="mt-5 space-y-2 text-sm text-black/70">
                {service.focusAreas.map((focus) => (
                  <li key={focus} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[rgb(var(--brand))]" />
                    <span>{focus}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-3xl border border-border bg-white/75 p-6 backdrop-blur-xl sm:p-8">
              <p className="text-sm font-extrabold tracking-tight text-black/85">
                Benefits of {service.shortTitle}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-black/70">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[rgb(var(--brand))]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {service.subjectLists.map((list) => (
              <article
                key={`${service.id}-${list.headline}`}
                className="rounded-3xl border border-border bg-white/75 p-6 backdrop-blur-xl"
              >
                <h3 className="text-sm font-extrabold tracking-tight text-black/85">
                  {list.headline}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-black/70">
                  {list.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[rgb(var(--brand))]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ConsultationFormSection
        title={`Book ${service.title}`}
        subtitle="Select your preferred date and time and we will confirm the right delivery model."
        presetService={service.title}
      />
    </>
  );
}
