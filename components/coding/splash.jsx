"use client";

import { useRef, useState } from "react";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";

export function CodingSplash() {
  const year = new Date().getFullYear();
  const yearsOfCoding = year - 2019;
const domain = process.env.NEXT_PUBLIC_DOMAIN || "https://sidd.studio";
  const initialCode = `// Introduction
const codingStart = 2019;
const yearsOfCoding = (new Date().getFullYear()) - codingStart;

const experience = yearsOfCoding + " years"; // ${yearsOfCoding} years

// In the early days...
I learned to code in JavaScript to work with Discord's API and make bots. I used a "freeCodeCamp" article outlining how to use "Discord.js" as my first introduction to code. I had no prior knowledge of VS Code, Node.js, or even a Terminal!

After building a few bots and becoming semi-fluent in JavaScript, I branched into web development — to try and make dashboards and landing pages for the bots I made.

Through this I learned ["HTML", "CSS", "EJS", "Node.js", "Express.js"] 

This phase sparked my love for UI/UX Design, which evolved into working with the stack I use today.

var currentStack = {
  frameworks: ["React", "Next.js"], 
  styling: ["TailwindCSS"], 
  tooling: ["shadcn/ui", "Figma"],
  deployment: ["Vercel"],
  languages: ["JavaScript"],
};

// Real-World Experience
- Gained amazing experience working with Replit as a community ambassador ("Replit Rep") and also by participating in "Replit Bounties" (earned ~$200 with an average rating of 4.8/5)
- Moved to freelance work, building and maintaining projects for freelance clients, such as https://resolvedtools.com
- Participated in competitions such as the Congressional App Challenge, winning the honorable mention award in 2025 for my project Preparedness & Response for Emergency Planning (PREP): ${domain + "/projects/prep"}

// Current Status
These days, I mainly build websites for myself, school, or freelance clients. I also enjoy participating in competitions.
I work remotely from Portland, Oregon, while also being a high school student.`;

  const [raw, setRaw] = useState(initialCode);
  const [isEditing, setIsEditing] = useState(false);
  const codeRef = useRef(null);

  function toHTML(text) {
    // Escape HTML special chars
    const escInput = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // URL regex source
    const urlSource = 'https?:\\/\\/[\\w.-]+(?:\\/[\\w./?&%#=-]*)?';

    // Small building-block regexes
    const stringPattern = /(?:(?:"(?:[^"\\]|\\.)*")|(?:'(?:[^'\\]|\\.)*')|(?:`[\s\S]*?`))/;
    const blockPattern = /\/\*[\s\S]*?\*\//;
    const slinePattern = /\/\/[^\n]*/;
    const listPattern = /^- .*?(?:\n|$)/m;
    const parenPattern = /\([^\n()]*\)/;

    // Master finds high-priority regions (one capturing group per alt)
    const master = new RegExp('(' + stringPattern.source + ')|(' + blockPattern.source + ')|(' + slinePattern.source + ')|(' + listPattern.source + ')|(' + parenPattern.source + ')|(' + urlSource + ')', 'gm');

    // Token regex for gaps
    const tokenSource = [
      '(\\b\\d+(?:\\.\\d+)?\\b)',
      '(\\b(?:const|var|function|return|new|extends|import|break|continue)\\b)',
      '([(){}\\[\\]])',
      '([+\\-*/=<>!&|^%~?:;,])',
      '([a-zA-Z_$][\\w$]*)(?=\\s*:)',
    ].join('|');
    const tokenRegex = new RegExp(tokenSource, 'gm');

    function wrap(content, className) {
      // Emit class-only spans so Tailwind classes control colors.
      return `<span class="${className || ''}">${content}</span>`;
    }

    function anchor(url) {
      // Catppuccin-inspired link colors (light / dark)
      return `<a href="${url}" class="underline text-[#3166d6] dark:text-[#89b4fa]" target="_blank" rel="noopener noreferrer">${url}</a>`;
    }

    function highlightTokens(chunk) {
      // Use a fresh RegExp so global state (lastIndex) can't leak between calls.
      const localToken = new RegExp(tokenSource, 'gm');
      return chunk.replace(localToken, (match, num, kw, br, op, key) => {
        if (num) return wrap(num, 'text-[#b2691e] dark:text-[#f9e2af]');
        if (kw) return wrap(kw, 'text-[#7c5cff] dark:text-[#cba6f7]');
        if (br) return wrap(br, 'text-[#394b59] dark:text-[#94e2d5]');
        if (op) return wrap(op, 'text-[#4b5563] dark:text-[#7f848a]');
        if (key) return wrap(key, 'text-[#b55a1e] dark:text-[#fab387]');
        return match;
      });
    }

    // Process comment-like text (block or single-line): highlight strings and URLs inside
    function processComment(chunk) {
      const sub = new RegExp('(' + stringPattern.source + ')|(' + urlSource + ')', 'gm');
      let out = '';
      let last = 0;
      let m;
      while ((m = sub.exec(chunk)) !== null) {
        const idx = m.index;
        if (idx > last) out += wrap(chunk.slice(last, idx), 'text-[#7c6f64] dark:text-[#6b6f84]');
        if (m[1]) {
          out += wrap(m[1], 'text-[#287373] dark:text-[#a6e3a1]');
        } else if (m[2]) {
          out += anchor(m[2]);
        }
        last = sub.lastIndex;
      }
      if (last < chunk.length) out += wrap(chunk.slice(last), 'text-[#7c6f64] dark:text-[#6b6f84]');
      return out;
    }

    // Process parenthesized text: allow strings and urls inside, then wrap entire paren
    function processParen(chunk) {
      // chunk includes the surrounding parentheses
      const inner = chunk.slice(1, -1);
      const sub = new RegExp('(' + stringPattern.source + ')|(' + urlSource + ')', 'gm');
      let out = '';
      let last = 0;
      let m;
      while ((m = sub.exec(inner)) !== null) {
        const idx = m.index;
        if (idx > last) out += highlightTokens(inner.slice(last, idx));
        if (m[1]) out += wrap(m[1], 'text-[#287373] dark:text-[#a6e3a1]');
        else if (m[2]) out += anchor(m[2]);
        last = sub.lastIndex;
      }
      if (last < inner.length) out += highlightTokens(inner.slice(last));
      return wrap('(' + out + ')', 'text-[#6d6a82] dark:text-[#c3bfe0]');
    }

    // Process list item: highlight strings, parens and urls inside; keep token highlighting for gaps
    function processList(chunk) {
        // Strip the leading dash first before any highlighting
        const stripped = chunk.replace(/^- /, '');
        const sub = new RegExp('(' + stringPattern.source + ')|(' + parenPattern.source + ')|(' + urlSource + ')', 'gm');
        let out = '';
        let last = 0;
        let m;
        while ((m = sub.exec(stripped)) !== null) {
          const idx = m.index;
          if (idx > last) out += highlightTokens(stripped.slice(last, idx));
          if (m[1]) out += wrap(m[1], 'text-[#287373] dark:text-[#a6e3a1]');
          else if (m[2]) out += processParen(m[2]);
          else if (m[3]) out += anchor(m[3]);
          last = sub.lastIndex;
        }
        if (last < stripped.length) out += highlightTokens(stripped.slice(last));

      return `<span class="ml-6 block"><span class="-ml-4 inline-block w-4">•</span>${out}</span>`;
        }

    // Main loop: walk high-priority matches from `master` and highlight gaps with highlightTokens
    let out = '';
    let lastIndex = 0;
    let mm;
    while ((mm = master.exec(escInput)) !== null) {
      const idx = mm.index;
      if (idx > lastIndex) out += highlightTokens(escInput.slice(lastIndex, idx));

      const [full, str, block, sline, list, paren, bareUrl] = mm;

      if (str) out += wrap(str, 'text-[#287373] dark:text-[#a6e3a1]');
      else if (block) out += processComment(block);
      else if (sline) out += processComment(sline);
      else if (list) out += processList(list);
      else if (paren) out += processParen(paren);
      else if (bareUrl) out += anchor(bareUrl);
      else out += full;

      lastIndex = master.lastIndex;
    }

    if (lastIndex < escInput.length) out += highlightTokens(escInput.slice(lastIndex));

    return out;
  }

  return (
    <section
      className={cn(
        "space-y-4 rounded-tr-xl rounded-b-xl border border-neutral-300 bg-white p-6 font-mono text-sm text-neutral-900 shadow-lg dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100",
        isEditing && "border-dashed border-neutral-400 dark:border-neutral-700"
      )}
    >
      {isEditing ? (
        <textarea
          className="h-auto w-full rounded font-mono text-sm"
          style={{ minHeight: codeRef.current?.offsetHeight || "300px" }}
          value={raw}
          onChange={(e) => setRaw(e.currentTarget.value)}
        />
      ) : (
        <pre
          ref={codeRef}
          className="break-before-auto overflow-x-auto whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: toHTML(raw) }}
        />
      )}

      <div className="border-t border-neutral-300 pt-6 dark:border-neutral-600">
        <p>
          Get in touch →{' '}
          <Link href="mailto:hello@sidd.studio" className="underline">
            hello@sidd.studio
          </Link>
          ,{' '}
          <span className="cursor-pointer underline" onClick={() => setIsEditing(!isEditing)}>
            or {!isEditing ? 'code' : 'preview'} this page!
          </span>
        </p>
      </div>
    </section>
  );
}
