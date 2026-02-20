import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Bridge The Gap",
    description:
      "Education support and professional development services across CAPS and IB curricula.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f5f1ed",
    theme_color: "#fa4e1b",
    icons: [
      {
        src: `${SITE_URL}/bridge-the-gap-icon.svg`,
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
