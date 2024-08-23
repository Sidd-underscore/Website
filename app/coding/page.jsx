import { CodingSplash } from "@/components/coding/coding-splash";
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
      <h1 className="text-5xl font-bold">Coding</h1>
      <CodingSplash />
      <Projects />
      <Work defaultWorkTypes={["coding"]} />
      <Achievements defaultAchievementTypes={["coding"]} />
    </>
  );
}
