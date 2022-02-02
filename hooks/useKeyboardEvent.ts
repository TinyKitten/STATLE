import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { STATIONS } from "../constants/stations";
import { MAX_CHAR } from "../constants/threshold";
import guessAtom from "../state/guess";
import useAnswer from "./useAnswer";
import useSeed from "./useSeed";

const useKeyboardEvent = (shouldAddEventListener?: boolean) => {
  const [{ currentCharacters }, setGuess] = useAtom(guessAtom);

  const { seed } = useSeed();
  const answer = useAnswer(seed);

  const handleGuessComplete = useCallback(
    (chars: string[]) => {
      setGuess((prev) => ({
        ...prev,
        currentRound: prev.currentRound + 1,
        correctSpotsHistories: [
          ...prev.correctSpotsHistories,
          chars.map((c, i) => answer[i] === c),
        ],
        wrongSpotHistories: [
          ...prev.wrongSpotHistories,
          chars.map(
            (c, i) => answer.indexOf(c) !== -1 && answer.indexOf(c) !== i
          ),
        ],
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
        toast("駅名リストにないよ");
        return;
      }
      handleGuessComplete(currentCharacters);
    }
  }, [currentCharacters, handleGuessComplete]);

  const handleKeyValue = useCallback(
    (key: string) => {
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

          if (notEmptyArr.length < MAX_CHAR) {
            setGuess((prev) => ({
              ...prev,
              currentCharacters: [...prev.currentCharacters, key.toUpperCase()],
            }));
          }
        }
      }
    },
    [currentCharacters, handleEnterPress, setGuess]
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

  return {
    handleKeyValue,
  };
};

export default useKeyboardEvent;
