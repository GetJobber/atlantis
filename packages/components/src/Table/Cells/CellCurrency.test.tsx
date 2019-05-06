import React from "react";
import renderer from "react-test-renderer";
import { CellCurrency } from "..";

it("renders a currency cell", () => {
  const tree = renderer.create(<CellCurrency value={42000000} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a currency cell in Pound Sterling", () => {
  const tree = renderer
    .create(<CellCurrency value={32074770} currency="GBP" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
