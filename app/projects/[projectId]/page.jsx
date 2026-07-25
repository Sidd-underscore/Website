import { Projects } from "@/components/home/projects";
import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { projects } from "@/lib/projects";
import { MoveUpRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import NotFound from "@/app/not-found";
import { Button } from "@/components/ui/button";

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
      <div className="bg-[#FF80F2] px-3 py-2 panel">
        <h1 className="text-5xl font-black uppercase tracking-normal">
          {project.name}
        </h1>

      {project.url && (
        <Link
          className="mt-4 flex w-fit items-center gap-2 no-underline"
          target="_blank"
          passHref
          href={project.url}
        >
          <Button variant="default">
            <span>Go to project</span> <MoveUpRight />
          </Button>
        </Link>
      )}
      </div>

      <div className="panel mt-10 p-6">{project.longDescription}</div>

      <Separator className="mt-10 -mb-10" />
      <Projects  title="Other Projects" />
    </>
  );
}
