import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import useAppearance from "../hooks/useAppearance";
import useColoring from "../hooks/useColoring";

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
  const {
    getCharInputFontColor,
    getCharInputBGColor,
    getCharInputBorderColor,
  } = useColoring({ pastGuess, correctFlags, wrongFlags });

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
        pauseOnHover={false}
        theme={appearance === "dark" ? "dark" : "light"}
      />
    </CharacterContainer>
  );
};

export default Guess;
