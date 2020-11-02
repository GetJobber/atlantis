import React from "react";
import renderer from "react-test-renderer";
import { DataDump } from ".";

it("renders a DataDump", () => {
  const tree = renderer.create(<DataDump data={{ Foo: "bar" }} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("dumps some data with a label", () => {
  const tree = renderer
    .create(<DataDump label="💩" data={{ Foo: "bar" }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
