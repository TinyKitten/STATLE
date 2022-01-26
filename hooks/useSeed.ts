import { useMemo } from "react";

const useSeed = () => {
  const SEED = useMemo(() => {
    const now = new Date();
    const seed = (
      now.getFullYear() +
      now.getMonth() +
      now.getDate() +
      parseInt(process.env.NEXT_PUBLIC_RANDOM_SEED || "0", 10)
    );
    const date = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
    return { seed, date };
  }, []);

  return SEED;
};

export default useSeed;
