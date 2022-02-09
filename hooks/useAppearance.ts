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
    setTheme((prev) => ({
      ...prev,
      appearance: mode,
    }));
  };

  const toggleTheme = () => {
    if (theme.appearance === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme((prev) => ({ ...prev, appearance: "dark" }));
    } else {
      setTheme((prev) => ({ ...prev, appearance: "light" }));
    }

    setTheme((prev) => ({ ...prev, ready: true }));
  }, [setTheme]);

  return {
    appearance: theme.appearance,
    themeReady: theme.ready,
    toggleTheme,
  };
};

export default useAppearance;
