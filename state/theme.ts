import { atom } from "jotai";

type AtomValues = {
  appearance: "dark" | "light";
  ready: boolean;
};

const themeAtom = atom<AtomValues>({
  appearance: "dark",
  ready: false,
});

export default themeAtom;
