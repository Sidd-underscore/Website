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
  return (
    <>
      {src.light ? (
        <Image
        
          height={1080}
          width={1024}
          alt={alt}
          quality={100}
          placeholder="blur"
          className={cn(
            `${src.dark ? "block dark:hidden" : ""} ${size === "large" ? "h-160" : "h-96"} w-auto max-w-none cursor-zoom-in rounded-lg border-2 border-neutral-200 dark:border-neutral-800`,
            className,
          )}
          src={src.light}
          onClick={() => window.open(src.light.src, "_blank")}
          {...props}
        />
      ) : null}

      {src.dark ? (
        <Image
          height={1080}
          width={1024}
          alt={alt}
          quality={100}
          placeholder="blur"
          className={cn(
            `${src.light ? "hidden dark:block" : ""} ${size === "large" ? "h-160" : "h-96"} w-auto max-w-none cursor-zoom-in rounded-lg border-2 border-neutral-200 dark:border-neutral-800`,
            className,
          )}
          src={src.dark}
          onClick={() => window.open(src.dark.src, "_blank")}
          {...props}
        />
      ) : null}

      {staticImage ? (
        <Image
          height={1080}
          width={1024}
          alt={alt}
          quality={100}
          className={cn(
            `h-96 w-auto max-w-none cursor-zoom-in rounded-lg border-2 border-neutral-200 dark:border-neutral-800`,
            className,
          )}
          src={src}
          onClick={() => window.open(src, "_blank")}
          {...props}
        />
      ) : null}
    </>
  );
}
