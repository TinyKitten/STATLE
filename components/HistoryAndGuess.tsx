import { useAtom } from "jotai";
import { useEffect } from "react";
import styled from "styled-components";
import { MAX_CHAR, MAX_ROUND } from "../constants/threshold";
import useAnswer from "../hooks/useAnswer";
import useInitGuess from "../hooks/useInitGuess";
import useSeed from "../hooks/useSeed";
import guessAtom from "../state/guess";
import Guess from "./Guess";

const Container = styled.div`
  margin-top: 32px;
`;

const GuessContainer = styled.div`
  margin: 4px 0;
`;

const HistoryAndGuess = () => {
  const seed = useSeed();
  const answer = useAnswer(seed);
  const [
    {
      correctSpotsHistories,
      wrongSpotHistories,
      currentRound,
      lastSeed,
      nameHistories,
    },
    setGuess,
  ] = useAtom(guessAtom);

  const appReady = useInitGuess();

  useEffect(() => {
    if (lastSeed) {
      return;
    }

    if (
      correctSpotsHistories[currentRound - 2]?.filter((flag) => flag).length ===
      MAX_CHAR
    ) {
      alert("you won");
      setGuess((prev) => ({
        ...prev,
        lastSeed: seed,
      }));
      return;
    }
    if (currentRound > MAX_ROUND) {
      alert("you lose");
      setGuess((prev) => ({
        ...prev,
        lastSeed: seed,
      }));
    }
  }, [correctSpotsHistories, currentRound, lastSeed, seed, setGuess]);

  const handleGuessComplete = (chars: string[]) => {
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
    }));
  };

  const finished = lastSeed === seed;

  if (!appReady) {
    return null;
  }

  return (
    <Container>
      {Array.from({ length: MAX_ROUND })
        .map(
          (_, index) => nameHistories[index] || Array.from({ length: MAX_CHAR })
        )
        .map((value, index) => (
          <GuessContainer key={index}>
            <Guess
              value={value}
              focused={currentRound - 1 === index}
              correctFlags={correctSpotsHistories[index]}
              wrongFlags={wrongSpotHistories[index]}
              pastGuess={index < currentRound - 1}
              onGuessComplete={handleGuessComplete}
              disabled={finished || currentRound - 1 < index}
            />
          </GuessContainer>
        ))}
    </Container>
  );
};

export default HistoryAndGuess;
