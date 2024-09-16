import { render } from "@testing-library/react";
import React from "react";
import { Text } from ".";

it("renders a paragraph", () => {
  const { container } = render(
    <Text>
      Ask the information you need upfront from clients and new leads
    </Text>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="base regular base text"
      >
        Ask the information you need upfront from clients and new leads
      </p>
    </div>
  `);
});

it("renders a subdued text", () => {
  const { container } = render(
    <Text variation="subdued">Job note linked to related invoice</Text>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="base regular base textSecondary"
      >
        Job note linked to related invoice
      </p>
    </div>
  `);
});

it("renders a success text", () => {
  const { container } = render(<Text variation="success">Invoice sent</Text>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="base regular base success"
      >
        Invoice sent
      </p>
    </div>
  `);
});

it("renders a error text", () => {
  const { container } = render(<Text variation="error">Name is required</Text>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="base regular base critical"
      >
        Name is required
      </p>
    </div>
  `);
});

it("renders a warning text", () => {
  const { container } = render(
    <Text variation="warn">Your message is over 160 characters</Text>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="base regular base warning"
      >
        Your message is over 160 characters
      </p>
    </div>
  `);
});

it("renders a info text", () => {
  const { container } = render(
    <Text variation="info">
      Drag to rearrange the order that fields show up in Jobber
    </Text>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="base regular base informative"
      >
        Drag to rearrange the order that fields show up in Jobber
      </p>
    </div>
  `);
});

it("renders a large text", () => {
  const { container } = render(
    <Text size="large">
      Attract new customers by asking happy clients for a Facebook
      recommendation
    </Text>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="base regular large text"
      >
        Attract new customers by asking happy clients for a Facebook recommendation
      </p>
    </div>
  `);
});

it("renders a small text", () => {
  const { container } = render(<Text size="small">Teeny tiny text</Text>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="base regular small text"
      >
        Teeny tiny text
      </p>
    </div>
  `);
});

it("renders a end-aligned text", () => {
  const { container } = render(<Text align="end">End align me</Text>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="base regular base text end"
      >
        End align me
      </p>
    </div>
  `);
});

it("renders a center-aligned text", () => {
  const { container } = render(<Text align="center">Center align me</Text>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <p
        class="base regular base text center"
      >
        Center align me
      </p>
    </div>
  `);
});
