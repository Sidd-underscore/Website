import { Separator } from "@/components/ui/separator";
import { work } from "@/lib/work";
import { Work } from "@/components/home/work";
import { CalendarClock, Pin } from "lucide-react";
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
      <div className="panel gap-3 bg-[#45e52c] px-3 py-2">
        <h1 className="text-5xl font-black tracking-normal uppercase">
          {workItem.name}
        </h1>
      </div>

      <div className="panel mt-10 flex flex-wrap items-center gap-3 p-6">
        <span className="m-0 flex items-center gap-2 border-l-4 border-[#45e52c] pl-2 text-sm font-bold">
          <Pin className="size-4 shrink-0" />
          <span>{workItem.location}</span>
        </span>
        <span className="m-0 flex items-center gap-2 border-l-4 border-[#FFE121] pl-2 text-sm font-bold">
          <CalendarClock className="size-4 shrink-0" />
          <span>{workItem.dates}</span>
        </span>

        <div className="p-4">
          {typeof workItem.details[0] === "object" ? (
            workItem.details.map((details) => (
              <div key={details.title} className="mb-4">
                <strong>{details.title}</strong>
                <ul className="list-disc text-left">
                  {details.items.map((item) => (
                    <li className="opacity-75" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <ul className="list-disc text-left">
              {workItem.details.map((item) => (
                <li className="opacity-75" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {workItem.description}
      </div>

      <Separator className="mt-10 -mb-10" />

      <Work title="Other Work Experiences" />
    </>
  );
}
