import { create } from "zustand";

const useThemeState = create<{
  isDark: boolean;
  toggleTheme: () => void;
}>((set) => ({
  isDark: false,
  toggleTheme: () => {
    document.querySelector("html")?.classList.toggle("dark");
    set((state) => ({
      isDark: !state.isDark,
    }));

    if (document.querySelector("html")?.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.removeItem("theme");
    }
  },
}));

export { useThemeState };
