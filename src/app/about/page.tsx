import type { Metadata } from "next";
import BreadcrumbHero from "@/components/ui/BreadcrumbHero";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";
import StructuredData from "@/components/seo/StructuredData";
import {
  buildPageMetadata,
  getBreadcrumbSchema,
  getWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "Learn how Bridge The Gap Educational Services supports school leaders, parents, learners, and educators through integrated education services.",
  path: "/about",
  keywords: ["about Bridge The Gap", "education support provider", "Bridge The Gap services"],
  section: "About",
});

export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={[
          getWebPageSchema({
            name: "About Bridge The Gap",
            path: "/about",
            description:
              "About Bridge The Gap Educational Services and its integrated education support model.",
          }),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <BreadcrumbHero
        title="About Bridge The Gap"
        subtitle="Bridge The Gap Educational Services is an education support and professional development provider for learners, schools, and education professionals."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      <section className="relative w-full py-16 sm:py-20">
        <div className="container-tight">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-border bg-white/75 p-6 backdrop-blur-xl sm:p-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-black/85">
                Our positioning
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-black/70">
                We provide integrated education support for schools, families, and
                education professionals. Our work combines learner-facing interventions
                with teacher and leadership development to create measurable academic
                improvement.
              </p>
            </article>

            <article className="rounded-3xl border border-border bg-white/75 p-6 backdrop-blur-xl sm:p-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-black/85">
                Service model
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-black/70">
                <li>Tutoring services across CAPS and IB curricula.</li>
                <li>Matric support: rewrites, subject additions, and SBA portfolio support.</li>
                <li>Teacher professional development: workshops, training, coaching.</li>
                <li>Coaching services for learners and education professionals.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <ConsultationFormSection
        title="Discuss a partnership or support plan"
        subtitle="Book a consultation to align support with your learner, department, or school goals."
      />
    </>
  );
}
