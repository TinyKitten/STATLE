import { useMemo } from "react";
import { STATIONS } from "../constants/stations";
import Random from "../utils/random";

const useAnswer = (seed: number) => {
  const ANSWER = useMemo(() => {
    const rand = new Random(seed);
    const randomInt = rand.nextInt(0, STATIONS.length - 1);

    return STATIONS[randomInt];
  }, [seed]);

  if (process.env.NODE_ENV === "development") {
    console.info("ANSWER", ANSWER);
  }

  return ANSWER;
};

export default useAnswer;
