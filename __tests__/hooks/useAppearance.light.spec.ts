import { act, renderHook } from "@testing-library/react-hooks";
import useAppearance from "../../hooks/useAppearance";
import "../../__mocks__/matchMedia.light.mock";

describe("useAppearance(light)", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("ライトモードになるべき", () => {
    const { result } = renderHook(() => useAppearance());
    expect(result.current.appearance).toBe("light");
    expect(result.current.themeReady).toBe(true);
  });
  it("トグルできるべき", () => {
    const { result } = renderHook(() => useAppearance());
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.appearance).toBe("dark");
    expect(result.current.themeReady).toBe(true);
  });
});
