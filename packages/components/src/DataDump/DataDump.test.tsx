import { render } from "@testing-library/react";
import React from "react";
import { DataDump } from ".";

it("renders a DataDump", () => {
  const { container } = render(<DataDump data={{ Foo: "bar" }} />);
  expect(container).toMatchSnapshot();
});

it("dumps some data with a label", () => {
  const { container } = render(<DataDump label="💩" data={{ Foo: "bar" }} />);
  expect(container).toMatchSnapshot();
});
