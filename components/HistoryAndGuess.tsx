import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { CORRECT_EMOJI, OTHER_EMOJI, WRONG_EMOJI } from "../constants/share";
import { MAX_CHAR, MAX_ROUND } from "../constants/threshold";
import useAnswer from "../hooks/useAnswer";
import useInitGuess from "../hooks/useInitGuess";
import useSeed from "../hooks/useSeed";
import guessAtom from "../state/guess";
import Guess from "./Guess";
import LoseModal from "./LoseModal";
import WonModal from "./WonModal";

const Container = styled.div`
  margin-top: 32px;
`;

const GuessContainer = styled.div`
  margin: 4px 0;
`;

const generateShareResult: (nameHistories: string[][], correctSpotsHistories: boolean[][], wrongSpotsHistories: boolean[][]) => string = (nameHistories, correctSpotsHistories, wrongSpotsHistories) => {
  let histories: string[] = [];
  nameHistories.forEach((name, i) => {
    let row = "";
    console.log(name);
    name.forEach((_, j) => {
      if (correctSpotsHistories[i][j]) {
        row += CORRECT_EMOJI;
      } else if (wrongSpotsHistories[i][j]) {
        row += WRONG_EMOJI;
      } else {
        row += OTHER_EMOJI;
      }
      if (name.length - 1 === j) {
        console.log(row);
        histories.push(row);
      }
    });
  });
  console.log(histories);
  return histories.join("\n");
};

const HistoryAndGuess = () => {
  const [wonModalOpen, setWonModalOpen] = useState(false);
  const [loseModalOpen, setLoseModalOpen] = useState(false);

  const { seed, date } = useSeed();
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
      setWonModalOpen(true);
      setGuess((prev) => ({
        ...prev,
        lastSeed: seed,
      }));
      return;
    }
    if (currentRound > MAX_ROUND) {
      setLoseModalOpen(true);
      setGuess((prev) => ({
        ...prev,
        lastSeed: seed,
      }));
    }
  }, [answer, correctSpotsHistories, currentRound, lastSeed, seed, setGuess]);

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

  const handleWonModalClose = () => setWonModalOpen(false);
  const handleLoseModalClose = () => setLoseModalOpen(false);

  const handleShare = () => {
    const shareText = `${`STATLE ${date} ${currentRound}/6`}\n\n${generateShareResult(nameHistories, correctSpotsHistories, wrongSpotHistories)}\n`;
    // ぱちょこんでは Twitter のシェア画面を、他はネイティブのシェア画面を出す
    if (window.navigator.share) {
      window.navigator.share({
        text: shareText,
        url: "https://statle.tinykitten.me",
      }).catch(_ => console.log("シェアモーダルが閉じられたけど別にいい"));
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURI(shareText)}&url=${encodeURI("https://statle.tinykitten.me")}&related=TinyKitten`);
    }
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
      <WonModal isOpen={wonModalOpen} onRequestClose={handleWonModalClose} onClickShare={handleShare} />
      <LoseModal isOpen={loseModalOpen} onRequestClose={handleLoseModalClose} />
    </Container>
  );
};

export default HistoryAndGuess;
