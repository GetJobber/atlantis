import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Flex } from ".";

afterEach(cleanup);

it("renders the flexible container", () => {
  const { container } = render(
    <Flex template={["grow", "shrink"]}>
      <h1>Foo</h1>
      <p>Bar</p>
    </Flex>,
  );

  const flex = container.firstChild;
  expect(flex).toHaveClass("flexible");
});

it("sets the template columns if direction is row", () => {
  const { container } = render(
    <Flex template={["grow", "shrink"]}>
      <h1>Foo</h1>
      <p>Bar</p>
    </Flex>,
  );

  const flex = container.firstChild;
  expect(flex).toHaveStyle({
    gridTemplateColumns: "1fr max-content",
  });
});

it("sets the template rows if direction is column", () => {
  const { container } = render(
    <Flex direction="column" template={["grow", "shrink"]}>
      <h1>Foo</h1>
      <p>Bar</p>
    </Flex>,
  );

  const flex = container.firstChild;
  expect(flex).toHaveStyle({
    gridTemplateRows: "1fr max-content",
  });
});

it("sets the gap between children", () => {
  const { container } = render(
    <Flex template={["grow", "shrink"]} gap="small">
      <h1>Foo</h1>
      <p>Bar</p>
    </Flex>,
  );

  const flex = container.firstChild;
  expect(flex).toHaveClass("smallGap");
});

it("sets the alignment of children", () => {
  const { container } = render(
    <Flex template={["grow", "shrink"]} align="end">
      <h1>Foo</h1>
      <p>Bar</p>
    </Flex>,
  );

  const flex = container.firstChild;
  expect(flex).toHaveClass("endAlign");
});
