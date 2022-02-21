import { useAtom } from "jotai";
import {
  CORRECT_EMOJI,
  OTHER_EMOJI_DARK,
  OTHER_EMOJI_LIGHT,
  WRONG_EMOJI,
} from "../constants/share";
import { event } from "../lib/gtag";
import guessAtom from "../state/guess";
import themeAtom from "../state/theme";

const useShare = (date: string, won: boolean) => {
  const [{ appearance }] = useAtom(themeAtom);

  const [
    { currentRound, nameHistories, correctSpotsHistories, wrongSpotHistories },
  ] = useAtom(guessAtom);

  const isWindows = window.navigator.userAgent.toLowerCase().includes("win");

  const generateShareResult: (
    nameHistories: string[][],
    correctSpotsHistories: boolean[][],
    wrongSpotsHistories: boolean[][],
    won: boolean
  ) => string = (nameHistories, correctSpotsHistories, wrongSpotsHistories) => {
    return nameHistories
      .map((pairs, i) =>
        pairs
          .map((_, j) => {
            if (correctSpotsHistories[i][j]) {
              return CORRECT_EMOJI;
            } else if (wrongSpotsHistories[i][j]) {
              return WRONG_EMOJI;
            } else {
              return appearance === "dark"
                ? OTHER_EMOJI_DARK
                : OTHER_EMOJI_LIGHT;
            }
          })
          .join("")
      )
      .join("\n");
  };

  const share = () => {
    const shareText = `${`STATLE ${date} ${
      won ? currentRound - 1 : "X"
    }/6`}\n\n${generateShareResult(
      nameHistories,
      correctSpotsHistories,
      wrongSpotHistories,
      won
    )}\n`;
    /**
     * ぱちょこんでは Twitter のシェア画面を、他はネイティブのシェア画面を出す
     *
     * Windows だとなぜか window.navigator が定義されているらしいが、
     * 弾けばええやろみたいな気分で UA で弾いた
     */
    if (!isWindows && window.navigator.share) {
      window.navigator.share({
        text: shareText,
        url: "https://statle.tinykitten.me",
      });
    } else {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURI(
          shareText
        )}&url=${encodeURI("https://statle.tinykitten.me")}&related=TinyKitten`
      );
    }

    event({
      action: "user_share",
      category: "user_engagement",
      label: "event",
    });
  };

  return share;
};

export default useShare;
