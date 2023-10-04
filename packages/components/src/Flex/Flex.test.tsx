import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Flex } from ".";

afterEach(cleanup);

it("uses a flex layout with default settings", () => {
  const { container } = render(
    <Flex>
      <h1>Foo</h1>
      <p>Bar</p>
    </Flex>,
  );

  const flex = container.firstChild;
  expect(flex).toHaveClass("flex");
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

it("uses flexbox and column if direction is set to column", () => {
  const { container } = render(
    <Flex direction="column">
      <h1>Foo</h1>
      <p>Bar</p>
    </Flex>,
  );

  const flex = container.firstChild;
  expect(flex).toHaveClass("flex column");
});

it("uses grid and sets the template columns if direction is row and a template is provided", () => {
  const { container } = render(
    <Flex template={["grow", "shrink"]}>
      <h1>Foo</h1>
      <p>Bar</p>
    </Flex>,
  );

  const flex = container.firstChild;
  expect(flex).toHaveClass("grid");
  expect(flex).toHaveStyle({
    gridTemplateColumns: "1fr max-content",
  });
});

it("uses grid and sets the template rows if direction is column and a template is provided", () => {
  const { container } = render(
    <Flex direction="column" template={["grow", "shrink"]}>
      <h1>Foo</h1>
      <p>Bar</p>
    </Flex>,
  );

  const flex = container.firstChild;
  expect(flex).toHaveClass("grid");
  expect(flex).toHaveStyle({
    gridTemplateRows: "1fr max-content",
  });
});

it("sets the gap between children", () => {
  const { container } = render(
    <Flex gap="small">
      <h1>Foo</h1>
      <p>Bar</p>
    </Flex>,
  );

  const flex = container.firstChild;
  expect(flex).toHaveClass("smallGap");
});

it("sets the alignment of children", () => {
  const { container } = render(
    <Flex align="end">
      <h1>Foo</h1>
      <p>Bar</p>
    </Flex>,
  );

  const flex = container.firstChild;
  expect(flex).toHaveClass("endAlign");
});

it("warns if the template length does not match the number of children", () => {
  const spy = jest.spyOn(console, "warn").mockImplementation(jest.fn());

  render(
    <Flex template={["grow", "shrink"]}>
      <h1>Foo</h1>
    </Flex>,
  );

  expect(spy).toHaveBeenCalledWith(
    "Flex template length does not match children count, this may cause unexpected results.",
  );
});
