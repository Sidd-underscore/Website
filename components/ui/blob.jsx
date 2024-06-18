"use client"

import { cn } from "@/lib/utils";

export function Blob({ index, className }) {
  if (index === 1) {
    return (
      <svg
        className={cn(
          className,
          "absolute -z-10 h-[30rem] w-[40rem] opacity-25 blur-3xl",
        )}
        viewBox="0 0 480 480"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="var(--accent-color)"
          d="M411,293.5Q368,347,320.5,388.5Q273,430,212.5,411Q152,392,116,345Q80,298,96,245.5Q112,193,129,134.5Q146,76,212.5,48.5Q279,21,299,97.5Q319,174,386.5,207Q454,240,411,293.5Z"
        />
      </svg>
    );
  } else if (index === 2) {
    return (
      <svg
        className={cn(
          className,
          "absolute -z-10 h-[40rem] w-[40rem] opacity-25 blur-3xl",
        )}
        viewBox="0 0 480 480"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="var(--accent-color)"
          d="M400.5,292Q363,344,308,329.5Q253,315,214,334Q175,353,123,327Q71,301,124,259Q177,217,169.5,161Q162,105,214,99Q266,93,329.5,102Q393,111,415.5,175.5Q438,240,400.5,292Z"
        />
      </svg>
    );
  }
}
