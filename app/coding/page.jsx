import { CodingSplash } from "@/components/coding/splash";
import { Achievements } from "@/components/home/achievements";
import { Projects } from "@/components/home/projects";
import { Work } from "@/components/home/work";

const year = new Date().getFullYear();

export const metadata = {
  title: "Coding",
  description: `I have been coding for over ${year - 2019} years. Learn more about my journey here!`,
};

export default function CodingAndDesignPage() {
  return (
    <>
      <div className="relative border p-4 rounded-t-xl w-fit border-b-0 z-10 -mb-[1px] border-neutral-300 bg-white text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100">
        <h1 className="text-5xl font-bold">Coding<span className="font-mono opacity-60">.jsx</span></h1>
      </div>

      <CodingSplash />
      <Projects defaultProjectTypes={["coding"]} />
      <Work defaultWorkTypes={["coding"]} />
      <Achievements defaultAchievementTypes={["coding"]} />
    </>
  );
}
