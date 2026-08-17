import type { MetadataRoute } from "next";
import { INSIGHT_POSTS } from "@/data/insights";
import { SERVICE_AREAS } from "@/data/site";
import { SUBJECTS } from "@/data/subjects";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contact"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/programmes"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/subjects"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/request-a-subject"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/insights"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_AREAS.map((service) => ({
    url: absoluteUrl(`/programmes/${service.slug}`),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const subjectRoutes: MetadataRoute.Sitemap = SUBJECTS.map((subject) => ({
    url: absoluteUrl(`/subjects/${subject.slug}`),
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
