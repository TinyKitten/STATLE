import { MouseEvent, useCallback, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import {
  CORRECT_POSITION_COLOR,
  WRONG_POSITION_COLOR,
} from "../constants/color";

type Props = {
  onClick: (value: string) => void;
  correctChars: string[];
  wrongChars: string[];
  notMatchedChars: string[];
};

const KEYS: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
`;
const Column = styled.button<{ backgroundColor?: string }>`
  appearance: none;
  cursor: pointer;
  border: none;
  display: flex;
  color: white;
  width: 43px;
  height: 58px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.edge};
  border-radius: 5px;
  margin: 2px;
  font-weight: bold;
  font-size: 1rem;
  @media screen and (max-width: 480px) {
    width: 33px;
    height: 48px;
  }
`;

const EnterColumn = styled(Column)`
  width: 65px;
  @media screen and (max-width: 480px) {
    width: 48px;
    font-size: 0.75rem;
  }
`;

const Keyboard = ({
  onClick,
  correctChars,
  wrongChars,
  notMatchedChars,
}: Props) => {
  const handleEnterClick = () => onClick("ENTER");
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { value: v, dataset } = e.currentTarget;
    const { key } = dataset as { key: string };
    onClick(key);
  };

  const themeContext = useContext(ThemeContext);

  const getIsCorrectChar = useCallback(
    (char: string) => correctChars.includes(char),
    [correctChars]
  );
  const getIsWrongChar = useCallback(
    (char: string) => wrongChars.includes(char),
    [wrongChars]
  );
  const getIsNotMatchedChar = useCallback(
    (char: string) => notMatchedChars.includes(char),
    [notMatchedChars]
  );

  const getBGColor = useCallback(
    (char: string): string | undefined => {
      if (getIsCorrectChar(char)) {
        return CORRECT_POSITION_COLOR;
      }
      if (getIsWrongChar(char)) {
        return WRONG_POSITION_COLOR;
      }
      if (getIsNotMatchedChar(char)) {
        return themeContext.backgroundSub;
      }
    },
    [
      getIsCorrectChar,
      getIsNotMatchedChar,
      getIsWrongChar,
      themeContext.backgroundSub,
    ]
  );

  return (
    <Container>
      {KEYS.map((row) => (
        <Row key={row[0]}>
          {row.map((key) =>
            key === "ENTER" ? (
              <EnterColumn onClick={handleEnterClick} key={key}>
                {key}
              </EnterColumn>
            ) : (
              <Column
                backgroundColor={getBGColor(key)}
                data-key={key}
                onClick={handleClick}
                key={key}
              >
                {key}
              </Column>
            )
          )}
        </Row>
      ))}
    </Container>
  );
};

export default Keyboard;
