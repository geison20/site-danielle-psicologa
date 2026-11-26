import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: siteConfig.url,
    display: "standalone",
    background_color: "#fffdf7",
    theme_color: "#173c32",
    lang: siteConfig.language,
    icons: [
      {
        src: absoluteUrl("/favicon.ico"),
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
