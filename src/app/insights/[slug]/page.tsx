import { notFound } from "next/navigation";
import BreadcrumbHero from "@/components/ui/BreadcrumbHero";
import { INSIGHT_POSTS } from "@/data/insights";

type InsightDetailProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return INSIGHT_POSTS.map((post) => ({ slug: post.slug }));
}

export default function InsightDetailPage({ params }: InsightDetailProps) {
  const post = INSIGHT_POSTS.find((item) => item.slug === params.slug);
  if (!post) return notFound();

  return (
    <>
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
