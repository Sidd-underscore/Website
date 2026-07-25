"use client";

import { cn } from "@/lib/utils";
import NextLink from "next/link";

export function Link({ className, children, href, ...props }) {
  return (
    <NextLink
      className={cn(
        "font-black text-[#FF80F2] underline decoration-[#22FF00] decoration-2 underline-offset-4 transition-all hover:bg-[#22FF00] focus:bg-[#22FF00] hover:text-black",
        className,
      )}
      href={href}
      {...props}
    >
      {children}
    </NextLink>
  );
}
