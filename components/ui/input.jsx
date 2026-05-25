import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full border-2 border-black bg-white px-3 py-1 text-sm font-bold text-black shadow-[3px_3px_0_#000] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black/50 focus-visible:ring-2 focus-visible:ring-[#FFE121] focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
