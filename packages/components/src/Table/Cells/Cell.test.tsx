import React from "react";
import renderer from "react-test-renderer";
import { Cell } from "../";

it("renders a simple cell", () => {
  const tree = renderer.create(<Cell>Ship</Cell>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a left aligned cell", () => {
  const tree = renderer.create(<Cell align="left">Ship</Cell>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a right aligned cell", () => {
  const tree = renderer.create(<Cell align="right">Ship</Cell>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a center aligned cell", () => {
  const tree = renderer.create(<Cell align="center">Ship</Cell>).toJSON();
  expect(tree).toMatchSnapshot();
});
