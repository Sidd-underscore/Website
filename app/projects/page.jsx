import { Projects } from "@/components/home/projects";

const year = new Date().getFullYear();

export const metadata = {
  title: "Projects",
  description: `I have been coding and designing for over ${year - 2019} years. Learn more about my some of the projects I've been working on here!`,
};

export default function ProjectsPage() {
  return (
    <>
      <Projects className="m-0" />
    </>
  );
}
