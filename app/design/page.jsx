import DesignSplash from "@/components/design/splash";
import { Projects } from "@/components/home/projects";

const year = new Date().getFullYear();

export const metadata = {
  title: "Design",
  description: `I have been designing for over ${year - 2019} years. Learn more about my journey here!`,
};

export default function DesignPage() {
  return (
    <>
      <DesignSplash />
      <Projects defaultProjectTypes={["design", "website"]} />
    </>
  );
}
