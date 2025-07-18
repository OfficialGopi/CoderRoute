import { useThemeState } from "@/toolkit/ui-state-handling/ThemeChange";
import { Moon, Sun } from "lucide-react";

const ThemeChangeButton = () => {
  const { isDark, toggleTheme } = useThemeState();

  return (
    <button
      className="hover:scale-90 transition-transform hover:cursor-pointer active:scale-75"
      onClick={toggleTheme}
    >
      {!isDark ? (
        <Sun className="text-yellow-600" />
      ) : (
        <Moon className="text-yellow-600" />
      )}
    </button>
  );
};

export default ThemeChangeButton;
