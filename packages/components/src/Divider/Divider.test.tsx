import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { Divider } from ".";

afterEach(cleanup);

it("renders a Divider", () => {
  const tree = renderer.create(<Divider />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a large Divider", () => {
  const tree = renderer.create(<Divider size="large" />).toJSON();
  expect(tree).toMatchSnapshot();
});
