import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { CivilTime } from "@std-proposal/temporal";
import { FormatTime } from "./FormatTime";

afterEach(cleanup);

it("renders a FormatTime", () => {
  const tree = renderer
    .create(<FormatTime time={new CivilTime(11, 30)} />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`"11:30 AM"`);
});

it("renders a FormatTime using 24 hour clock", () => {
  const tree = renderer
    .create(<FormatTime time={new CivilTime(14, 30)} use24HourClock={true} />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`"14:30"`);
});

it("renders a FormatTime using 12 hour clock", () => {
  const tree = renderer
    .create(<FormatTime time={new CivilTime(17, 30)} use24HourClock={false} />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`"5:30 PM"`);
});
