export type AppPalette = {
  primary: string;
  background: string;
  backgroundSub: string;
  text: string;
  invertedText: string;
  textSub: string;
  edge: string;
  error: string;
};

export const lightTheme: AppPalette = {
  primary: "#008ffe",
  background: "#fafafa",
  backgroundSub: "#555",
  text: "#333",
  textSub: "#555",
  invertedText: "#fcfcfc",
  edge: "#ccc",
  error: "#FF3232",
};

export const darkTheme: AppPalette = {
  primary: "#008ffe",
  background: "#000",
  backgroundSub: "#303030",
  text: "#fcfcfc",
  textSub: "#aaa",
  invertedText: "#fcfcfc",
  edge: "#666",
  error: "#FF3232",
};
