import DesignSplash from "@/components/design/splash";
import { Achievements } from "@/components/home/achievements";
import { Projects } from "@/components/home/projects";
import { technologyInformation } from "@/lib/projects";

const year = new Date().getFullYear();

export const metadata = {
  title: "Design",
  description: `I have been designing for over ${year - 2019} years. Learn more about my journey here!`,
};

export default function DesignPage() {
  return (
    <>
      <DesignSplash />
      <Projects defaultProjectTypes={["design", "website"]} defaultTechnologies={[technologyInformation.tailwindcss, technologyInformation.nextjs]} />
      <Achievements defaultAchievementTypes={["design"]} />
    </>
  );
}
