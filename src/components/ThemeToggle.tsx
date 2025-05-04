
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="transition-all duration-300 hover:text-primary"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 animate-in fade-in rotate-in" />
      ) : (
        <Sun className="h-5 w-5 animate-in fade-in rotate-in" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
