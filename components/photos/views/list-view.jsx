"use client";

import Image from "next/image";
import {
  PhotoDialog,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/photos/photo";

export function ListView({ photos }) {
  return (
    <div className="w-full space-y-4">
      {photos?.map((photo, index) => (
        <Dialog key={`${photo.path}-${photo.date}-${index}`}>
          <DialogTrigger asChild>
            <div className="flex cursor-pointer items-center space-x-4 rounded-lg p-4 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900">
              <Image
                height={96}
                width={96}
                src={photo.path}
                alt={photo.name}
                className="h-24 w-24 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-medium">{photo.name}</h3>
                <p className="text-sm text-neutral-500">{photo.description}</p>
                <div className="mt-1 text-xs text-neutral-400">
                  {photo.camera} •{" "}
                  {new Date(photo.date * 1000).toLocaleDateString()}
                </div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="md:max-w-[90vw]!">
            <PhotoDialog photoData={photo} />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
