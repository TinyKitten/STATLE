import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { STATIONS } from "../constants/stations";
import { MAX_CHAR } from "../constants/threshold";
import guessAtom from "../state/guess";
import useAnswer from "./useAnswer";
import useSeed from "./useSeed";

const useKeyboardEvent = (shouldAddEventListener?: boolean) => {
  const [{ currentCharacters, finished }, setGuess] = useAtom(guessAtom);

  const { seed } = useSeed();
  const answer = useAnswer(seed);

  const [toastOpened, setToastOpened] = useState(false);

  const handleGuessComplete = useCallback(
    (chars: string[]) => {
      const correctSpots = chars.map((c, i) => answer[i] === c);

      const wrongSpots = chars.reduce<boolean[]>((acc, cur, idx, arr) => {
        if (
          arr.filter((char) => char === cur).length >= 1 &&
          answer.split("").indexOf(cur) !== -1 &&
          answer.indexOf(cur) !== idx
        ) {
          const maxCount = arr.filter(
            (c, i) => c === cur && answer[i] !== cur
          ).length;
          const correctSpotsCount = correctSpots.filter((flag) => flag).length;
          const matchedIndex = arr.findIndex((c) => c === cur);
          acc[idx] = matchedIndex === idx && maxCount !== correctSpotsCount;
          return acc;
        }
        return acc;
      }, Array.from<boolean>({ length: 5 }).fill(false));

      setGuess((prev) => ({
        ...prev,
        currentRound: prev.currentRound + 1,
        correctSpotsHistories: [...prev.correctSpotsHistories, correctSpots],
        wrongSpotHistories: [...prev.wrongSpotHistories, wrongSpots],
        nameHistories: [...prev.nameHistories, chars],
        currentCharacters: [],
      }));
    },
    [answer, setGuess]
  );

  const handleEnterPress = useCallback(() => {
    const joined = currentCharacters.join("");
    if (joined.length === MAX_CHAR) {
      if (STATIONS.findIndex((s) => s === joined) === -1) {
        if (!toastOpened) {
          toast("駅名リストにないよ", {
            onOpen: () => setToastOpened(true),
            onClose: () => setToastOpened(false),
          });
        }
        return;
      }
      handleGuessComplete(currentCharacters);
    }
  }, [currentCharacters, handleGuessComplete, toastOpened]);

  const handleKeyValue = useCallback(
    (key: string) => {
      if (finished) {
        return;
      }

      switch (key) {
        case "Enter":
        case "ENTER": {
          if (currentCharacters.join("").length === MAX_CHAR) {
            handleEnterPress();
          }
          break;
        }
        case "Backspace":
        case "⌫": {
          setGuess((prev) => ({
            ...prev,
            currentCharacters: prev.currentCharacters.slice(0, -1),
          }));
          break;
        }
        default: {
          if (key.length !== 1) {
            break;
          }

          const notEmptyArr = currentCharacters.filter((char) => char !== "");

          if (!/[a-zA-Z]/.test(key)) {
            return;
          }
          if (notEmptyArr.length < MAX_CHAR) {
            setGuess((prev) => ({
              ...prev,
              currentCharacters: [...prev.currentCharacters, key.toUpperCase()],
            }));
          }
        }
      }
    },
    [currentCharacters, finished, handleEnterPress, setGuess]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      handleKeyValue(e.key);
    },
    [handleKeyValue]
  );

  useEffect(() => {
    if (document && shouldAddEventListener) {
      document.addEventListener("keyup", handleKeyUp);
      return () => {
        document.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, [handleKeyUp, shouldAddEventListener]);

  useEffect(() => {
    if (finished) {
      document.removeEventListener("keyup", handleKeyUp);
    }
  }, [finished, handleKeyUp]);

  return {
    handleKeyValue,
  };
};

export default useKeyboardEvent;
