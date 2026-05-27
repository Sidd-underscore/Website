import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[2px] border-2 border-black text-sm font-black uppercase tracking-wide shadow-[4px_4px_0_#000] transition-[translate,box-shadow,background-color,color] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FFE121] disabled:pointer-events-none disabled:opacity-50 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#000] active:translate-y-0 active:shadow-[2px_2px_0_#000]",
  {
    variants: {
      variant: {
        default:
          "bg-[#22FF00] text-black hover:bg-[#FFE121]",
        destructive:
          "border-black bg-[#FF80F2] text-black hover:bg-[#FFE121]",
        outline:
          "bg-white text-black hover:bg-[#FF80F2]",
        secondary:
          "bg-[#FFE121] text-black hover:bg-[#22FF00]",
        ghost:
          "text-black hover:bg-neutral-200 hover:shadow-[4px_4px_0_#000]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
