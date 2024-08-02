"use client";

import { SearchProvider } from "@/components/photos/search-context";

export default function PhotosLayout({ children }) {
  return (
    <>
      <SearchProvider>{children}</SearchProvider>
    </>
  );
}
