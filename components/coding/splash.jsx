"use client";

import { useRef, useState } from "react";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";

export function CodingSplash() {
  const year = new Date().getFullYear();
  const yearsOfCoding = year - 2019;

  const initialCode = `// Introduction
const codingStart = 2019;
const experience = ${yearsOfCoding} + " years";

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
- Gained amazing experience working with Replit as a community ambassador ("Replit Rep").
- Worked with the community and developers by participating in "Replit Bounties" (eared ~$200 with an average rating of 4.8/5)

// Current Status
These days, I mainly build websites for myself, school, or freelance clients.
I work remotely from Portland, Oregon, while also being a high school student.`

  const [raw, setRaw] = useState(initialCode);
  const [isEditing, setIsEditing] = useState(false);
  const codeRef = useRef(null);

  function toHTML(text) {
    // 1) escape raw <>&
    const esc = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // 2) one‑regex to find *only* the code tokens we care about
    const tokenRegex = new RegExp(
      [
        `(\\/\\/[^\\n]*)`, // 1: //… comment
        `|(\\/\\*[\\s\\S]*?\\*\\/)`, // 2: /*…*/ comment
        `|(".*?"|'.*?'|\`[\\s\\S]*?\`)`, // 3: string literal
        `|(?<![\\w-])(\\d+)(?![\\w-])`, // 4: standalone number
        `|^(- .*)`, // 5: list dash
        `|\\b(const|let|var|function|return|new|extends|import|from|if|else|for|while|break|continue)\\b`, // 6: keyword
        `|([(){}\\[\\]])`, // 7: brackets and parentheses
        `|([+\\-*/=<>!&|^%~?:;,])`, // 8: operators
        `|(?<=\\{\\s*|,\\s*)(\\w+)(?=:)`, // 9: object key
        `|(?<=\\b(?:const|let|var)\\s+)([a-zA-Z_$][\\w$]*)`, // 10: declared variable
      ].join(""),
      "gm",
    );

    return esc.replace(
      tokenRegex,
      (match, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10) => {
        if (c1)
          return `<span class="text-neutral-500 dark:text-neutral-500">${c1}</span>`; // comment
        if (c2)
          return `<span class="text-neutral-500 dark:text-neutral-500">${c2}</span>`; // block comment
        if (c3)
          return `<span class="text-green-600 dark:text-green-300">${c3}</span>`; // string
        if (c4)
          return `<span class="text-yellow-500 dark:text-yellow-300">${c4}</span>`; // number
        if (c5)
          return `<span class="text-pink-400 dark:text-pink-300">${c5}</span>`; // list dash
        if (c6)
          return `<span class="text-blue-400 dark:text-blue-300">${c6}</span>`; // keyword
        if (c7)
          return `<span class="text-neutral-700 dark:text-neutral-300">${c7}</span>`; // brackets
        if (c8)
          return `<span class="text-neutral-600 dark:text-neutral-400">${c8}</span>`; // operators
        if (c9)
          return `<span class="text-orange-400 dark:text-orange-200">${c9}</span>`; // object keys
        if (c10)
          return `<span class="text-pink-400 dark:text-pink-300">${c10}</span>`; // variable

        return match;
      },
    );
  }

  return (
    <section
      className={cn(
        "space-y-4 rounded-b-xl rounded-tr-xl border border-neutral-300 bg-white p-6 font-mono text-sm text-neutral-900 shadow-lg dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100",
        isEditing &&
          "border-dashed border-neutral-400 dark:border-neutral-700",
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
          Get in touch →{" "}
          <Link href="mailto:hello@sidd.studio" className="underline">
            hello@sidd.studio
          </Link>
          ,{" "}
          <span
            className="cursor-pointer underline"
            onClick={() => setIsEditing(!isEditing)}
          >
            or {!isEditing ? "code" : "preview"} this page!
          </span>
        </p>
      </div>
    </section>
  );
}
