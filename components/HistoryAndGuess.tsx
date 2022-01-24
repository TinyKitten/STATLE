import { useEffect, useState } from "react";
import styled from "styled-components";
import { STATIONS } from "../constants/stations";
import { MAX_CHAR, MAX_ROUND } from "../constants/threshold";
import Guess from "./Guess";

const MOCK_ANSWER = STATIONS[0];

const Container = styled.div`
  margin-top: 32px;
`;

const GuessContainer = styled.div`
  margin: 4px 0;
`;

const HistoryAndGuess = () => {
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [correctSpotsHistories, setCorrectSpotsHistories] = useState<
    boolean[][]
  >([]);
  const [wrongSpotHistories, setWrongSpotHistories] = useState<boolean[][]>([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (
      correctSpotsHistories[currentRound - 2]?.filter((flag) => flag).length ===
      MAX_CHAR
    ) {
      alert("you won");
      setFinished(true);
      return;
    }
    if (currentRound > MAX_ROUND) {
      alert("you lose");
      setFinished(true);
    }
  }, [correctSpotsHistories, currentRound]);

  const handleGuessComplete = (chars: string[]) => {
    setCurrentRound((prev) => prev + 1);
    setCorrectSpotsHistories((prev) => [
      ...prev,
      chars.map((c, i) => MOCK_ANSWER[i] === c),
    ]);
    setWrongSpotHistories((prev) => [
      ...prev,
      chars.map(
        (c, i) => MOCK_ANSWER.indexOf(c) !== -1 && MOCK_ANSWER.indexOf(c) !== i
      ),
    ]);
  };

  return (
    <Container>
      {Array.from({ length: MAX_ROUND }).map((_, index) => (
        <GuessContainer key={index}>
          <Guess
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
