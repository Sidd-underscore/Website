import { CodingSplash } from "@/components/coding/splash";
import { Achievements } from "@/components/home/achievements";
import { Projects } from "@/components/home/projects";
import { Work } from "@/components/home/work";
import { Icon } from "@/components/ui/icon";
import { technologyInformation } from "@/lib/projects";

const year = new Date().getFullYear();

export const metadata = {
  title: "Coding",
  description: `I have been coding for over ${year - 2019} years. Learn more about my journey here!`,
};

export default function CodingAndDesignPage() {
  return (
    <>
      <div className="relative z-10 -mb-px flex w-fit items-center gap-3 border-2 border-b-0 border-black bg-[#45e52c] p-4 text-black shadow-[5px_0_0_#000]">
        <Icon name="StarShadow" className="size-8" />
        <h1 className="text-5xl font-black tracking-normal uppercase">
          Coding<span className="font-mono opacity-60">.jsx</span>
        </h1>
      </div>

      <CodingSplash />
      <Projects
        defaultProjectTypes={["coding"]}
        defaultTechnologies={[
          technologyInformation.nextjs,
          technologyInformation.tailwindcss,
          technologyInformation.react,
          technologyInformation.js,
          technologyInformation.html,
        ]}
      />
      <Work defaultWorkTypes={["coding"]} />
      <Achievements defaultAchievementTypes={["coding"]} />
    </>
  );
}
