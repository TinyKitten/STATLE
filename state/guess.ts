import { atomWithStorage } from "jotai/utils";

type AtomValues = {
  currentRound: number;
  correctSpotsHistories: boolean[][];
  wrongSpotHistories: boolean[][];
  lastDate: Date | null;
  nameHistories: string[][];
  currentCharacters: string[];
  finished: boolean;
};

export const GUESS_ATOM_PERSIST_KEY = "guess";

export const INITIAL_GUESS_ATOM_VALUE: AtomValues = {
  currentRound: 1,
  correctSpotsHistories: [],
  wrongSpotHistories: [],
  lastDate: null,
  nameHistories: [],
  currentCharacters: [],
  finished: false,
};

const guessAtom = atomWithStorage<AtomValues>(
  GUESS_ATOM_PERSIST_KEY,
  INITIAL_GUESS_ATOM_VALUE
);

export default guessAtom;
