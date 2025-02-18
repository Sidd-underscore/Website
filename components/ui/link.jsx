import NextLink from "next/link";

export function Link({ className, children, href, ...props }) {
  return (
    <NextLink
      className={
        "text-pink-400 transition-all hover:text-pink-500 dark:text-pink-200 dark:hover:text-pink-300 " +
        className
      }
      href={href}
      {...props}
    >
      {children}
    </NextLink>
  );
}
