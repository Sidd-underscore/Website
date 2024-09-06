import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function AvatarStack({ avatars, className }) {
  return (
    <div className={cn("flex items-center -space-x-3", className)}>
      {avatars.map((avatar, index) => (
        <div key={index} className="relative">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="h-8 w-8 overflow-hidden rounded-full border border-neutral-300 transition bg-neutral-100 hover:border-neutral-400 hover:bg-neutral-200 dark:border-neutral-500 dark:bg-neutral-700 dark:hover:border-neutral-400 dark:hover:bg-neutral-600">
                <Avatar className="my-auto mx-auto w-full h-full flex items-center justify-center">
                  <AvatarImage
                    className="h-6 w-6"
                    src={avatar.src}
                    alt={avatar.title}
                  />
                  <AvatarFallback>
                    {avatar.title.charAt(0) +
                      avatar.title.slice(1).toLowerCase().slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>{avatar.title}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ))}
    </div>
  );
}
