import Image from "next/image";
import Link from "next/link";
import BreadcrumbHero from "@/components/ui/BreadcrumbHero";
import { INSIGHT_POSTS } from "@/data/insights";

export default function InsightsPage() {
  return (
    <>
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
          {INSIGHT_POSTS.map((post) => (
            <article
              key={post.slug}
              className="water-hover overflow-hidden rounded-3xl border border-border bg-white/75 backdrop-blur-xl"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
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
                  className="mt-4 inline-flex text-sm font-semibold text-[rgb(var(--brand))]"
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
