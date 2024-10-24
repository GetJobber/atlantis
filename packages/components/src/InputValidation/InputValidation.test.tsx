import { render } from "@testing-library/react";
import React from "react";
import { InputValidation } from ".";

it("renders the input validation messages", () => {
  const { container } = render(<InputValidation message="I am an error" />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        style="opacity: 0; transform: translateY(5%) translateZ(0);"
      >
        <div
          aria-live="assertive"
          class="message"
          role="alert"
          tabindex="0"
        >
          <svg
            data-testid="alert"
            style="fill: var(--color-icon); display: inline-block; vertical-align: middle; width: 16px; height: 16px;"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 7a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1Zm-1 10a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
              style="fill: var(--color-critical);"
            />
            <path
              d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0Z"
              style="fill: var(--color-critical);"
            />
          </svg>
          <p
            class="base regular small critical"
          >
            I am an error
          </p>
        </div>
      </div>
    </div>
  `);
});
