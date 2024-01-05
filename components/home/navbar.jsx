import Image from "next/image";
import { Link } from "@/components/ui/link";

export function NavItem({ item }) {
  return <Link href={item.link}>{item.label}</Link>;
}

export function Navbar() {
  return (
    <div className="fixed left-0 top-0 z-10 w-screen flex items-center justify-center md:top-4 ">
      <nav className="flex items-center justify-between rounded-none md:ml-4 md:w-[calc(100%_-_32px)] max-w-5xl border-b border-zinc-500/25 px-4 py-4 md:py-2 text-xs md:text-sm backdrop-blur-lg transition md:top-4 md:rounded-3xl md:border dark:border-white/10 dark:bg-zinc-900/50">
        <p className="flex items-center space-x-4">
          <NavItem
            item={{
              link: "/",
              label: (
                <Image
                  alt="Sidd's logo"
                  width={24}
                  height={24}
                  src="/images/sidd.png"
                />
              ),
            }}
          />
          <NavItem item={{ link: "/about", label: "About Me" }} />
          <NavItem item={{ link: "/photos", label: "Photography" }} />
        </p>
      </nav>
    </div>
  );
}
