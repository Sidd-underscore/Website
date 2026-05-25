import { Projects } from "@/components/home/projects";
import { Icon } from "@/components/ui/icon";
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
      <div className="flex w-fit items-center gap-3 border-2 border-black bg-[#FF80F2] px-3 py-2 text-black shadow-[5px_5px_0_#000]">
        <Icon name="CircleStarFill" className="size-8" />
        <h1 className="text-5xl font-black uppercase tracking-normal">
          {project.name}
        </h1>
      </div>

      {project.url && (
        <Link
          className="mt-4 flex w-fit items-center gap-2 border-2 border-black bg-[#22FF00] px-3 py-2 text-black no-underline shadow-[4px_4px_0_#000]"
          target="_blank"
          href={project.url}
        >
          <span>Go to project</span> <ArrowTopRightIcon />
        </Link>
      )}

      <div className="y2k-panel mt-10 p-6 font-bold">{project.longDescription}</div>

      <Separator className="mt-10 -mb-10" />
      <Projects />
    </>
  );
}
