import { useAtom } from "jotai";
import {
  CORRECT_EMOJI,
  OTHER_EMOJI_DARK,
  OTHER_EMOJI_LIGHT,
  WRONG_EMOJI,
} from "../constants/share";
import guessAtom from "../state/guess";
import themeAtom from "../state/theme";

const useShare = (date: string) => {
  const [{ appearance }] = useAtom(themeAtom);

  const [
    { currentRound, nameHistories, correctSpotsHistories, wrongSpotHistories },
  ] = useAtom(guessAtom);

  const generateShareResult: (
    nameHistories: string[][],
    correctSpotsHistories: boolean[][],
    wrongSpotsHistories: boolean[][]
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
      currentRound - 1
    }/6`}\n\n${generateShareResult(
      nameHistories,
      correctSpotsHistories,
      wrongSpotHistories
    )}\n`;
    // ぱちょこんでは Twitter のシェア画面を、他はネイティブのシェア画面を出す
    if (window.navigator.share) {
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

    if (typeof window !== "undefined") {
      window.dataLayer.push({ event: "user_share" });
    }
  };

  return share;
};

export default useShare;
