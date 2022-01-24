import {
  FormEvent,
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { ThemeContext } from "styled-components";
import { japaneseCharacterRegexp } from "../constants/regexp";
import { STATIONS } from "../constants/stations";
import { MAX_CHAR } from "../constants/threshold";

const CharacterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CharInput = styled.input<{ bgColor: string }>`
  width: 64px;
  height: 64px;
  font-size: 64px;
  color: ${({ theme }) => theme.text};
  text-align: center;
  appearance: none;
  background: ${({ bgColor }) => bgColor || "transparent"};
  margin: 0 2px;
  border: ${({ theme }) => `2px solid ${theme.edge}`};
  font-weight: bold;
  &:focus {
    outline: none;
  }
`;

type HTMLDataset = {
  index: string;
};

type Props = {
  onGuessComplete: (answerChars: string[]) => void;
  pastGuess: boolean;
  correctFlags: boolean[];
  wrongFlags: boolean[];
  focused: boolean;
  disabled: boolean;
};

const Guess = ({
  onGuessComplete,
  pastGuess,
  correctFlags,
  wrongFlags,
  focused,
  disabled,
}: Props) => {
  const emptyArray = Array.from<string>({ length: MAX_CHAR }).fill("");

  const charInputRefs = useRef<HTMLInputElement[] | null[]>(Array.from([]));
  const [characters, setCharacters] = useState<string[]>(emptyArray);

  useEffect(() => {
    if (focused) {
      charInputRefs.current[0]?.focus();
    }
  }, [focused]);

  const handleCharChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { value: v, dataset } = e.currentTarget;
    const { index } = dataset as HTMLDataset;
    const indexNum = parseInt(index, 10);
    const value = v.toUpperCase();

    if (value.length && value.match(japaneseCharacterRegexp)) {
      return;
    }

    setCharacters(characters.map((prev, i) => (i === indexNum ? value : prev)));
    charInputRefs.current[indexNum + 1]?.focus();
  };

  const handleKeyUp = (
    e: SyntheticEvent<HTMLInputElement> & { key: string }
  ) => {
    const { dataset } = e.currentTarget;
    const { index } = dataset as HTMLDataset;
    const indexNum = parseInt(index, 10);
    switch (e.key) {
      case "Enter": {
        if (characters.join("").length === MAX_CHAR) {
          handleSubmit(e);
        }
        break;
      }
      case "Backspace": {
        charInputRefs.current[indexNum - 1]?.focus();
        if (indexNum === MAX_CHAR - 1) {
          setCharacters((prev) =>
            prev.map((_, i) => (i === indexNum ? "" : prev[i]))
          );
        } else {
          setCharacters((prev) =>
            prev.map((_, i) => (i === indexNum - 1 ? "" : prev[i]))
          );
        }
        break;
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const joined = characters.join("");
    if (joined.length === MAX_CHAR) {
      if (STATIONS.findIndex((s) => s === joined) === -1) {
        alert("Not in station list.");
        return;
      }
      onGuessComplete(characters);
    }
  };

  const themeContext = useContext(ThemeContext);

  const getCharInputBGColor = useCallback(
    (index: number) => {
      if (!pastGuess && !disabled) {
        return "transparent";
      }

      if (correctFlags?.find((_, i) => i === index)) {
        return "#008000";
      }
      if (wrongFlags?.find((_, i) => i === index)) {
        return "#D8D500";
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
      {emptyArray.map((_, index) => (
        <CharInput
          data-index={index}
          ref={(el) => (charInputRefs.current[index] = el)}
          value={characters[index]}
          onChange={handleCharChange}
          maxLength={1}
          key={index}
          bgColor={(() => getCharInputBGColor(index))()}
          pattern="[a-zA-Z]+"
          onKeyUp={handleKeyUp}
          disabled={disabled}
        />
      ))}
    </CharacterContainer>
  );
};

export default Guess;
