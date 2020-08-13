import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { InputFile } from ".";

afterEach(cleanup);

it("renders a InputFile", () => {
  const tree = renderer.create(<InputFile />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders an InputFile with multiple uploads", () => {
  const tree = renderer.create(<InputFile multiple={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders an InputFile with only images allowed", () => {
  const tree = renderer.create(<InputFile allowedTypes="images" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders an InputFile with multiple images allowed", () => {
  const tree = renderer
    .create(<InputFile allowedTypes="images" multiple={true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
