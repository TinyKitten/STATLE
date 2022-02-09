import { useCallback, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled, { ThemeContext } from "styled-components";
import useAppearance from "../hooks/useAppearance";

const CharacterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Char = styled.div<{
  txtColor: string;
  bgColor: string;
  borderColor: string;
}>`
  width: 64px;
  height: 64px;
  font-size: 3rem;
  color: ${({ theme, txtColor }) => txtColor || theme.text};
  text-align: center;
  appearance: none;
  background: ${({ bgColor }) => bgColor || "transparent"};
  margin: 0 2px;
  border: ${({ theme, borderColor }) =>
    `2px solid ${borderColor || theme.edge}`};
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  pastGuess: boolean;
  correctFlags: boolean[];
  wrongFlags: boolean[];
  value: string[];
};

const Guess = ({ pastGuess, correctFlags, wrongFlags, value }: Props) => {
  const { appearance } = useAppearance();

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

  return (
    <CharacterContainer>
      {value.map((v, index) => (
        <Char
          key={index}
          txtColor={getCharInputFontColor(index)}
          bgColor={getCharInputBGColor(index)}
          borderColor={getCharInputBorderColor(index)}
        >
          {v}
        </Char>
      ))}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme={appearance === "dark" ? "dark" : "light"}
      />
    </CharacterContainer>
  );
};

export default Guess;
