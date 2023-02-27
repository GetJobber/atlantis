import React from "react";
import renderer from "react-test-renderer";
import { cleanup, render } from "@testing-library/react";
import { FormatEmail } from ".";

afterEach(cleanup);

it("renders a FormatEmail", () => {
  const tree = renderer
    .create(<FormatEmail email="email@address.me" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a FormatEmail in an address tag", () => {
  const { container } = render(<FormatEmail email="email@address.me" />);
  expect(container.querySelector("address")).toBeDefined();
});
