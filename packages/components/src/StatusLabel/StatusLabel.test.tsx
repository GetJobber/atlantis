import React from "react";
import { cleanup, render } from "@testing-library/react";
import { StatusLabel } from ".";

afterEach(cleanup);

it("renders an inactive StatusLabel", () => {
  const { container } = render(<StatusLabel label="Foo" status="inactive" />);
  expect(container).toMatchSnapshot();
});

it("renders a successful StatusLabel", () => {
  const { container } = render(<StatusLabel label="Foo" status="success" />);
  expect(container).toMatchSnapshot();
});

it("renders a warning StatusLabel", () => {
  const { container } = render(<StatusLabel label="Foo" status="warning" />);
  expect(container).toMatchSnapshot();
});

it("renders a critical StatusLabel", () => {
  const { container } = render(<StatusLabel label="Foo" status="critical" />);
  expect(container).toMatchSnapshot();
});

it("renders an informative StatusLabel", () => {
  const { container } = render(
    <StatusLabel label="Foo" status="informative" />,
  );
  expect(container).toMatchSnapshot();
});

it("renders an end-aligned StatusLabel", () => {
  const { container } = render(
    <StatusLabel label="Foo" status="informative" alignment="end" />,
  );
  expect(container).toMatchSnapshot();
});
