import { act, renderHook } from "@testing-library/react-hooks";
import { useAtom } from "jotai";
import useKeyboardEvent from "../../hooks/useKeyboardEvent";

jest.mock("jotai");
jest.mock("../../state/guess", () => jest.fn());
jest.mock("../../hooks/useSeed", () => () => ({
  seed: 0,
}));

describe("useKeyboardEvent", () => {
  it("正しいフォーマットの入力＆入力可能範囲内であればステートに文字が格納されるべき", () => {
    const setGuessFn = jest.fn();
    (useAtom as jest.Mock).mockImplementation(() => [
      { currentCharacters: [], finished: false },
      setGuessFn,
    ]);

    const { result } = renderHook(() => useKeyboardEvent());
    act(() => {
      result.current.handleKeyValue("A");
    });
    expect(setGuessFn).toBeCalledWith(expect.any(Function));
  });
  it("入力可能文字数を超過している場合ステート格納はしない", () => {
    const setGuessFn = jest.fn();
    (useAtom as jest.Mock).mockImplementation(() => [
      { currentCharacters: ["Y", "A", "J", "U", "S"], finished: false },
      setGuessFn,
    ]);

    const { result } = renderHook(() => useKeyboardEvent());
    act(() => {
      result.current.handleKeyValue("A");
    });
    expect(setGuessFn).not.toBeCalled();
  });
  it("英字以外は無視する", () => {
    const setGuessFn = jest.fn();
    (useAtom as jest.Mock).mockImplementation(() => [
      { currentCharacters: [], finished: false },
      setGuessFn,
    ]);

    const { result } = renderHook(() => useKeyboardEvent());
    act(() => {
      result.current.handleKeyValue("あ");
    });
    expect(setGuessFn).not.toBeCalled();
  });
  it("ゲームが終わっているときは入力を無視する", () => {
    const setGuessFn = jest.fn();
    (useAtom as jest.Mock).mockImplementation(() => [
      { currentCharacters: [], finished: true },
      setGuessFn,
    ]);

    const { result } = renderHook(() => useKeyboardEvent());
    act(() => {
      result.current.handleKeyValue("A");
    });
    expect(setGuessFn).not.toBeCalled();
  });
  it("バックスペースが押されたときにステート変更が起きる", () => {
    const setGuessFn = jest.fn();
    (useAtom as jest.Mock).mockImplementation(() => [
      { currentCharacters: ["A"], finished: true },
      setGuessFn,
    ]);

    const { result } = renderHook(() => useKeyboardEvent());
    act(() => {
      result.current.handleKeyValue("Backspace");
    });
    expect(setGuessFn).not.toBeCalled();
  });
  it("SWキーボードのバックスペースが押されたときにステート変更が起きる", () => {
    const setGuessFn = jest.fn();
    (useAtom as jest.Mock).mockImplementation(() => [
      { currentCharacters: ["A"], finished: true },
      setGuessFn,
    ]);

    const { result } = renderHook(() => useKeyboardEvent());
    act(() => {
      result.current.handleKeyValue("⌫");
    });
    expect(setGuessFn).not.toBeCalledWith(expect.any(Function));
  });
  it("条件を満たさずEnterが押された場合無視する", () => {
    const setGuessFn = jest.fn();
    (useAtom as jest.Mock).mockImplementation(() => [
      { currentCharacters: [], finished: true },
      setGuessFn,
    ]);

    const { result } = renderHook(() => useKeyboardEvent());
    act(() => {
      result.current.handleKeyValue("Enter");
    });
    expect(setGuessFn).not.toBeCalledWith(expect.any(Function));
  });
  it("条件を満たさずENTERが押された場合無視する", () => {
    const setGuessFn = jest.fn();
    (useAtom as jest.Mock).mockImplementation(() => [
      { currentCharacters: [], finished: true },
      setGuessFn,
    ]);

    const { result } = renderHook(() => useKeyboardEvent());
    act(() => {
      result.current.handleKeyValue("Enter");
    });
    expect(setGuessFn).not.toBeCalledWith(expect.any(Function));
  });
  it("最後のマスでEnterが押された場合でも駅名に存在しない場合ステート更新が発火しない", () => {
    const setGuessFn = jest.fn();
    (useAtom as jest.Mock).mockImplementation(() => [
      { currentCharacters: ["A", "B", "C", "D", "E"], finished: false },
      setGuessFn,
    ]);

    const { result } = renderHook(() => useKeyboardEvent());
    act(() => {
      result.current.handleKeyValue("Enter");
    });
    expect(setGuessFn).not.toBeCalledWith(expect.any(Function));
    act(() => {
      result.current.handleKeyValue("ENTER");
    });
    expect(setGuessFn).not.toBeCalledWith(expect.any(Function));
  });
  it("最後のマスでEnterが押されて駅名が存在する場合ステート更新が発火する", () => {
    const setGuessFn = jest.fn();
    (useAtom as jest.Mock).mockImplementation(() => [
      { currentCharacters: ["U", "R", "A", "W", "A"], finished: false },
      setGuessFn,
    ]);

    const { result } = renderHook(() => useKeyboardEvent());
    act(() => {
      result.current.handleKeyValue("Enter");
    });
    expect(setGuessFn).toBeCalledWith(expect.any(Function));
    act(() => {
      result.current.handleKeyValue("ENTER");
    });
    expect(setGuessFn).toBeCalledWith(expect.any(Function));
  });
});
