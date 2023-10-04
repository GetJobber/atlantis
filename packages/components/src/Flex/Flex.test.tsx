import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Flex } from ".";

afterEach(cleanup);

it("renders a Flex with default settings", () => {
  const { container } = render(
    <Flex>
      <h1>Foo</h1>
      <p>Bar</p>
    </Flex>,
  );

  const flex = container.firstChild;
  expect(flex).toHaveClass("flex");
});

it("renders a Flex column if direction is set to column", () => {
  const { container } = render(
    <Flex direction="column">
      <h1>Foo</h1>
      <p>Bar</p>
    </Flex>,
  );

  const flex = container.firstChild;
  expect(flex).toHaveClass("flex column");
});

it("uses a grid layout if a template is set", () => {
  const { container } = render(
    <Flex template={["grow", "shrink"]}>
      <h1>Foo</h1>
      <p>Bar</p>
    </Flex>,
  );

  const flex = container.firstChild;
  expect(flex).toHaveClass("grid");
});
