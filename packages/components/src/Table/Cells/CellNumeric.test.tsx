import React from "react";
import renderer from "react-test-renderer";
import { CellNumeric } from "../";

it("renders a numeric cell", () => {
  const tree = renderer.create(<CellNumeric value={13} />).toJSON();
  expect(tree).toMatchSnapshot();
});
