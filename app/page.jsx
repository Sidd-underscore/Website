import { Navbar } from "@/components/home/navbar";
import { Projects } from "@/components/home/projects";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mt-12 flex flex-col items-center p-12 md:p-24">
      <Navbar />

      <div className="relative w-full text-left">
        <p>Hi, I&apos;m</p>
        <h1 className="text-7xl font-bold">Sidd_!</h1>
        <sub>(it&apos;s short for Siddharth)</sub>

        <p className="flex items-center mt-12">          
          I code, take photos and livestream.{" "}
          <strong className="ml-2 group cursor-pointer">
            <Link href="/about" className="flex items-center">
              More{" "}
              <ArrowRight className="ml-1 h-4 w-4 transition-all group-hover:ml-2" />
            </Link>
          </strong>
        </p>
      </div>

      <Projects />
    </main>
  );
}
