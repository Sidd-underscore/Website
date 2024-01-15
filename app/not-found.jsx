import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1 className="text-5xl font-bold">
        <code className="text-6xl">404</code> Not Found
      </h1>
      <p>Could not find the requested page :(</p>

      <div className="flex items-start space-x-2 mt-4">
        <details>
          <summary className="mt-0.5 cursor-pointer w-fit flex items-center border-b border-zinc-400 text-sm transition-all hover:border-zinc-500 dark:border-white/25 dark:text-zinc-300 dark:hover:border-white/50 dark:hover:text-zinc-50">
            Play a game
          </summary>
          <iframe
            src="https://cal.games"
            className="dark:m-2 -ml-2 dark:ml-0 rounded-lg absolute bg-transparent w-68 h-[434px]"
          />
        </details>
        <span>or</span>
        <Link
          className="mt-0.5 w-fit flex items-center border-b border-zinc-400 text-sm transition-all hover:border-zinc-500 dark:border-white/25 dark:text-zinc-300 dark:hover:border-white/50 dark:hover:text-zinc-50"
          href="/"
        >
          Return Home?
        </Link>
      </div>
    </div>
  );
}
