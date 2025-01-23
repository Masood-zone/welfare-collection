import { Laptop, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ui/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-8 w-8 px-0"
    >
      <Sun
        className={cn(
          "h-4 w-4 rotate-0 scale-100 transition-all",
          theme !== "light" && "scale-0"
        )}
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 rotate-90 scale-0 transition-all",
          theme === "dark" && "rotate-0 scale-100"
        )}
      />
      <Laptop
        className={cn(
          "absolute h-4 w-4 rotate-90 scale-0 transition-all",
          theme === "system" && "rotate-0 scale-100"
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
