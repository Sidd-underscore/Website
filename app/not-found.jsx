import { Link } from "next-view-transitions";

export default function NotFound({ prefix }) {
  return (
    <div>
      <h1 className="text-5xl font-bold">
        <code className="text-6xl">404</code> {prefix} Not Found
      </h1>
      <p>Could not find the requested {prefix || "page"} :(</p>

      <div className="mt-4 flex items-start space-x-2">
        <details>
          <summary className="mt-0.5 flex w-fit cursor-pointer items-center border-b border-neutral-400 text-sm transition-all hover:border-neutral-500 dark:border-white/25 dark:text-neutral-300 dark:hover:border-white/50 dark:hover:text-neutral-50">
            Play a game
          </summary>
          <iframe
            src="https://cal.games"
            className="w-68 absolute -ml-2 h-[434px] rounded-lg bg-transparent dark:m-2 dark:ml-0"
          />
        </details>
        <span>or</span>
        <Link
          className="mt-0.5 flex w-fit items-center border-b border-neutral-400 text-sm transition-all hover:border-neutral-500 dark:border-white/25 dark:text-neutral-300 dark:hover:border-white/50 dark:hover:text-neutral-50"
          href="/"
        >
          return home?
        </Link>
      </div>
    </div>
  );
}
