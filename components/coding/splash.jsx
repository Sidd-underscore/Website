import { Link } from "../ui/link";

export function CodingSplash() {
  const year = new Date().getFullYear();
  return (
    <div className="mt-4 space-y-2">
      <p>
        I&apos;ve been coding for over {year - 2019} years. I started with
        humble beginnings, learning to code in JavaScript to work with
        Discord&apos;s API and making bots. My first introduction to code was a
        freeCodeCamp article outlining how to use Discord.js, and I had no prior
        knowledge of a VS Code, Node.js or even a Terminal!
      </p>
      <p>
        After making a couple bots and becoming fluent in JavaScript, I moved
        into websites for the bots, like dashboards and landing pages. I learned
        EJS, HTML, and CSS. This is what really started my love for UI/UX
        design, and I&apos;ve followed that love all the way through React,
        Next.js, TailwindCSS, shadcn/ui, Figma, and more.
      </p>
      <p>
        Through this journey, I&apos;ve has the amazing opportunity to work with{" "}
        <Link href="https://replit.com">Replit</Link> as a community ambassador
        (&quot;Replit Rep&quot;). This allowed me to meet many amazing designers
        and developers, ultimately teaching me how to collaborate and work on code with other people remotely. I also worked with many clients through{" "}
        <Link href="https://replit.com/bounties">Replit Bounties</Link>.
      </p>
      <p>
        Today, I mainly design websites for me, school, or
        clients. I work freelance (<Link href="mailto:hello@sidd.studio">contact me!</Link>)
        from my home in Portland, Oregon, while also being a high school
        student. I use Figma to brainstorm ideas, Next.js to build them, and
        Vercel to deploy them.
      </p>
    </div>
  );
}
