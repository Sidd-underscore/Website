import NextLink from "next/link";

export function Link({ className, children, href, ...props }) {
  return (
    <NextLink
      className={
        "flex items-center border-b border-pink-400 text-sm transition-all hover:border-pink-500 dark:border-pink-200 dark:text-pink-200 dark:hover:border-pink-300 dark:hover:text-pink-300 " +
        className
      }
      href={href}
      {...props}
    >
      {children}
    </NextLink>
  );
}
