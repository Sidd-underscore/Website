import { Projects } from "@/components/home/projects";
import { Link } from "@/components/ui/link";
import { projects } from "@/lib/projects";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import NotFound from "@/app/not-found";

export async function generateMetadata(props) {
  const params = await props.params;
  const { projectId } = params;
  const project = projects.find((e) => e.id === projectId);

  if (!project) {
    return {
      title: "Project not found",
      description: "No project found at this URL.",
    };
  }

  return {
    title: project.name + " / Projects",
    description: project.description,
  };
}

export default async function ProjectPage(props) {
  const params = await props.params;
  const { projectId } = params;
  const project = projects.find((e) => e.id === projectId);

  if (!project) {
    return (
      <>
        <NotFound prefix="Project" />
        <Separator className="mt-10 -mb-10" />
        <Projects />
      </>
    );
  }

  return (
    <>
      <h1 className="text-5xl font-bold">{project.name}</h1>

      <Link
        className="mt-2 flex w-fit items-center space-x-2"
        target="_blank"
        href={project.url}
      >
        <span>Go to project</span> <ArrowTopRightIcon />
      </Link>

      <div className="mt-10">{project.longDescription}</div>

      <Separator className="mt-10 -mb-10" />
      <Projects />
    </>
  );
}
