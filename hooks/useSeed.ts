import { useMemo } from "react";
import * as seedgen from "../wasm/seedgen";

const useSeed = () => {
  const SEED = useMemo(() => {
    const rawDate = new Date();
    const seed = seedgen.generate();
    const date = `${rawDate.getFullYear()}/${
      rawDate.getMonth() + 1
    }/${rawDate.getDate()}`;
    return { seed, date, rawDate };
  }, []);

  return SEED;
};

export default useSeed;
