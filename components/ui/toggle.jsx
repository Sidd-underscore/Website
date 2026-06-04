"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex cursor-pointer [box-shadow:inset_4px_4px_4px_0_rgba(0,0,0,0.25)] items-center justify-center gap-2 whitespace-nowrap rounded-[2px] border-2 border-black text-sm font-black uppercase tracking-wide transition-[translate,background-color,color] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FFE121] disabled:pointer-events-none disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0",
  {
    variants: {
      variant: {
        default: "bg-white text-black hover:bg-[#22FF00] active:bg-[#FFE121]",
        outline: "text-black hover:bg-neutral-200",
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
