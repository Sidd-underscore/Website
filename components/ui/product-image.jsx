"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductImage({
  src,
  staticImage = false,
  alt = "",
  className,
  size,
  ...props
}) {
  if (staticImage) {
    return (
      <Image
        height={1080}
        width={1024}
        alt={alt}
        quality={100}
        className={cn(
          `h-96 w-auto max-w-none cursor-zoom-in rounded-lg border-2 border-neutral-200 `,
          className,
        )}
        src={src}
        onClick={() => window.open(src, "_blank")}
        {...props}
      />
    );
  }

  return (
    <Image
      height={1080}
      width={1024}
      alt={alt}
      quality={100}
      placeholder="blur"
      className={cn(
        `${src.dark ? "block " : ""} ${size === "large" ? "h-160" : "h-96"} w-auto max-w-none cursor-zoom-in rounded-lg border-2 border-neutral-200 `,
        className,
      )}
      src={src}
      onClick={() => window.open(src.src, "_blank")}
      {...props}
    />
  );
}
