import { SITE } from "@/lib/agent-content.mjs";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The Markdown renderer answers at every page's own URL; the internal
        // rewrite target has nothing to index.
        disallow: "/md",
      },
    ],
    sitemap: SITE.url + "/sitemap.xml",
    host: SITE.url,
  };
}
