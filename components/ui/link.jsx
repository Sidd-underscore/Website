"use client";

import { cn } from "@/lib/utils";
import NextLink from "next/link";

export function Link({ className, children, href, ...props }) {
  return (
    <NextLink
      className={cn(
        "text-pink-400 transition-all hover:text-pink-500  ",
        className,
      )}
      href={href}
      {...props}
    >
      {children}
    </NextLink>
  );
}
