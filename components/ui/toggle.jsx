"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex cursor-pointer items-center justify-center border-2 border-black text-sm font-black text-black shadow-[3px_3px_0_#000] transition-colors hover:bg-[#22FF00] hover:text-black focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FFE121] disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[#FF80F2] data-[state=on]:text-black",
  {
    variants: {
      variant: {
        default: "bg-white",
        outline:
          "bg-white hover:bg-[#FFE121]",
      },
      size: {
        default: "h-8 px-2",
        sm: "h-8 px-2",
        lg: "h-10 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({ className, variant, size, ...props }) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
