import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { InputGroup } from ".";

afterEach(cleanup);

it("renders a vertical InputGroup", () => {
  const tree = renderer.create(<InputGroup>Test content</InputGroup>).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="inputGroup vertical"
    >
      Test content
    </div>
  `);
});

it("renders a horizontal InputGroup", () => {
  const tree = renderer
    .create(<InputGroup flowDirection="horizontal">Test content</InputGroup>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="inputGroup horizontal"
    >
      Test content
    </div>
  `);
});
