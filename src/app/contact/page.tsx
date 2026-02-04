import BreadcrumbHero from "@/components/ui/BreadcrumbHero";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";

export default function ContactPage() {
  return (
    <>
      <BreadcrumbHero
        title="Contact"
        subtitle="Reach out for learner support, matric rewrite guidance, or educator development."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <section className="relative w-full py-16 sm:py-20">
        <div className="container-tight">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-wide text-black/55">
              Get In Touch
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Let’s plan the right support
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-black/70">
              Share your learner’s needs and we’ll respond with the best next steps.
            </p>
          </div>

          <div className="mx-auto mt-10 grid gap-4 md:grid-cols-3">
            <div className="water-hover rounded-3xl border border-border bg-white/70 p-6 backdrop-blur-xl">
              <p className="text-sm font-extrabold text-black/85">Email</p>
              <p className="mt-2 text-sm text-black/70 break-words">
                info@bridgethegapeducationalservices.co.za
              </p>
            </div>

            <div className="water-hover rounded-3xl border border-border bg-white/70 p-6 backdrop-blur-xl">
              <p className="text-sm font-extrabold text-black/85">WhatsApp</p>
              <p className="mt-2 text-sm text-black/70">
                Available during business hours
              </p>
            </div>

            <div className="water-hover rounded-3xl border border-border bg-white/70 p-6 backdrop-blur-xl">
              <p className="text-sm font-extrabold text-black/85">Support</p>
              <p className="mt-2 text-sm text-black/70">
                Grade R–12 • Matric Rewrite • Educator Development
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Must end with consultation form */}
      <ConsultationFormSection />
    </>
  );
}
