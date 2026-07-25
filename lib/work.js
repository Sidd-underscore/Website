import { Link } from "@/components/ui/link";

export const work = [
  {
    name: "Software Engineering Intern",
    id: "swe-paylynxs",
    location: "PayLynxs Inc., Portland, OR",
    dates: "Summer 2026 - Present",
    type: ["engineering", "coding"],
    details: [
      "Developed a critical automated A.R. dunning workflow, collecting thousands of dollars in overdue payments per month.",
      "Engineered an automated workflow for a contract-renewal pricing increase across thousands of client accounts, cutting analyst review time by hours and increasing revenue by hundreds of dollars per month.",
    ],
  },
  {
    name: "Research Assistant",
    id: "rebound-research-assistant",
    location: "Rebound Orthopedics & Neurosurgery, Vancouver, WA",
    dates: "Summer 2025",
    type: ["research", "coding", "medical"],
    details: [
      "Assisting in the development of software tools to analyze patient data for orthopedic and neurological research.",
      "Utilizing programming skills to streamline data collection and analysis processes.",
    ],
    description: (
      <div className="space-y-4">
        <p>
          As a Research Assistant at Rebound Orthopedics & Neurosurgery, I was
          involved in developing software tools that aid in the analysis of
          patient data for research done in the clinic with the{" "}
          <Link href="https://www.reboundresearchfoundation.org/">
            Rebound Research & Education Foundation
          </Link>
          . My role focused on using my coding skills to streamline data
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
            className="absolute top-0 left-0 h-full w-full rounded-lg border-2 border-neutral-200 shadow-lg"
          />
        </div>
      </div>
    ),
  },
  {
    name: "Theatrical Technician",
    id: "tech-theatre",
    location: "Venues around and in Portland, OR",
    dates: "2023 - Present",
    type: ["lighting", "sound", "projections", "theatre tech"],
    details: [{
      title: "Lincoln High School Drama Department",
      items: [
      "Lead electrician & set builder for “Chicago” (2026) and “Hadestown” (2025)",
      <span key="projections-2025">
        Set builder & established/ran a projections department for Lincoln High
        School&apos;s &quot;Amélie&quot; (2025).{" "}
        <Link href="/projects/amelie">Learn more</Link>
      </span>,
      "Set designer & builder for “Fresh Ink” (2025)",
      "Set builder & stagehand for “Clue: On Stage” (2024)",
      "Spotlight operator of the 76th & 77th annual Lincoln High School Talent Show (2024 & 2025)",
      ],
    },
      {
        title: "Internship at Broadway Rose Theatre",
        items: [
          "Electrician, “Hadestown” (2026) & “Newsies” (2026)",
          "Spotlight operator & electrician, “Les Misérables” (2025)",
          "Spotlight operator, “The Jungle Book” (2024)"
        ]
      },
    ],
    description: (
      <div className="space-y-4">
        <p>
          Since 2023, I have been involved in technical theatre in both
          production and leadership roles. Throughout school, community, and
          professional environments, I have gained experience in lighting,
          scenic construction, projections, and sound. Over time, my
          responsibilities have evolved from supporting individual departments
          to helping lead projects and train technicians, all while developing
          new technical capabilities in my own skillset to continue serving all
          types of productions and live events.
        </p>

        <p>
          I have designed and managed projection, lighting & video systems,
          developing workflows for productions that required solutions beyond
          existing infrastructure. These experiences have strengthened my
          ability to learn independently, adapt quickly, and collaborate across
          multiple departments to support a shared creative vision.
        </p>

        <p>
          I enjoy technical theatre because it combines creativity,
          problem-solving, and teamwork. Lighting particularly interests me
          because of its ability to shape emotion, focus attention, and support
          storytelling within the practical constraints of a live production.
          More broadly, I value the collaborative nature of theatre and the
          opportunity to work alongside talented people from many disciplines to
          bring a performance to life.
        </p>

        <p>
          Technical theatre has also provided hands-on experience with a wide
          range of skills, including electrical systems, optics, scenic
          construction, power tools, signal routing, troubleshooting, project
          management, and working effectively under pressure. The constant
          opportunity to learn new technologies and techniques is one of the
          aspects of the field that I find most rewarding.
        </p>
      </div>
    ),
  },
];
