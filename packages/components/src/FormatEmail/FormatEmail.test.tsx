import React from "react";
import { cleanup, render } from "@testing-library/react";
import { FormatEmail } from ".";

afterEach(cleanup);

it("renders a FormatEmail", () => {
  const { container } = render(<FormatEmail email="email@address.me" />);
  expect(container).toMatchSnapshot();
});

it("renders a FormatEmail in an address tag", () => {
  const { container } = render(<FormatEmail email="email@address.me" />);
  expect(container.querySelector("address")).toBeDefined();
});
