"use client";

import { cn } from "@/lib/utils";

export function Blob({ index, className, ...props }) {
  if (index === 1) {
    return (
      <svg
        className={cn(
          className,
          "absolute -z-10 h-[30rem] w-[40rem] opacity-25 blur-3xl",
        )}
        viewBox="0 0 480 480"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
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
        {...props}
      >
        <path
          fill="var(--accent-color)"
          d="M400.5,292Q363,344,308,329.5Q253,315,214,334Q175,353,123,327Q71,301,124,259Q177,217,169.5,161Q162,105,214,99Q266,93,329.5,102Q393,111,415.5,175.5Q438,240,400.5,292Z"
        />
      </svg>
    );
  } else if (index === 3) {
    return (
      <svg
        className={cn(
          className,
          "absolute -z-10 h-[40rem] w-[40rem] opacity-25 blur-3xl",
        )}
        viewBox="0 0 480 480"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          fill="var(--accent-color)"
          d="M364,278Q345,316,328,386.5Q311,457,256,408.5Q201,360,129.5,366.5Q58,373,79.5,306.5Q101,240,105.5,193Q110,146,155.5,133Q201,120,254.5,75.5Q308,31,339.5,88Q371,145,377,192.5Q383,240,364,278Z"
        />
      </svg>
    );
  } else if (index === 4) {
    return (
      <svg
        className={cn(
          className,
          "absolute -z-10 h-[40rem] w-[40rem] opacity-25 blur-3xl",
        )}
        viewBox="0 0 480 480"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          fill="var(--accent-color)"
          d="M426,270Q425,300,394,315Q363,330,342.5,341Q322,352,315,400Q308,448,274,447Q240,446,221,401Q202,356,152,393Q102,430,92,392.5Q82,355,65.5,328.5Q49,302,60.5,271Q72,240,56.5,207.5Q41,175,70,156.5Q99,138,112.5,110.5Q126,83,159.5,89Q193,95,216.5,112.5Q240,130,261.5,119Q283,108,320,93.5Q357,79,374.5,104.5Q392,130,376,165.5Q360,201,393.5,220.5Q427,240,426,270Z"
        />
      </svg>
    );
  }

  return;
}
