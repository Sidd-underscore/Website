import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sidd_",
  description: "I code, take photos and livestream.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} justify-left mt-12 flex flex-col items-center p-12 sm:p-24 dark:bg-zinc-950 dark:text-white`}
      >
        <Navbar />
        <main className="w-full max-w-7xl">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
