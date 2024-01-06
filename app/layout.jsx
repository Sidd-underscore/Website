import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";
import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {default: "Sidd_", template: "%s / Sidd_"},
  description: "I code, take photos and livestream.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} justify-left flex flex-col mt-12 !pb-0 p-12 2xl:p-24 items-center dark:bg-zinc-950 dark:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          <main className="w-full max-w-5xl">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
