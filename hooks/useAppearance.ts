import { useAtom } from "jotai";
import { useEffect } from "react";
import themeAtom from "../state/theme";

type AppearanceMode = "light" | "dark";

const useAppearance = (): {
  appearance: AppearanceMode;
  themeReady: boolean;
  toggleTheme: () => void;
} => {
  const [theme, setTheme] = useAtom(themeAtom);
  const setMode = (mode: AppearanceMode) => {
    typeof window !== "undefined" && window.localStorage.setItem("theme", mode);
    setTheme((prev) => ({
      ...prev,
      appearance: mode,
    }));
  };

  const localTheme =
    typeof window !== "undefined" && window.localStorage.getItem("theme");

  const toggleTheme = () => {
    if (theme.appearance === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  useEffect(() => {
    if (localTheme) {
      setTheme((prev) => ({
        ...prev,
        appearance: localTheme as AppearanceMode,
      }));
    } else if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches &&
      !localTheme
    ) {
      setTheme((prev) => ({ ...prev, appearance: "dark" }));
    }

    setTheme((prev) => ({ ...prev, ready: true }));
  }, [localTheme, setTheme]);

  return {
    appearance: theme.appearance,
    themeReady: theme.ready,
    toggleTheme,
  };
};

export default useAppearance;
