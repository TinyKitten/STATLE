import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { MAX_CHAR, MAX_ROUND } from "../constants/threshold";
import useAnswer from "../hooks/useAnswer";
import useInitGuess from "../hooks/useInitGuess";
import useKeyboardEvent from "../hooks/useKeyboardEvent";
import useSeed from "../hooks/useSeed";
import useShare from "../hooks/useShare";
import guessAtom from "../state/guess";
import Guess from "./Guess";
import Keyboard from "./Keyboard";
import LoseModal from "./LoseModal";
import WonModal from "./WonModal";

const Container = styled.div`
  margin-top: 32px;
`;

const GuessContainer = styled.div`
  margin: 4px 0;
`;

const Divider = styled.div`
  height: 24px;
`;

const HistoryAndGuess = () => {
  const [wonModalOpen, setWonModalOpen] = useState(false);
  const [loseModalOpen, setLoseModalOpen] = useState(false);

  const { seed, date } = useSeed();
  const handleShare = useShare(date);
  const answer = useAnswer(seed);
  const { handleKeyValue } = useKeyboardEvent();

  const [
    {
      correctSpotsHistories,
      wrongSpotHistories,
      currentRound,
      lastSeed,
      nameHistories,
      currentCharacters,
    },
    setGuess,
  ] = useAtom(guessAtom);

  const appReady = useInitGuess();

  useEffect(() => {
    if (lastSeed && lastSeed !== seed) {
      return;
    }

    if (
      correctSpotsHistories[currentRound - 2]?.filter((flag) => flag).length ===
      MAX_CHAR
    ) {
      setWonModalOpen(true);
      setGuess((prev) => ({
        ...prev,
        lastSeed: seed,
        finished: true,
      }));
      return;
    }
    if (currentRound > MAX_ROUND) {
      setLoseModalOpen(true);
      setGuess((prev) => ({
        ...prev,
        lastSeed: seed,
        finished: true,
      }));
    }
  }, [answer, correctSpotsHistories, currentRound, lastSeed, seed, setGuess]);

  const handleWonModalClose = () => setWonModalOpen(false);
  const handleLoseModalClose = () => setLoseModalOpen(false);

  const correctPositionChars = useMemo(
    () =>
      nameHistories
        .flatMap((arr) =>
          arr.filter((char, idx) => answer.lastIndexOf(char) === idx)
        )
        .filter((char, idx, self) => self.indexOf(char) === idx),
    [answer, nameHistories]
  );
  const wrongPositionChars = useMemo(
    () =>
      nameHistories.flatMap((arr) =>
        arr
          .filter((char, idx) => answer.lastIndexOf(char) !== idx)
          .filter((char) => answer.includes(char))
      ),
    [answer, nameHistories]
  );
  const notMatchedChars = useMemo(
    () =>
      nameHistories.flatMap((arr) =>
        arr.filter((char) => answer.lastIndexOf(char) === -1)
      ),
    [answer, nameHistories]
  );

  if (!appReady) {
    return null;
  }

  const filledCurrentCharacters = [
    ...currentCharacters,
    ...Array.from<string>({ length: MAX_CHAR - currentCharacters.length }).fill(
      ""
    ),
  ];

  return (
    <Container>
      {Array.from({ length: MAX_ROUND })
        .map(
          (_, index) =>
            nameHistories[index] || Array.from({ length: MAX_CHAR }).fill("")
        )
        .map((value, index) => (
          <GuessContainer key={index}>
            <Guess
              value={
                currentRound - 1 !== index ? value : filledCurrentCharacters
              }
              correctFlags={correctSpotsHistories[index]}
              wrongFlags={wrongSpotHistories[index]}
              pastGuess={index < currentRound - 1}
            />
          </GuessContainer>
        ))}
      <Divider />
      <Keyboard
        correctChars={correctPositionChars}
        wrongChars={wrongPositionChars}
        notMatchedChars={notMatchedChars}
        onClick={handleKeyValue}
      />
      <WonModal
        isOpen={wonModalOpen}
        onRequestClose={handleWonModalClose}
        onShareClick={handleShare}
      />
      <LoseModal
        isOpen={loseModalOpen}
        onRequestClose={handleLoseModalClose}
        onShareClick={handleShare}
      />
    </Container>
  );
};

export default HistoryAndGuess;
