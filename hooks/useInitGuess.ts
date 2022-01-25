import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import guessAtom, { INITIAL_GUESS_ATOM_VALUE } from "../state/guess";
import useSeed from "./useSeed";

const useInitGuess = () => {
  const [ready, setReady] = useState(false);
  const seed = useSeed();
  const [{ lastSeed }, setGuess] = useAtom(guessAtom);

  useEffect(() => {
    if (lastSeed !== seed) {
      setGuess(INITIAL_GUESS_ATOM_VALUE);
    }
    setReady(true);
  }, [lastSeed, seed, setGuess]);

  return ready;
};

export default useInitGuess;
