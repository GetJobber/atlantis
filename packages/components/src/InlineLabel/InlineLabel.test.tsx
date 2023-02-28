import { render } from "@testing-library/react";
import React from "react";
import { InlineLabel } from ".";

it("renders correctly", () => {
  const { container } = render(<InlineLabel>My Label</InlineLabel>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <span
        class="inlineLabel base greyBlue"
      >
        <span
          class="base regular small"
        >
          My Label
        </span>
      </span>
    </div>
  `);
});
