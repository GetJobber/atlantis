import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Flex } from ".";

afterEach(cleanup);

it("renders a Flex with default settings", () => {
  const { container } = render(
    <Flex>
      <div>Foo</div>
    </Flex>,
  );
  expect(container).toMatchSnapshot();
  const flex = container.firstChild;
  expect(flex).toHaveClass("none");
});

it("renders with a semantic tag when a valid type is set", () => {
  const { queryByRole } = render(
    <Flex type="article">
      <h2>My Article</h2>
      <p>Wow, what an article!</p>
    </Flex>,
  );
  const article = queryByRole("article");

  expect(article).toBeInTheDocument();
});

it("renders with a custom width and height", () => {
  const { container } = render(
    <Flex width="100%" height="100%">
      <div>Foo</div>
    </Flex>,
  );

  expect(container.firstChild).toHaveStyle("width: 100%");
  expect(container.firstChild).toHaveStyle("height: 100%");
});

it("renders with a testId", () => {
  const { getByTestId } = render(
    <Flex testId="flexContainer" width="100%" height="100%">
      <div>Foo</div>
    </Flex>,
  );

  expect(getByTestId("flexContainer")).toBeInTheDocument();
});

it("renders with an ID", () => {
  const { container } = render(
    <Flex id="flexContainer" width="100%" height="100%">
      <div>Foo</div>
    </Flex>,
  );

  expect(container.firstChild).toHaveAttribute("id", "flexContainer");
});

it("renders with a row gap and column gap", () => {
  const { container } = render(
    <Flex rowGap="large" columnGap="base">
      <div>Foo</div>
    </Flex>,
  );

  expect(container.firstChild).toHaveClass("rowGapLarge");
  expect(container.firstChild).toHaveClass("columnGapBase");
});

it("supports customizing the flow and direction of the container", () => {
  const { container } = render(
    <Flex direction="column" align="center" justify="start" wrap reverse>
      <div>Foo</div>
    </Flex>,
  );

  expect(container.firstChild).toHaveClass("reverse");
  expect(container.firstChild).toHaveClass("column");
  expect(container.firstChild).toHaveClass("wrap");
  expect(container.firstChild).toHaveClass("center");
  expect(container.firstChild).toHaveClass("start");
});
