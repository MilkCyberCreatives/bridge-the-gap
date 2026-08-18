import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BreadcrumbHero from "@/components/ui/BreadcrumbHero";
import StructuredData from "@/components/seo/StructuredData";
import { INSIGHT_POSTS } from "@/data/insights";
import { getCmsInsight } from "@/lib/cms";
import {
  absoluteUrl,
  buildPageMetadata,
  getBreadcrumbSchema,
  getWebPageSchema,
  SITE_NAME,
} from "@/lib/seo";

type InsightDetailProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return INSIGHT_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: InsightDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCmsInsight(slug);
  if (!post) {
    return buildPageMetadata({
      title: "Article Not Found",
      description: "The requested insight article could not be found.",
      path: "/insights",
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${post.slug}`,
    keywords: [post.category, "education insight", "Bridge The Gap article"],
    type: "article",
    image: post.image,
    publishedTime: post.publishedAt,
    modifiedTime: post.publishedAt,
    section: post.category,
  });
}

export default async function InsightDetailPage({ params }: InsightDetailProps) {
  const { slug } = await params;
  const post = await getCmsInsight(slug);
  if (!post) return notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    description: post.excerpt,
    articleSection: post.category,
    keywords: [post.category, post.title, "education insights"],
    image: [absoluteUrl(post.image)],
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/bridge-the-gap-icon.svg"),
      },
    },
    mainEntityOfPage: absoluteUrl(`/insights/${post.slug}`),
    url: absoluteUrl(`/insights/${post.slug}`),
  };

  return (
    <>
      <StructuredData
        data={[
          getWebPageSchema({
            name: post.title,
            path: `/insights/${post.slug}`,
            description: post.excerpt,
          }),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: post.title, path: `/insights/${post.slug}` },
          ]),
          articleSchema,
        ]}
      />
      <BreadcrumbHero
        title={post.title}
        subtitle={post.excerpt}
        image={post.image}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: post.title },
        ]}
      />

      <section className="relative w-full py-16 sm:py-20">
        <article className="container-tight mx-auto max-w-3xl rounded-3xl border border-border bg-white/80 p-6 backdrop-blur-xl sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">
            {post.category} | {post.readingMinutes} min read
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight">{post.title}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-black/72">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
