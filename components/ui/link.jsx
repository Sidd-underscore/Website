import { Link as NextLink } from "next/link";

export function Link({ className, children, ...props }) {
  return (
    <NextLink
      {...props}
      className="absolute bottom-3 left-7 z-10 flex items-center border-b border-transparent text-sm transition-all hover:border-white/50 dark:text-zinc-300 dark:hover:text-zinc-50"
      href="lol"
    >
      {children}
    </NextLink>
  );
}