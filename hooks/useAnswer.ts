import { useEffect, useMemo } from "react";
import { STATIONS } from "../constants/stations";
import Random from "../utils/random";
import useSeed from "./useSeed";

const useAnswer = (seed?: number) => {
  const defaultSeed = useSeed();
  const ANSWER = useMemo(() => {
    const s = seed || defaultSeed;
    const rand = new Random(s);
    const randomInt = rand.nextInt(0, STATIONS.length - 1);

    return STATIONS[randomInt];
  }, [defaultSeed, seed]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.info("ANSWER", ANSWER);
    }
  }, [ANSWER]);

  return ANSWER;
};

export default useAnswer;
