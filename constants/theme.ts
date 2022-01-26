export type AppPalette = {
  primary: string;
  background: string;
  backgroundSub: string;
  text: string;
  textSub: string;
  edge: string;
  error: string;
};

export const lightTheme: AppPalette = {
  primary: "#008ffe",
  background: "#fafafa",
  backgroundSub: "#f5f5f5",
  text: "#333",
  textSub: "#555",
  edge: "#ccc",
  error: "#FF3232",
};

export const darkTheme: AppPalette = {
  primary: "#008ffe",
  background: "#212121",
  backgroundSub: "#303030",
  text: "#fcfcfc",
  textSub: "#aaa",
  edge: "#666",
  error: "#FF3232",
};
