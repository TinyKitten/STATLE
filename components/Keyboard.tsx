import { MouseEvent } from "react";
import styled from "styled-components";

type Props = {
  onClick: (value: string) => void;
};

const KEYS: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "⌫"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "ENTER"],
  ["Z", "X", "C", "V", "B", "N", "M"],
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
const Column = styled.button`
  appearance: none;
  cursor: pointer;
  border: none;
  display: flex;
  color: white;
  width: 43px;
  height: 58px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.edge};
  border-radius: 5px;
  margin: 2px;
  font-weight: bold;

  @media screen and (max-width: 480px) {
    width: 33px;
    height: 48px;
    font-size: 0.5rem;
  }
`;

const EnterColumn = styled(Column)`
  width: 65px;
  @media screen and (max-width: 480px) {
    width: 48px;
    font-size: 0.5rem;
  }
`;

const Keyboard = ({ onClick }: Props) => {
  const handleEnterClick = () => onClick("ENTER");
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { value: v, dataset } = e.currentTarget;
    const { key } = dataset as { key: string };
    onClick(key);
  };

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
              <Column data-key={key} onClick={handleClick} key={key}>
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
