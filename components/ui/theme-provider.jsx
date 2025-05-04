"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect } from "react";

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      
      {...props}
    >
      <ThemeMetaUpdater />
      {children}
    </NextThemesProvider>
  );
}

export function ThemeMetaUpdater() {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme) {
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", theme === "dark" ? "#141414" : "#fce7f3");
    }
  }, [theme]);

  return null;
}
