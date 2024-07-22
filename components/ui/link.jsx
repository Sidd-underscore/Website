import { Link as NextLink } from "next-view-transitions";

export function Link({ className, children, href, ...props }) {
  return (
    <NextLink
      className={
        "flex items-center text-sm text-pink-400 transition-all hover:text-pink-500 dark:text-pink-200 dark:hover:text-pink-300 " +
        className
      }
      href={href}
      {...props}
    >
      {children}
    </NextLink>
  );
}
