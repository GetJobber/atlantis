import React from "react";
import { render } from "@testing-library/react";
import { InputValidation } from ".";

it("renders the input validation messages", () => {
  const { container } = render(<InputValidation message="I am an error" />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="hasValidationMessage"
      >
        <div
          style="height: 0px; opacity: 0; transform: none;"
        >
          <div
            aria-live="assertive"
            class="message"
            role="alert"
            tabindex="0"
          >
            <p
              class="base regular base critical"
            >
              I am an error
            </p>
          </div>
        </div>
      </div>
    </div>
  `);
});
