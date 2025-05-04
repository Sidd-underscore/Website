"use client";

import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function ThemeSwitcher({ className }) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className={cn(
            "relative -mx-4 -my-2 rounded-none p-6 shadow-none lg:-mx-3 lg:-my-1 lg:rounded-full lg:p-5",
            className,
          )}
        >
          <SunIcon className="absolute h-5 w-5 scale-100 rotate-0 transition-all duration-200 dark:scale-0 dark:-rotate-90" />
          <MoonIcon className="absolute h-5 w-5 scale-0 rotate-90 transition-all duration-200 dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={16}>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <span className="flex items-center gap-2">
            <SunIcon /> Light
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <span className="flex items-center gap-2">
            <MoonIcon /> Dark
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <span className="flex items-center gap-2"><DesktopIcon /> System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
