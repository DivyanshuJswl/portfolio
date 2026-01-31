// components/ThemeWrapper.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const currentTheme = theme === "system" ? systemTheme : theme;
    const htmlElement = document.documentElement;

    if (currentTheme === "light") {
      htmlElement.classList.add("light");
      htmlElement.classList.remove("dark");
      htmlElement.style.colorScheme = "light";
    } else {
      htmlElement.classList.add("dark");
      htmlElement.classList.remove("light");
      htmlElement.style.colorScheme = "dark";
    }
  }, [theme, systemTheme, mounted]);

  if (!mounted) return <>{children}</>;

  return <>{children}</>;
}
