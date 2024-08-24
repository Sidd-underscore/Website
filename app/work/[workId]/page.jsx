import { Separator } from "@/components/ui/separator";
import { work } from "@/lib/work";
import { Work } from "@/components/home/work";
import { CalendarIcon, SewingPinFilledIcon } from "@radix-ui/react-icons";

export async function generateMetadata({ params }) {
  const { workId } = params;
  const workItem = work.find((e) => e.id === workId);

  return {
    title: workItem.name + " / Projects",
    description: workItem.description,
  };
}

export default function CodingProjectPage({ params }) {
  const { workId } = params;
  const workItem = work.find((e) => e.id === workId);

  return (
    <>
      <h1 className="text-5xl font-bold">{workItem.name}</h1>
      <p className="mt-2 md:flex w-fit items-center space-y-2 md:space-y-0 md:space-x-2 text-sm opacity-50">
        <span className={`m-0 flex items-center space-x-2`}>
          <SewingPinFilledIcon className="h-4 w-4 shrink-0" />
          <span>{workItem.location}</span>
        </span>
        <span className="hidden md:block">•</span>
        <span className={`m-0 flex items-center space-x-2`}>
          <CalendarIcon className="h-4 w-4 shrink-0" />
          <span>{workItem.dates}</span>
        </span>
      </p>
      <div className="mt-10">{workItem.description}</div>

      <Separator className="-mb-10 mt-10" />
      <Work />
    </>
  );
}
