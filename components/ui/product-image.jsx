"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductImage({
  src,
  staticImage = false,
  alt = "",
  className,
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
            `${src.dark ? "block dark:hidden" : ""} h-96 w-auto max-w-none rounded-lg border-2 border-neutral-200 dark:border-neutral-800`,
            className,
          )}
          src={src.light}
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
            `${src.light ? "hidden dark:block" : ""} h-96 w-auto max-w-none rounded-lg border-2 border-neutral-200 dark:border-neutral-800`,
            className,
          )}
          src={src.dark}
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
            `h-96 w-auto max-w-none rounded-lg border-2 border-neutral-200 dark:border-neutral-800`,
            className,
          )}
          src={src}
          placeholder="blur"
          {...props}
        />
      ) : null}
    </>
  );
}
