import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { CivilTime } from "@std-proposal/temporal";
import { TimeFormatter } from "./TimeFormatter";

afterEach(cleanup);

it("renders a TimeFormatter", () => {
  const tree = renderer
    .create(
      <TimeFormatter
        civilTime={new CivilTime(11, 30)}
        use24HourClock={false}
      />,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`"11:30 AM"`);
});
