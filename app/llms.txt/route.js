import { renderLlmsTxt } from "@/lib/agent-content.mjs";
import { getAgentData } from "@/lib/agent-data";

/**
 * `/llms.txt` — the agent instruction file, including the "when to use this
 * site" guidance. Generated from the same content modules the pages render, so
 * it cannot drift from the site.
 */
export function GET() {
  return new Response(renderLlmsTxt(getAgentData()), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": "inline",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
