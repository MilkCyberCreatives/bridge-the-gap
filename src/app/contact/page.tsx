import type { Metadata } from "next";
import BreadcrumbHero from "@/components/ui/BreadcrumbHero";
import ConsultationFormSection from "@/components/home/ConsultationFormSection";
import StructuredData from "@/components/seo/StructuredData";
import { CONTACT_DETAILS } from "@/data/site";
import {
  absoluteUrl,
  buildPageMetadata,
  getBreadcrumbSchema,
  getWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact and Bookings",
  description:
    "Contact Bridge The Gap Educational Services for tutoring, matric support, teacher professional development, and coaching bookings.",
  path: "/contact",
  keywords: [
    "book consultation",
    "education support contact",
    "Kempton Park education services",
  ],
});

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact and Bookings",
    url: absoluteUrl("/contact"),
    email: CONTACT_DETAILS.bookingsEmail,
    telephone: CONTACT_DETAILS.phoneIntl,
    areaServed: "South Africa",
  };

  return (
    <>
      <StructuredData
        data={[
          getWebPageSchema({
            name: "Contact and Bookings",
            path: "/contact",
            description:
              "Contact Bridge The Gap for bookings, consultations, and service enquiries.",
          }),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          contactSchema,
        ]}
      />
      <BreadcrumbHero
        title="Contact and Bookings"
        subtitle="Book tutoring, matric support, teacher development, or coaching support."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <section className="relative w-full py-16 sm:py-20">
        <div className="container-tight">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-4 md:auto-rows-fr md:grid-cols-3">
              <div className="water-hover h-full rounded-3xl border border-border bg-white/75 p-6 backdrop-blur-xl">
                <p className="text-sm font-extrabold text-black/85">Bookings Email</p>
                <a
                  href={`mailto:${CONTACT_DETAILS.bookingsEmail}`}
                  className="mt-2 block break-all text-sm text-black/70"
                >
                  {CONTACT_DETAILS.bookingsEmail}
                </a>
              </div>

              <div className="water-hover h-full rounded-3xl border border-border bg-white/75 p-6 backdrop-blur-xl">
                <p className="text-sm font-extrabold text-black/85">WhatsApp</p>
                <a
                  href={CONTACT_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-sm text-black/70"
                >
                  {CONTACT_DETAILS.phoneLocal}
                </a>
              </div>

              <div className="water-hover h-full rounded-3xl border border-border bg-white/75 p-6 backdrop-blur-xl">
                <p className="text-sm font-extrabold text-black/85">Address</p>
                <p className="mt-2 text-sm text-black/70">{CONTACT_DETAILS.addressLine}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConsultationFormSection
        title="Schedule your consultation"
        subtitle="Bookings can be synchronized with your calendar availability once Google Calendar variables are set in Vercel."
      />
    </>
  );
}
