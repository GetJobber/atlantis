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
            class="Z6OfUI2sH34- qm8vYTlCGG4-"
            data-testid="alert"
            viewBox="0 0 720 720"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="avM4gudjYeg-"
              d="M360.352 208.094c-16.585 0-30.030 13.445-30.030 30.030v150.147c0 16.585 13.444 30.030 30.030 30.030s30.030-13.444 30.030-30.030v-150.147c0-16.585-13.444-30.030-30.030-30.030zM330.322 508.387c0-16.585 13.444-30.030 30.030-30.030s30.030 13.444 30.030 30.030c0 16.585-13.444 30.030-30.030 30.030s-30.030-13.444-30.030-30.030zM660.646 358.241c0-165.848-134.447-300.293-300.293-300.293-165.847 0-300.293 134.446-300.293 300.293 0 165.845 134.446 300.293 300.293 300.293 165.845 0 300.293-134.447 300.293-300.293zM600.586 358.241c0 132.678-107.556 240.235-240.235 240.235s-240.235-107.556-240.235-240.235c0-132.678 107.556-240.235 240.235-240.235s240.235 107.556 240.235 240.235z"
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
