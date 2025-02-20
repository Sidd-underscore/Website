import { Separator } from "@/components/ui/separator";
import { work } from "@/lib/work";
import { Work } from "@/components/home/work";
import { CalendarIcon, SewingPinFilledIcon } from "@radix-ui/react-icons";
import NotFound from "@/app/not-found";

export async function generateMetadata(props) {
  const params = await props.params;
  const { workId } = params;
  const workItem = work.find((e) => e.id === workId);

  if (!workItem) {
    return {
      title: "Work not found",
      description: "No work found at this URL.",
    };
  }

  return {
    title: workItem.name + " / Work",
    description: workItem.description,
  };
}

export default async function WorkPage(props) {
  const params = await props.params;
  const { workId } = params;
  const workItem = work.find((e) => e.id === workId);

  if (!workItem) {
    return (
      <>
        <NotFound prefix="Work" />
        <Separator className="mt-10 -mb-10" />
        <Work />
      </>
    );
  }

  return (
    <>
      <h1 className="text-5xl font-bold">{workItem.name}</h1>
      <p className="mt-2 w-fit items-center space-y-2 text-sm opacity-50 md:flex md:space-y-0 md:space-x-2">
        <span className={`m-0 flex items-center space-x-2`}>
          <SewingPinFilledIcon className="size-4 shrink-0" />
          <span>{workItem.location}</span>
        </span>
        <span className="hidden md:block">•</span>
        <span className={`m-0 flex items-center space-x-2`}>
          <CalendarIcon className="size-4 shrink-0" />
          <span>{workItem.dates}</span>
        </span>
      </p>
      <div className="mt-10">{workItem.description}</div>

      <Separator className="mt-10 -mb-10" />
      <Work />
    </>
  );
}
