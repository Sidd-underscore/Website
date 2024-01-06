import { Link } from "@/components/ui/link";

export function Footer() {
  return (
    <footer className="text-center p-4">
      <sub>
        Made with Next.js and love by Sidd in Portland, OR.{" "}
        <p>
          <Link
            className="inline-flex dark:text-zinc-50"
            href="/photography/PXL_20230903_140052596.PORTRAIT.jpg"
          >
            Ivy
          </Link>{" "}
          says hi!
        </p>
      </sub>
    </footer>
  );
}
