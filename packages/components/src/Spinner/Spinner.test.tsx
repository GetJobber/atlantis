import React from "react";
import renderer from "react-test-renderer";
import { Spinner } from ".";

it("renders the spinner", () => {
  const tree = renderer.create(<Spinner />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders the small spinner", () => {
  const tree = renderer.create(<Spinner size="small" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders the inline spinner", () => {
  const tree = renderer.create(<Spinner inline={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a small inline spinner", () => {
  const tree = renderer.create(<Spinner inline={true} size="small" />).toJSON();
  expect(tree).toMatchSnapshot();
});
