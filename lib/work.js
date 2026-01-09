import { Link } from "@/components/ui/link";

export const work = [
  {
    name: "Research Assistant at Rebound Orthopedics & Neurosurgery",
    id: "rebound-research-assistant",
    location: "Vancouver, WA",
    dates: "July 2025 - Present",
    type: ["research", "coding", "medical"],
    details: [
      "Assisting in the development of software tools to analyze patient data for orthopedic and neurological research.",
      "Utilizing programming skills to streamline data collection and analysis processes.",
    ],
    description: (
      <div className="space-y-4">
        <p>
          As a Research Assistant at Rebound Orthopedics & Neurosurgery, I am
          involved in developing software tools that aid in the analysis of
          patient data for research done in the clinic with the{" "}
          <Link href="https://www.reboundresearchfoundation.org/">
            Rebound Research & Education Foundation
          </Link>
          . My role focuses on using my coding skills to streamline data
          collection and analysis processes, contributing to advancements in
          orthopedic and neurological research.
        </p>
      </div>
    ),
  },
  {
    name: "A/V and Livestreaming",
    id: "av-livestreaming",
    location:
      "St Mary Magdalene Catholic Church (The Madeleine Parish), Portland, OR",
    dates: "2023 - Present",
    type: ["a/v", "livestreaming"],
    details: [
      "Livestream church events to YouTube using OBS & YouTube Studio, as well as PTZ Optics for the cameras",
      "Run A/V equipment & tech when needed at both mass & church events",
    ],
    description: (
      <div className="space-y-4">
        <p>
          I&apos;ve been a part of the A/V team at the Madeleine Parish since
          2023. I&apos;ve worked on a variety of positions, including
          livestreaming church events to YouTube. Through this, I have lots of
          experience using OBS and YouTube Studio, as well as PTZ Optics for the
          cameras. I also run A/V equipment and tech (like mixing live sound)
          when needed at both mass and church events.
        </p>

        <p>Watch our latest video:</p>
        <div className="relative h-0 pb-[56.25%]">
          <iframe
            src="https://www.youtube.com/embed?listType=playlist&list=UU8HgNe4HEmo6LhtVmjUzmww"
            className="absolute top-0 left-0 h-full w-full rounded-lg border-2 border-neutral-200 shadow-lg dark:border-neutral-800"
          />
        </div>
      </div>
    ),
  },
  {
    name: "Technical Theatre",
    id: "tech-theatre",
    location: "Various locations around Portland, OR",
    dates: "2023 - Present",
    type: ["lighting", "sound", "projections", "theatre tech"],
    details: [
      "Spotlight operator of the 76th & 77th annual Lincoln High School Talent Show (2024 & 2025)",
      'Second Sound Engineer for Portland Panto Players\' "Sleeping Beauty" (2024)',
      'Spotlight operator of Broadway Rose Theatre\'s "The Jungle Book" (2024), internship',
      'Set builder & stagehand for Lincoln High School\'s "Clue: On Stage" (2025)',
      'Set designer & builder for Lincoln High School\'s "Fresh Ink" (2025)',
      <span key="projections-2025">
        Set builder & established/ran a projections department for Lincoln High
        School&apos;s &quot;Amélie&quot; (2025).{" "}
        <Link href="/projects/amelie">Learn more</Link>
      </span>,
    ],
    decorations: [
      "/images/work/tech-theatre/amelie.png",
      "/images/work/tech-theatre/clue.png",
      "/images/work/tech-theatre/freshlyinked.png",
      "/images/work/tech-theatre/itw.jpeg",
    ],
    description: (
      <div className="space-y-4">
        <p>
          I&apos;ve been working in technical theatre since 2023 in various
          roles. At my High School, Lincoln High School, I operated spotlights
          for the 76th & 77th annual Talent Show (2024 & 2025) and later learned
          (and started leading!) set building for productions like &quot;Clue:
          On Stage&quot; (2024) (lots of fun stories about building rolling
          rooms, but that&apos;s for another time 😅). I then used those
          building skills to design and build to set for our play festival,
          &quot;Fresh Ink&quot; (2025). For &quot;Amélie&quot; (2025), I not
          only helped build the set but also established and managed the
          projections department. This was the first time my school had ever
          attempted to use projections in a show, so I had to start from scratch
          and learn everything myself.{" "}
          <Link href="/projects/amelie">Learn more!</Link> Beyond school
          productions, I helped Portland Panto Players as the Second Sound
          Engineer for &quot;Sleeping Beauty&quot; (2024), and completed an
          internship at Broadway Rose Theatre as a spotlight operator for
          &quot;The Jungle Book&quot; (2024).
        </p>

        <p>
          I really enjoy working in technical theatre, lighting specifically,
          because the constrained creativity that comes with finding ways to
          convey a story (emotions, conflicts, relationships) through lighting
          is really special. In general, I love theatre and the collaborative
          aspect of working with many departments to bring a performance to
          life. I also really enjoy all the things I have learned, and continue
          to learn, through tech theatre (wiring, optics, power tools,
          carpentry, stress management, patching/routing, problem solving, etc).
        </p>
      </div>
    ),
  },
  {
    name: "Replit Community Ambassador",
    id: "replit-rep",
    location: "Remote (from Portland, OR)",
    dates: "September 1 2022 - December 31 2022",
    type: ["community", "support", "coding"],
    details: [
      "Also known as Replit Reps",
      "Hosted live virtual events for over 200 viewers",
      "Hosted a hackathon and crash courses",
    ],
    description: (
      <div className="space-y-4">
        <p>
          I was part of the first cohort of Replit Reps for its 4-month duration
          in 2022. During that time, I&apos; hosted live virtual events for over
          200 viewers, I hosted a hackathon, and more.
        </p>

        <p>
          This experience was very rewarding. I learned about what it&apos;s
          like to reach out to a fanbase and community, and I learned a lot
          about leadership, teamwork, and communication. It was also a great
          opportunity to connect with other developers and designers, which are
          connections that have helped me grow.
        </p>
      </div>
    ),
  },
];
