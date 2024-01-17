import {
  CalendarIcon,
  CameraIcon,
  DownloadIcon,
  InfoCircledIcon,
  ListBulletIcon,
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
import { Button, buttonVariants } from "../ui/button";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
            <DialogTitle className="flex items-center">
              <span className="mr-2">{photoData.name}</span>{" "}
              {photoData.tags.map((tag, index) => (
                <span
                  className="mx-1 text-nowrap font-light rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-xs transition dark:bg-zinc-700/50"
                  key={tag + index}
                >
                  {tag}
                </span>
              ))}
            </DialogTitle>
            <DialogDescription>
              <div className="relative -m-1 max-h-[75vh] space-y-2 overflow-auto p-1 md:max-h-[75vh] md:space-x-4 md:space-y-0 lg:max-h-[85vh] xl:max-h-[90vh]">
                <Image
                  className={"ml-auto w-full rounded-lg"}
                  src={photoData.staticPhoto}
                  alt={photoData.name}
                  title={photoData.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  placeholder="blur"
                  quality={100}
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="secondary"
                      className="absolute right-4 top-4 aspect-square h-auto w-auto rounded-full p-2 backdrop-blur-sm"
                      size="icon"
                    >
                      <InfoCircledIcon className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="max-w-[300px]">
                    <div>{photoData.description}</div>

                    <div className="mt-4 flex items-start space-x-2 text-xs">
                      <CalendarIcon className="h-4 w-4 shrink-0" />
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

                    <div className="mt-2 flex items-start space-x-2 text-xs">
                      <SewingPinFilledIcon className="h-3 w-3 shrink-0" />
                      <span>{photoData.location}</span>
                    </div>

                    <div className="mt-2 mb-4 flex items-start space-x-2 text-xs">
                      <CameraIcon className="h-3 w-3 shrink-0" />
                      <span>{photoData.camera}</span>
                    </div>

                    <a
                      download={true}
                      href={photoData.path.replace(".png", downloadFormat)}
                      className={buttonVariants({
                        variant: "outline",
                        size: "md",
                        className:
                          "mt-2 flex w-full items-center rounded-lg text-sm",
                      })}
                    >
                      <DownloadIcon className="mr-2" />
                      Download image as{" "}
                      <Select
                        defaultValue={downloadFormat}
                        onValueChange={setDownloadFormat}
                      >
                        <SelectTrigger
                          triggerButtonVariant="icon"
                          className="w-fit space-x-2 border-none !text-xs shadow-none"
                        >
                          <SelectValue placeholder="Select an image format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value=".jpg">JPG</SelectItem>
                          <SelectItem value=".png">PNG</SelectItem>
                        </SelectContent>
                      </Select>
                    </a>
                  </PopoverContent>
                </Popover>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
