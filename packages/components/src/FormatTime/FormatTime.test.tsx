import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Temporal } from "@js-temporal/polyfill";
import { FormatTime } from "./FormatTime";

afterEach(cleanup);

Object.entries({
  CivilDate: new Temporal.PlainTime(14, 30),
  ISO8601DateString: "2019-03-30T14:30",
  Date: new Date("2019-03-30T14:30"),
}).forEach(([inputType, value]) => {
  it(`renders a FormatTime from ${inputType}`, () => {
    const { container } = render(<FormatTime time={value} />);
    expect(container).toMatchSnapshot();
  });

  it(`renders a FormatTime from ${inputType} using 24 hour clock`, () => {
    const { container } = render(
      <FormatTime time={value} use24HourClock={true} />,
    );
    expect(container).toMatchSnapshot();
  });

  it(`renders a FormatTime from ${inputType} using 12 hour clock`, () => {
    const { container } = render(
      <FormatTime time={value} use24HourClock={false} />,
    );
    expect(container).toMatchSnapshot();
  });
});
