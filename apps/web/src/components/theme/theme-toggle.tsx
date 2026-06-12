"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme, type Theme } from "./theme-provider";
import { cn } from "@/lib/cn";

const THEME_ORDER: Theme[] = ["light", "dark", "system"];

const THEME_LABELS: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === "light") return <Sun className="h-4 w-4" />;
  if (theme === "system") return <Monitor className="h-4 w-4" />;
  return <Moon className="h-4 w-4" />;
}

export function ThemeToggle({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  function cycleTheme() {
    const index = THEME_ORDER.indexOf(theme);
    const next = THEME_ORDER[(index + 1) % THEME_ORDER.length];
    setTheme(next);
  }

  const label =
    theme === "system"
      ? `System (${resolvedTheme === "dark" ? "Dark" : "Light"})`
      : THEME_LABELS[theme];

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
        compact && "justify-center px-2",
        className,
      )}
      aria-label={`Theme: ${label}. Click to change.`}
      title={label}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ThemeIcon theme={theme} />
      </motion.span>
      {!compact && <span>{label}</span>}
    </button>
  );
}
