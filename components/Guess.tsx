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

const Char = styled.div<{ bgColor: string }>`
  width: 64px;
  height: 64px;
  font-size: 3rem;
  color: ${({ theme }) => theme.text};
  text-align: center;
  appearance: none;
  background: ${({ bgColor }) => bgColor || "transparent"};
  margin: 0 2px;
  border: ${({ theme }) => `2px solid ${theme.edge}`};
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  pastGuess: boolean;
  correctFlags: boolean[];
  wrongFlags: boolean[];
  disabled: boolean;
  value: string[];
};

const Guess = ({
  pastGuess,
  correctFlags,
  wrongFlags,
  disabled,
  value,
}: Props) => {
  const { appearance } = useAppearance();

  const themeContext = useContext(ThemeContext);

  const getCharInputBGColor = useCallback(
    (index: number) => {
      if (!pastGuess && !disabled) {
        return "transparent";
      }

      if (correctFlags?.find((_, i) => i === index)) {
        return "#66ac51";
      }
      if (wrongFlags?.find((_, i) => i === index)) {
        return "#d7b620";
      }

      if (disabled) {
        return themeContext.edge;
      }

      return themeContext.edge;
    },
    [correctFlags, disabled, pastGuess, themeContext.edge, wrongFlags]
  );

  return (
    <CharacterContainer>
      {value.map((v, index) => (
        <Char key={index} bgColor={(() => getCharInputBGColor(index))()}>
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
