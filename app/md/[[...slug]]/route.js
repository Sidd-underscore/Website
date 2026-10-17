import { MARKDOWN_MEDIA_TYPE, renderMarkdown } from "@/lib/agent-content.mjs";
import { getAgentData } from "@/lib/agent-data";

/**
 * The Markdown representation of any page.
 *
 * `proxy.js` rewrites here whenever a request prefers `text/markdown` or ends
 * in `.md`, so the Markdown lives at the same URL as the HTML. The requested
 * page travels in the path segments rather than a query string, because a
 * rewrite's query string does not reach the handler. Unknown paths answer 404
 * with a Markdown error body, as agent-friendly 404s require.
 */
export async function GET(_request, context) {
  const { slug } = await context.params;
  const path = "/" + (slug ?? []).join("/");
  const { status, body } = renderMarkdown(path, getAgentData());

  return new Response(body, {
    status,
    headers: {
      "Content-Type": MARKDOWN_MEDIA_TYPE,
      "Content-Disposition": "inline",
      Vary: "Accept, rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
