import { BREAKPOINTS } from "./DataList.const";
import { sortSizeProp } from "./DataList.utils";

describe("Sort Size Prop", () => {
  it("sorts correctly", () => {
    expect(sortSizeProp(["xl", "lg", "md", "sm", "xs"])).toEqual(BREAKPOINTS);
  });
});
