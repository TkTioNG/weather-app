import { useTheme } from "@/theme-provider";
import { Button } from "./ui/button";
import { useMemo } from "react";
import { SunIcon, MoonIcon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const nextTheme = useMemo(() => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "light"
        : "dark";
    }
    return theme === "light" ? "dark" : "light";
  }, [theme]);

  return (
    <Button
      variant="default"
      size="icon"
      className="rounded-lg p-0 bg-purple-900 dark:bg-violet-950"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Change to ${nextTheme} theme`}
    >
      <SunIcon className="h-5 w-5 text-white rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="h-5 w-5 text-white absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
