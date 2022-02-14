import { useCallback, useContext } from "react";
import { ThemeContext } from "styled-components";

type Args = {
  pastGuess: boolean;
  correctFlags: boolean[];
  wrongFlags: boolean[];
};

const useColoring = ({ pastGuess, correctFlags, wrongFlags }: Args) => {
  const themeContext = useContext(ThemeContext);

  const getCharInputBGColor = useCallback(
    (index: number) => {
      if (!pastGuess) {
        return "transparent";
      }

      if (correctFlags?.find((_, i) => i === index)) {
        return "#66ac51";
      }
      if (wrongFlags?.find((_, i) => i === index)) {
        return "#d7b620";
      }

      return "#555";
    },
    [correctFlags, pastGuess, wrongFlags]
  );

  const getCharInputFontColor = useCallback(
    (index: number) => {
      if (
        pastGuess ||
        correctFlags?.find((_, i) => i === index) ||
        wrongFlags?.find((_, i) => i === index)
      ) {
        return themeContext.invertedText;
      }

      return themeContext.text;
    },
    [
      correctFlags,
      pastGuess,
      themeContext.invertedText,
      themeContext.text,
      wrongFlags,
    ]
  );

  const getCharInputBorderColor = useCallback(
    (index: number) => {
      if (!pastGuess) {
        return themeContext.edge;
      }

      if (correctFlags?.find((_, i) => i === index)) {
        return "#66ac51";
      }
      if (wrongFlags?.find((_, i) => i === index)) {
        return "#d7b620";
      }

      return "#555";
    },
    [correctFlags, pastGuess, themeContext.edge, wrongFlags]
  );

  return {
    getCharInputBGColor,
    getCharInputFontColor,
    getCharInputBorderColor,
  };
};

export default useColoring;
