import { render } from "@testing-library/react";
import React from "react";
import { Emphasis } from ".";

it("renders a bold text", () => {
  const { container } = render(<Emphasis variation="bold">Save $240</Emphasis>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <b
        class="base bold"
      >
        Save $240
      </b>
    </div>
  `);
});

it("renders an italic text", () => {
  const { container } = render(
    <Emphasis variation="italic">Job note linked to related invoice</Emphasis>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <em
        class="base regular italic"
      >
        Job note linked to related invoice
      </em>
    </div>
  `);
});

it("renders a highlighted text", () => {
  const { container } = render(
    <Emphasis variation="highlight">Highlight me up</Emphasis>,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <strong
        class="base regular highlight"
      >
        Highlight me up
      </strong>
    </div>
  `);
});
