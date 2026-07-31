"use client";

import { cn } from "@/lib/utils";
import NextLink from "next/link";

export function Link({ className, children, href, ...props }) {
  return (
    <NextLink
      className={cn(
        "font-black text-[#FF80F2] underline decoration-[#45e52c] decoration-2 underline-offset-4 transition-all hover:bg-[#45e52c] hover:text-black",
        className,
      )}
      href={href}
      {...props}
    >
      {children}
    </NextLink>
  );
}
