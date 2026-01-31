// components/providers/ThemeProvider.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";
import ThemeWrapper from "@/components/ThemeWrapper";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="portfolio-theme"
    >
      <ThemeWrapper>{children}</ThemeWrapper>
    </NextThemesProvider>
  );
}
