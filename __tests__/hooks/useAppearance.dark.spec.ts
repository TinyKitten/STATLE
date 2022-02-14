import { act, renderHook } from "@testing-library/react-hooks";
import useAppearance from "../../hooks/useAppearance";
import "../../__mocks__/matchMedia.dark.mock";

describe("useAppearance(dark)", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("ダークモードになるべき", () => {
    const { result } = renderHook(() => useAppearance());
    expect(result.current.appearance).toBe("dark");
    expect(result.current.themeReady).toBe(true);
  });
  it("トグルできるべき", () => {
    const { result } = renderHook(() => useAppearance());
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.appearance).toBe("light");
    expect(result.current.themeReady).toBe(true);
  });
});
