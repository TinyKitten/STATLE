import { renderHook } from "@testing-library/react-hooks";
import useSeed from "../../hooks/useSeed";

jest.mock("../../wasm/seedgen", () => ({
  generate: () => 334,
}));
const mockDate = new Date(2022, 2, 13, 0, 0, 0);
jest.useFakeTimers();
jest.setSystemTime(mockDate);

describe("useSeed", () => {
  it("generate()の通りの値を返してほしい", () => {
    const { result } = renderHook(() => useSeed());
    expect(result.current.seed).toBe(334);
  });
  it("日付をstring値で返してほしい", () => {
    const { result } = renderHook(() => useSeed());
    expect(result.current.date).toBe("2022/3/13");
  });
});
