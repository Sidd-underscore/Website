import Image from "next/image";
import Link from "next/link";

export function NavItem({ item }) {
  return <Link href={item.link}>{item.label}</Link>;
}

export function Navbar() {
  return (
    <div className="fixed left-[50%] top-0 z-10 w-full max-w-5xl [transform:translate(-50%,0)] md:top-4 ">
      <nav className="flex items-center justify-between rounded-none border-b border-zinc-500/25 px-4 py-2 font-mono text-sm backdrop-blur-lg transition hover:border-zinc-500/50 md:top-4 md:rounded-3xl md:border dark:border-white/10 dark:bg-zinc-900/50 hover:dark:border-white/20">
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
