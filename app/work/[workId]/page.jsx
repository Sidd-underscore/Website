import { Separator } from "@/components/ui/separator";
import { work } from "@/lib/work";
import { Work } from "@/components/home/work";
import { CalendarIcon, SewingPinFilledIcon } from "@radix-ui/react-icons";
import NotFound from "@/app/not-found";
import Image from "next/image";

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
    <div className="relative overflow-hidden 2xl:-mx-24 no-max-w">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-5xl font-bold">{workItem.name}</h1>
        <p className="mt-2 md:flex md:items-center text-sm opacity-50 ">
          <span className={`m-0 flex items-center space-x-2`}>
            <SewingPinFilledIcon className="size-4 shrink-0" />
            <span>{workItem.location}</span>
          </span>
          <span className="mx-2 hidden md:block">•</span>
          <span className={`m-0 flex items-center space-x-2`}>
            <CalendarIcon className="size-4 shrink-0" />
            <span>{workItem.dates}</span>
          </span>
        </p>
        <div className="mt-10">{workItem.description}</div>

        <Separator className="mt-10 -mb-10" />
        <Work />

        
      </div>

      {workItem.decorations?.map((imageUrl, index) => {
        const initialPosition = 
          index % 2 === 0 ? { left: -40 } : { right: -40 };
        
        const rotation = ["3deg", "-6deg", "-3deg", "6deg"][index % 4];
        const adjustedPosition = {
          top: index * 20 + 5 + "rem",
          transform: `rotate(${rotation})`,
        };

        return (
          <Image
            key={imageUrl}
            className="absolute hidden w-auto rounded-lg shadow-lg transition-transform duration-200 ease-out select-none 2xl:block"
            style={{ ...initialPosition, ...adjustedPosition }}
            src={imageUrl}
            alt=""
            width={200}
            height={150}
            quality={50}
          />
        );
      })}
      <div className="relative w-screen hidden 2xl:block h-24 bg-linear-to-t from-neutral-50 to-transparent dark:from-neutral-950 dark:to-transparent"/>
    </div>
  );
}
