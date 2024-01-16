import { Projects } from "@/components/home/projects";
import { Link } from "@/components/ui/link";
import { projects } from "@/lib/projects";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator"

export async function generateMetadata({ params }, parent) {
  const { projectId } = params;
  const project = projects.find((e) => e.id === projectId);
 
  return {
    title: project.name + " / Projects",
    description: project.description
  }
}

export default function ProjectPage({params}) {
  const { projectId } = params;
  const project = projects.find((e) => e.id === projectId);

  return (
    <>
      <h1 className="text-5xl font-bold">{project.name}</h1>

      <p className="mt-2">{project.description}</p>
      <Link className="mt-2 w-fit space-x-1" target="_blank" href={project.url}>
        <span>Go to project</span> <ArrowTopRightIcon />
      </Link>

      <div className="mt-10">{project.longDescription}</div>

      <Separator className="mt-10 -mb-10" />
      <Projects />
    </>
  );
}
