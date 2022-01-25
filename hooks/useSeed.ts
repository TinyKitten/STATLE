import { useMemo } from "react";

const useSeed = () => {
  const SEED = useMemo(() => {
    const now = new Date();
    return (
      now.getFullYear() +
      now.getMonth() +
      now.getDate() +
      parseInt(process.env.NEXT_PUBLIC_RANDOM_SEED || "0", 10)
    );
  }, []);

  return SEED;
};

export default useSeed;
