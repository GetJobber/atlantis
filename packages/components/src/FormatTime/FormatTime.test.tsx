import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { CivilTime } from "@std-proposal/temporal";
import { FormatTime } from "./FormatTime";

afterEach(cleanup);

Object.entries({
  CivilDate: new CivilTime(14, 30),
  ISO8601DateString: "2019-03-30T00:45Z",
  Date: new Date("2019-03-30T00:45Z"),
}).forEach(([inputType, value]) => {
  it(`renders a FormatTime from ${inputType}`, () => {
    const tree = renderer.create(<FormatTime time={value} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`renders a FormatTime from ${inputType} using 24 hour clock`, () => {
    const tree = renderer
      .create(<FormatTime time={value} use24HourClock={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`renders a FormatTime from ${inputType} using 12 hour clock`, () => {
    const tree = renderer
      .create(<FormatTime time={value} use24HourClock={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
