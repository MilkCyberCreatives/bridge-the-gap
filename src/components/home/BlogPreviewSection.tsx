"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { INSIGHT_POSTS } from "@/data/insights";
import type { CmsInsight } from "@/lib/cms-types";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const HOME_INSIGHT_LIMIT = 3;

type BlogPreviewSectionProps = {
  posts?: CmsInsight[];
};

export default function BlogPreviewSection({
  posts = INSIGHT_POSTS as unknown as CmsInsight[],
}: BlogPreviewSectionProps) {
  const reduceMotion = useReducedMotion();
  const previewPosts = posts.slice(0, HOME_INSIGHT_LIMIT);

  return (
    <section className="relative w-full py-16 sm:py-20">
      <div className="container-tight">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/55">
            Insights
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Practical education insights
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-black/70">
            Articles for school leaders, parents, and learners focused on execution.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:auto-rows-fr md:grid-cols-3">
          {previewPosts.map((post) => (
            <motion.article
              key={post.slug}
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.68, ease: EASE_OUT }}
              className="h-full"
            >
              <Link
                href={`/insights/${post.slug}`}
                className="water-hover group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white/75 text-left backdrop-blur-xl"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
                <div className="flex h-full flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/55">
                    {post.category}
                  </p>
                  <h3 className="mt-2 text-lg font-extrabold tracking-tight text-black/85">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/70">
                    {post.excerpt}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-extrabold text-black/78">
                    Read article
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/insights"
            className="btn-water inline-flex items-center justify-center rounded-full bg-[rgb(var(--brand))] px-7 py-3 text-sm font-extrabold text-white"
          >
            View all insights
          </Link>
        </div>
      </div>
    </section>
  );
}
