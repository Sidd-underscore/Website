import NotFound from "@/app/not-found";
import { Projects } from "@/components/home/projects";
import { Separator } from "@/components/ui/separator";

export default function ProjectNotFound() {
  return (
    <>
      <NotFound prefix="Project" />
      <Separator className="mt-10 -mb-10" />
      <Projects />
    </>
  );
}
