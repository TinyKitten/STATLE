import { useMemo } from "react";
import * as seedgen from "../wasm/seedgen";

const useSeed = () => {
  const SEED = useMemo(() => {
    const now = new Date();
    const seed = seedgen.generate();
    const date = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
    return { seed, date };
  }, []);

  return SEED;
};

export default useSeed;
