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

export function Photo({ className, photoData }) {
  return (
    <>
      <Dialog key={photoData.name}>
        <DialogTrigger asChild={true}>
          <img
            className={"mx-2 w-full cursor-pointer rounded-lg " + className}
            src={photoData.path}
            alt={photoData.name}
            title={photoData.name}
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{photoData.name}</DialogTitle>
            <DialogDescription>
              <div className="max-h-[50vh] space-y-2 overflow-auto text-left md:flex md:space-x-4 md:space-y-0">
                <div className="md:w-1/2">
                  <div className="my-2 flex w-full items-center justify-center overflow-x-auto py-1 font-mono text-xs md:justify-start">
                    {photoData.tags.map((tag, index) => (
                      <span
                        className="mx-1 rounded-full bg-zinc-50 px-2 py-0.5 transition dark:bg-zinc-700/50"
                        key={tag + index}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="my-4">{photoData.description}</p>

                  <div className="mt-2 flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4" />
                    <p>
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
                    </p>
                  </div>

                  <div className="mt-2 flex items-center space-x-2">
                    <SewingPinFilledIcon className="h-3 w-3" />
                    <p>{photoData.location}</p>
                  </div>

                  <div className="mt-2 flex items-center space-x-2">
                    <CameraIcon className="h-3 w-3" />
                    <p>{photoData.camera}</p>
                  </div>
                </div>

                <div className="md:w-1/2">
                  <img
                    className={"h-auto rounded-lg"}
                    src={photoData.path}
                    alt={photoData.name}
                    title={photoData.name}
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
