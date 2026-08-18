import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BreadcrumbHero from "@/components/ui/BreadcrumbHero";
import StructuredData from "@/components/seo/StructuredData";
import { getCmsInsights } from "@/lib/cms";
import {
  absoluteUrl,
  buildPageMetadata,
  getBreadcrumbSchema,
  getWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Insights",
  description:
    "Practical education insights for school leaders, parents, learners, and education professionals.",
  path: "/insights",
  keywords: [
    "education insights",
    "matric preparation tips",
    "study habits",
    "teacher professional development insights",
    "school intervention strategies",
    "learner coaching advice",
  ],
  section: "Insights",
});

export default async function InsightsPage() {
  const posts = await getCmsInsights();

  const blogListingSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/insights#blog"),
    name: "Bridge The Gap Insights",
    url: absoluteUrl("/insights"),
    publisher: { "@id": absoluteUrl("/#organization") },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": absoluteUrl(`/insights/${post.slug}#article`),
      headline: post.title,
      datePublished: post.publishedAt,
      description: post.excerpt,
      url: absoluteUrl(`/insights/${post.slug}`),
      publisher: { "@id": absoluteUrl("/#organization") },
    })),
  };

  return (
    <>
      <StructuredData
        data={[
          getWebPageSchema({
            name: "Insights",
            path: "/insights",
            description:
              "Practical guidance and insight articles for education stakeholders.",
          }),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
          ]),
          blogListingSchema,
        ]}
      />
      <BreadcrumbHero
        title="Insights"
        subtitle="Practical insights for school leaders, parents, learners, and education professionals."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights" },
        ]}
      />

      <section className="relative w-full py-16 sm:py-20">
        <div className="container-tight grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="water-hover overflow-hidden rounded-3xl border border-border bg-white/75 backdrop-blur-xl"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">
                  {post.category}
                </p>
                <h2 className="mt-2 text-lg font-extrabold tracking-tight text-black/85">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-black/70">{post.excerpt}</p>
                <Link
                  href={`/insights/${post.slug}`}
                  className="mt-3 inline-flex text-sm font-semibold text-[rgb(var(--brand))]"
                >
                  Read article
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
