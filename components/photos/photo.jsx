import {
  CalendarIcon,
  CameraIcon,
  DownloadIcon,
  InfoCircledIcon,
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

  const [photoHasLoaded, setPhotoHasLoaded] = useState(false);
  const [photoPreviewHasLoaded, setPhotoPreviewHasLoaded] = useState(false);

  return (
    <>
      <Dialog key={photoData.name}>
        <DialogTrigger asChild={true}>
          <div className="relative w-full">
            {!photoHasLoaded && (
              <div
                className={`max-h-full max-w-full animate-pulse rounded-lg bg-neutral-900`}
                style={{
                  width: photoData.staticPhoto.width,
                  aspectRatio:
                    photoData.staticPhoto.width / photoData.staticPhoto.height,
                }}
              />
            )}
            <Image
              quality={50}
              priority={true}
              className={cn(
                "h-full w-full cursor-pointer rounded-lg",
                photoHasLoaded ? "inherit" : "hidden",
                className,
              )}
              src={photoData.staticPhoto}
              onLoad={() => setPhotoHasLoaded(true)}
              alt={photoData.name}
              title={photoData.name}
              width={0}
              height={0}
              placeholder="blur"
              {...props}
            />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2 items-center space-y-2 md:flex md:space-y-0">
              <span className="mr-2">{photoData.name}</span>{" "}
              <div className="flex items-center justify-center md:justify-normal">
                {photoData.tags.map((tag, index) => (
                  <span
                    className="mx-1 text-nowrap rounded-full bg-neutral-100 px-2 py-0.5 font-mono text-xs font-light transition dark:bg-neutral-700/50"
                    key={tag + index}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </DialogTitle>
            <DialogDescription>
              <div className="relative max-w-[28rem] overflow-auto sm:max-w-[32rem] md:max-w-[44rem] lg:max-w-[52rem] xl:max-w-[60rem]">
                <div className="relative flex max-h-full max-w-full items-center justify-center space-y-2 overflow-auto p-1 md:space-y-0">
                  {!photoPreviewHasLoaded && (
                    <div
                      className={`max-h-full w-full animate-pulse rounded-lg bg-neutral-900`}
                      style={{
                        height: photoData.staticPhoto.height / 4,
                        aspectRatio:
                          photoData.staticPhoto.width /
                          photoData.staticPhoto.height,
                      }}
                    />
                  )}

                  <Image
                    className={`${photoPreviewHasLoaded ? "inherit" : "hidden"} h-auto w-auto rounded-lg`}
                    src={photoData.staticPhoto}
                    alt={photoData.name}
                    title={photoData.name}
                    onLoad={() => setPhotoPreviewHasLoaded(true)}
                    width={0}
                    height={0}
                    sizes="100vh"
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
                    <PopoverContent align="end" sideOffset={12} className="max-w-[300px]">
                      <div>{photoData.description}</div>

                      <div className="mt-4 flex items-center space-x-2 text-xs">
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

                      <div className="mt-2 flex items-center space-x-2 text-xs">
                        <SewingPinFilledIcon className="h-3 w-3 shrink-0" />
                        <span>{photoData.location}</span>
                      </div>

                      <div className="mb-4 mt-2 flex items-center space-x-2 text-xs">
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
                        <DownloadIcon className="mr-2 shrink-0" />
                        Download as{" "}
                        <Select
                          defaultValue={downloadFormat}
                          onValueChange={setDownloadFormat}
                        >
                          <SelectTrigger
                            triggerButtonVariant="icon"
                            className="w-fit border-none !pl-2 !pr-0 !text-xs shadow-none"
                          >
                            <SelectValue placeholder="Select an image format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value=".jpg">
                              JPG{" "}
                              <span className="text-xs">(with metadata)</span>
                            </SelectItem>
                            <SelectItem value=".png">PNG</SelectItem>
                          </SelectContent>
                        </Select>
                      </a>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
