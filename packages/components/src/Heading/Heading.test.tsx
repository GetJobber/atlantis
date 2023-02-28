import { render } from "@testing-library/react";
import React from "react";
import { Heading } from ".";

it("renders a Heading 1", () => {
  const { container } = render(<Heading level={1}>Dis be a Heading 1</Heading>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <h1
        class="base black jumbo heading"
      >
        Dis be a Heading 1
      </h1>
    </div>
  `);
});

it("renders a Heading 2", () => {
  const { container } = render(<Heading level={2}>Dis be a Heading 2</Heading>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <h2
        class="base black largest heading"
      >
        Dis be a Heading 2
      </h2>
    </div>
  `);
});

it("renders a Heading 3", () => {
  const { container } = render(<Heading level={3}>Dis be a Heading 3</Heading>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <h3
        class="base extraBold larger heading"
      >
        Dis be a Heading 3
      </h3>
    </div>
  `);
});

it("renders a Heading 4", () => {
  const { container } = render(<Heading level={4}>Dis be a Heading 4</Heading>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <h4
        class="base bold large heading"
      >
        Dis be a Heading 4
      </h4>
    </div>
  `);
});

it("renders a Heading 5", () => {
  const { container } = render(<Heading level={5}>Dis be a Heading 5</Heading>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <h5
        class="base bold base heading"
      >
        Dis be a Heading 5
      </h5>
    </div>
  `);
});
