import { renderHook } from "@testing-library/react-hooks";
import useAnswer from "../../hooks/useAnswer";

jest.mock("../../hooks/useSeed", () => () => ({
  seed: 1,
}));

describe("useAnswer", () => {
  it("同じシード値で同じ駅が出てくる", () => {
    const { result } = renderHook(() => useAnswer(0));

    expect(result.current).toBe("TOMAI");
  });
  it("useSeedがちゃんと呼ばれてる", () => {
    const { result } = renderHook(() => useAnswer());

    expect(result.current).toBe("OWANI");
  });
});
