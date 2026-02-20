import type { MetadataRoute } from "next";
import { INSIGHT_POSTS } from "@/data/insights";
import { SERVICE_AREAS } from "@/data/site";
import { SUBJECTS } from "@/data/subjects";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/programmes"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/subjects"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/request-a-subject"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/insights"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_AREAS.map((service) => ({
    url: absoluteUrl(`/programmes/${service.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const subjectRoutes: MetadataRoute.Sitemap = SUBJECTS.map((subject) => ({
    url: absoluteUrl(`/subjects/${subject.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const insightRoutes: MetadataRoute.Sitemap = INSIGHT_POSTS.map((post) => ({
    url: absoluteUrl(`/insights/${post.slug}`),
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...serviceRoutes, ...subjectRoutes, ...insightRoutes];
}
