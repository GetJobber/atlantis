import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { StatusLabel } from ".";

afterEach(cleanup);

it("renders an inactive StatusLabel", () => {
  const tree = renderer
    .create(<StatusLabel label="Foo" status="inactive" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a successful StatusLabel", () => {
  const tree = renderer
    .create(<StatusLabel label="Foo" status="success" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a warning StatusLabel", () => {
  const tree = renderer
    .create(<StatusLabel label="Foo" status="warning" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a critical StatusLabel", () => {
  const tree = renderer
    .create(<StatusLabel label="Foo" status="critical" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders an informative StatusLabel", () => {
  const tree = renderer
    .create(<StatusLabel label="Foo" status="informative" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders an end-aligned StatusLabel", () => {
  const tree = renderer
    .create(<StatusLabel label="Foo" status="informative" alignment="end" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
