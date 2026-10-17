import { NextResponse } from "next/server";

import {
  MARKDOWN_MEDIA_TYPE,
  resolveMarkdownRequest,
} from "@/lib/agent-content.mjs";

/**
 * Markdown content negotiation (acceptmarkdown.com).
 *
 * Every page URL answers in two representations: HTML for browsers, Markdown
 * for agents that ask for it with `Accept: text/markdown` or by appending
 * `.md`. The Markdown answer carries `Vary: Accept` so caches keep them apart.
 */
export const config = {
  matcher: [
    // Everything except Next's internals and the Markdown renderer itself.
    "/((?!_next/|md$|md/|api/).*)",
  ],
};

const MARKDOWN_ROUTE = "/md";

const MARKDOWN_HEADERS = {
  "Content-Type": MARKDOWN_MEDIA_TYPE,
  "Content-Disposition": "inline",
  Vary: "Accept",
  "Cache-Control": "public, max-age=0, must-revalidate",
};

export async function proxy(request) {
  const { markdown, path } = resolveMarkdownRequest(
    request.nextUrl.pathname,
    request.headers.get("accept"),
  );

  const readOnly = request.method === "GET" || request.method === "HEAD";

  if (markdown && readOnly) {
    // Rendering happens in `app/md/[[...slug]]/route.js`, which can reach the
    // content modules.
    const target = new URL(
      path === "/" ? MARKDOWN_ROUTE : MARKDOWN_ROUTE + path,
      request.nextUrl.origin,
    );

    // The rendered body is re-served from here so the Markdown answer carries
    // exactly one `Vary` header. Rewriting instead would leave Next's own
    // `Vary: rsc, …` beside ours, and a cache or scanner that reads only the
    // first value would never see `Accept`.
    try {
      const rendered = await fetch(target, {
        headers: { Accept: "text/markdown" },
      });

      if (rendered.ok || rendered.status === 404) {
        return new Response(
          request.method === "HEAD" ? null : await rendered.text(),
          { status: rendered.status, headers: MARKDOWN_HEADERS },
        );
      }
    } catch {
      // Fall through to the rewrite below.
    }

    // Fallback: still Markdown, just with Next's Vary header alongside ours.
    const rewritten = NextResponse.rewrite(target);
    rewritten.headers.set("Vary", "Accept");
    return rewritten;
  }

  // The HTML representation varies on Accept too. Appended rather than set, to
  // keep Next's own Vary values intact; Next overrides it on prerendered
  // routes, which is harmless here because this proxy runs ahead of the cache
  // and a Markdown request never reaches the cached HTML.
  const response = NextResponse.next();
  response.headers.append("Vary", "Accept");
  return response;
}

export default proxy;
