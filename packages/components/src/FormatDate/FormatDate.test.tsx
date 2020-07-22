import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { CivilDate } from "@std-proposal/temporal";
import { FormatDate } from "./FormatDate";

afterEach(cleanup);

Object.entries({
  CivilDate: new CivilDate(2020, 2, 26),
  ISO8601DateString: "2019-03-30T00:45",
  Date: new Date("2019-03-30T00:45"),
}).forEach(([inputType, value]) => {
  it(`renders a FormatDate from ${inputType}`, () => {
    const tree = renderer.create(<FormatDate date={value} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
