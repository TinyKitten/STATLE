import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import guessAtom, { INITIAL_GUESS_ATOM_VALUE } from "../state/guess";
import useSeed from "./useSeed";

dayjs.extend(isToday);

const useInitGuess = () => {
  const [ready, setReady] = useState(false);
  const { seed } = useSeed();
  const [{ lastDate }, setGuess] = useAtom(guessAtom);

  useEffect(() => {
    if (lastDate && !dayjs(lastDate).isToday()) {
      setGuess(INITIAL_GUESS_ATOM_VALUE);
    }
    setReady(true);
  }, [lastDate, seed, setGuess]);

  return ready;
};

export default useInitGuess;
