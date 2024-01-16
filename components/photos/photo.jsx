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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/responsive-dialog";
import { formatRelative, fromUnixTime, formatDistance, format } from "date-fns";
import { buttonVariants } from "../ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Photo({ className, photoData, ...props }) {
  const [downloadFormat, setDownloadFormat] = useState(".jpg");
  return (
    <>
      <Dialog key={photoData.name}>
        <DialogTrigger asChild={true}>
          <div className="relative w-full">
            <Image
              priority={true}
              quality={50}
              className={cn(
                "h-full w-full cursor-pointer rounded-lg",
                className,
              )}
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
              <div className="max-h-[75vh] space-y-2 overflow-auto text-left md:flex md:max-h-[75vh] md:space-x-4 md:space-y-0 lg:max-h-[85vh] xl:max-h-[90vh]">
                <div className="flex flex-col justify-between md:w-5/12">
                  <div>
                    <div className="my-2 flex min-w-full items-center justify-center overflow-x-auto py-1 font-mono text-xs sm:justify-start">
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
                        {formatRelative(
                          fromUnixTime(photoData.date),
                          Date.now(),
                        )}{" "}
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

                  <a
                    download={true}
                    href={photoData.path.replace(".png", downloadFormat)}
                    className={buttonVariants({
                      variant: "secondary",
                      className: "mt-4 flex w-full items-center rounded-lg",
                    })}
                  >
                    <DownloadIcon className="mr-2" />
                    Download image as{" "}
                    <Select defaultValue={downloadFormat} onValueChange={setDownloadFormat}>
                      <SelectTrigger triggerButtonVariant="icon" className="w-fit space-x-2">
                        <SelectValue placeholder="Select an image format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=".jpg">JPG</SelectItem>
                        <SelectItem value=".png">PNG</SelectItem>
                      </SelectContent>
                    </Select>
                  </a>
                </div>

                <div className="overflow-auto p-0.5 md:w-7/12">
                  <Image
                    className={"max-w- ml-auto w-full rounded-lg"}
                    src={photoData.staticPhoto}
                    alt={photoData.name}
                    title={photoData.name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    placeholder="blur"
                    quality={100}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
