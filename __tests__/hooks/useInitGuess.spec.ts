import { renderHook } from "@testing-library/react-hooks";
import { useAtom } from "jotai";
import useInitGuess from "../../hooks/useInitGuess";
import { INITIAL_GUESS_ATOM_VALUE } from "../../state/guess";

jest.mock("../../hooks/useSeed", () => () => ({
  seed: 1,
}));
jest.mock("jotai");
jest.mock("../../state/guess", () => jest.fn());

describe("useInitGuess", () => {
  it("readyがtrueになってほしい", () => {
    (useAtom as jest.Mock).mockImplementation(() => [{ lastSeed: 0 }, jest.fn]);
    const result = renderHook(() => useInitGuess()).result;
    expect(result.current).toBeTruthy();
  });
  it("lastSeedとseedが異なるのでsetGuessが呼ばれてほしい", () => {
    const setGuessFn = jest.fn();
    (useAtom as jest.Mock).mockImplementation(() => [
      { lastSeed: 0 },
      setGuessFn,
    ]);
    renderHook(() => useInitGuess());
    expect(setGuessFn).toBeCalledWith(INITIAL_GUESS_ATOM_VALUE);
  });
});
