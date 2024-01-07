import { cn } from "@/lib/utils";
import * as NextLink from "next/link";

export function Link({ className, children, href, ...props }) {
  return (
    <NextLink
      className={cn(
        "flex items-center border-b border-zinc-500 text-sm transition-all hover:border-zinc-400 dark:border-white/25 dark:text-zinc-300 dark:hover:border-white/50 dark:hover:text-zinc-50",
        className,
      )}
      href={href}
      {...props}
    >
      {children}
    </NextLink>
  );
}
