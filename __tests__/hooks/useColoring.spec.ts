import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import useColoring from "../../hooks/useColoring";

React.useContext = jest.fn().mockImplementation(() => ({
  invertedText: "invertedText",
  text: "text",
  edge: "edge",
}));

describe("useColoring", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("現在入力中の場合透明になるべき", () => {
    const { result } = renderHook(() =>
      useColoring({
        pastGuess: false,
        correctFlags: Array.from<boolean>({ length: 5 }).fill(true),
        wrongFlags: Array.from<boolean>({ length: 5 }).fill(false),
      })
    );
    expect(result.current.getCharInputBGColor(0)).toBe("transparent");
  });
  it("正しく配色されるべき", () => {
    const { result } = renderHook(() =>
      useColoring({
        pastGuess: true,
        // [true, true, false, false, false]
        correctFlags: [
          ...Array.from<boolean>({ length: 2 }).fill(true),
          ...Array.from<boolean>({ length: 3 }).fill(false),
        ],
        // [false, false, true, true, false]
        wrongFlags: [
          ...Array.from<boolean>({ length: 2 }).fill(false),
          ...Array.from<boolean>({ length: 2 }).fill(true),
          false,
        ],
      })
    );
    Array.from({ length: 5 }).forEach((_, i) => {
      if (i < 2) {
        expect(result.current.getCharInputBGColor(i)).toBe("#66ac51");
      } else if (i <= 3) {
        expect(result.current.getCharInputBGColor(i)).toBe("#d7b620");
      } else if (i === 4) {
        expect(result.current.getCharInputBGColor(i)).toBe("#555");
      }
    });
  });
  it("全部text colorになるべき", () => {
    const { result } = renderHook(() =>
      useColoring({
        pastGuess: false,
        correctFlags: Array.from<boolean>({ length: 5 }).fill(false),
        wrongFlags: Array.from<boolean>({ length: 5 }).fill(false),
      })
    );
    Array.from({ length: 5 }).forEach((_, i) => {
      expect(result.current.getCharInputFontColor(i)).toBe("text");
    });
  });
  it("正しくフォントが配色されるべき", () => {
    const { result } = renderHook(() =>
      useColoring({
        pastGuess: true,
        correctFlags: Array.from<boolean>({ length: 2 }).fill(true),
        wrongFlags: Array.from<boolean>({ length: 5 }).fill(true),
      })
    );
    Array.from({ length: 5 }).forEach((_, i) => {
      expect(result.current.getCharInputFontColor(i)).toBe("invertedText");
    });
  });
  it("すべてのボーダーがedge colorになるべき", () => {
    const { result } = renderHook(() =>
      useColoring({
        pastGuess: false,
        correctFlags: Array.from<boolean>({ length: 5 }).fill(false),
        wrongFlags: Array.from<boolean>({ length: 5 }).fill(false),
      })
    );
    Array.from({ length: 5 }).forEach((_, i) => {
      expect(result.current.getCharInputBorderColor(i)).toBe("edge");
    });
  });
  it("正しくボーダーが配色されるべき", () => {
    const { result } = renderHook(() =>
      useColoring({
        pastGuess: true,
        correctFlags: [
          ...Array.from<boolean>({ length: 2 }).fill(true),
          ...Array.from<boolean>({ length: 3 }).fill(false),
        ],
        wrongFlags: [
          ...Array.from<boolean>({ length: 2 }).fill(false),
          ...Array.from<boolean>({ length: 3 }).fill(true),
        ],
      })
    );
    Array.from({ length: 5 }).forEach((_, i) => {
      if (i < 2) {
        expect(result.current.getCharInputBorderColor(i)).toBe("#66ac51");
      } else if (i > 2) {
        expect(result.current.getCharInputBorderColor(i)).toBe("#d7b620");
      }
    });
  });
  it("すべてのボーダーが#555になるべき", () => {
    const { result } = renderHook(() =>
      useColoring({
        pastGuess: true,
        correctFlags: Array.from<boolean>({ length: 5 }).fill(false),
        wrongFlags: Array.from<boolean>({ length: 5 }).fill(false),
      })
    );
    Array.from({ length: 5 }).forEach((_, i) => {
      expect(result.current.getCharInputBorderColor(i)).toBe("#555");
    });
  });
});
