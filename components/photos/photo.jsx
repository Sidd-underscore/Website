import {
  CalendarIcon,
  CameraIcon,
  DownloadIcon,
  SewingPinFilledIcon,
} from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/responsive-dialog";
import { formatRelative, fromUnixTime, formatDistance, format } from "date-fns";
import { Button } from "../ui/button";
import Image from "next/image";

export function Photo({ className, photoData, ...props }) {
  return (
    <>
      <Dialog key={photoData.name}>
        <DialogTrigger asChild={true}>
          <div className="relative h-full w-full">
            <Image
              priority={true}
              quality={50}
              className={"h-full w-full cursor-pointer rounded-lg " + className}
              src={photoData.staticPhoto}
              alt={photoData.name}
              title={photoData.name}
              width={0}
              height={0}
              sizes="100vw"
              placeholder="blur"
              {...props}
            />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{photoData.name}</DialogTitle>
            <DialogDescription>
              <div className="max-h-[75vh] space-y-2 overflow-auto p-2 text-left md:flex md:max-h-[75vh] md:space-x-4 md:space-y-0">
                <div className="md:w-2/5">
                  <div className="my-2 flex min-w-full items-center justify-center overflow-x-auto py-1 font-mono text-xs md:justify-start">
                    {photoData.tags.map((tag, index) => (
                      <span
                        className="mx-1 text-nowrap rounded-full bg-zinc-100 px-2 py-0.5 transition dark:bg-zinc-700/50"
                        key={tag + index}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="my-4">{photoData.description}</div>

                  <div className="mt-2 flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>
                      {formatRelative(fromUnixTime(photoData.date), Date.now())}{" "}
                      at {format(fromUnixTime(photoData.date), "h:mm a")} (
                      {formatDistance(
                        fromUnixTime(photoData.date),
                        Date.now(),
                        {
                          addSuffix: true,
                        },
                      )}
                      )
                    </span>
                  </div>

                  <div className="mt-2 flex items-center space-x-2">
                    <SewingPinFilledIcon className="h-3 w-3" />
                    <span>{photoData.location}</span>
                  </div>

                  <div className="mt-2 flex items-center space-x-2">
                    <CameraIcon className="h-3 w-3" />
                    <span>{photoData.camera}</span>
                  </div>
                </div>

                <div className="md:w-3/5 overflow-auto">
                  <Image
                    priority={true}
                    className={"w-full rounded-lg " + className}
                    src={photoData.staticPhoto}
                    alt={photoData.name}
                    title={photoData.name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    placeholder="blur"
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <a download={true} href={photoData.path} className="h-full w-full">
              <Button
                variant="secondary"
                size="sm"
                className="flex w-full items-center"
              >
                <DownloadIcon className="mr-2" />
                Download Image
              </Button>
            </a>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
