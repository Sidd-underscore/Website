import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1 className="text-5xl font-bold">
        <code className="text-6xl">404</code> Not Found
      </h1>
      <p>Could not find the requested page :(</p>
      <Link
        className="mt-4 w-fit flex items-center border-b border-zinc-400 text-sm transition-all hover:border-zinc-500 dark:border-white/25 dark:text-zinc-300 dark:hover:border-white/50 dark:hover:text-zinc-50"
        href="/"
      >
        Return Home?
      </Link>
    </div>
  );
}
