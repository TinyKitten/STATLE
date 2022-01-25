import {
  FormEvent,
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled, { ThemeContext } from "styled-components";
import { japaneseCharacterRegexp } from "../constants/regexp";
import { STATIONS } from "../constants/stations";
import { MAX_CHAR } from "../constants/threshold";
import useAppearance from "../hooks/useAppearance";

const CharacterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CharInput = styled.input<{ bgColor: string }>`
  width: 64px;
  height: 64px;
  font-size: ${typeof navigator !== "undefined" &&
  /ipod|ipad|iphone|macintosh/.test(navigator.userAgent.toLowerCase())
    ? "1.5rem"
    : "3rem"};
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
  value: string[];
};

const Guess = ({
  onGuessComplete,
  pastGuess,
  correctFlags,
  wrongFlags,
  focused,
  disabled,
  value,
}: Props) => {
  const charInputRefs = useRef<HTMLInputElement[] | null[]>(Array.from([]));
  const [characters, setCharacters] = useState<string[]>(value);

  const { appearance } = useAppearance();

  useEffect(() => {
    if (focused) {
      charInputRefs.current[0]?.focus();
    }
  }, [focused]);

  const handleCharChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { value: v, dataset } = e.currentTarget;

    const { index } = dataset as HTMLDataset;
    const indexNum = parseInt(index, 10);
    const value = v.trim().toUpperCase();

    if (!value.length) {
      setCharacters(characters.map((prev, i) => (i === indexNum ? "" : prev)));
      return;
    }

    if (value.match(japaneseCharacterRegexp)) {
      return;
    }

    if (value.length === 2) {
      setCharacters(
        characters.map((prev, i) =>
          i === indexNum + 1 ? value.split("")[1] : prev
        )
      );
      charInputRefs.current[indexNum + 1]?.focus();
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
        setCharacters((prev) =>
          prev.map((_, i) => (i === indexNum ? "" : prev[i]))
        );
        break;
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const joined = characters.join("");
    if (joined.length === MAX_CHAR) {
      if (STATIONS.findIndex((s) => s === joined) === -1) {
        toast("Not in station list.");
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
      {value.map((_, index) => (
        <CharInput
          data-index={index}
          ref={(el) => (charInputRefs.current[index] = el)}
          value={characters[index]}
          onChange={handleCharChange}
          maxLength={2} // BS直後の入力用 実際2文字になったときは後ろの値を使う
          key={index}
          bgColor={(() => getCharInputBGColor(index))()}
          pattern="[a-zA-Z]+"
          inputMode="search"
          onKeyUp={handleKeyUp}
          disabled={disabled}
        />
      ))}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
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
