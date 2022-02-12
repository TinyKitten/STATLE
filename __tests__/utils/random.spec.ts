import Random from "../../utils/random";

describe("utils/random", () => {
  it("同じシードで同じ整数値が出てくる", () => {
    const rand = new Random(0);
    const actual = rand.nextInt(0, 100);
    expect(actual).toBe(97);
  });
});
