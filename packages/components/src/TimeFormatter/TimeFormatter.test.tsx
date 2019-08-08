import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { TimeFormatter } from ".";

afterEach(cleanup);

it("renders a TimeFormatter", () => {
  const tree = renderer
    .create(
      <TimeFormatter
        civilTime={"11:30:00.000000000"}
        useMilitaryTime={false}
      />,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot();
});
