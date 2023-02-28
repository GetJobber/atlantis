import { render } from "@testing-library/react";
import React from "react";
import { InputValidation } from ".";

it("renders the input validation messages", () => {
  const { container } = render(<InputValidation message="I am an error" />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        style="height: 0px; opacity: 0; transform: none;"
      >
        <div
          aria-live="assertive"
          class="message"
          role="alert"
          tabindex="0"
        >
          <svg
            class="ZDlJU6tECg7ouG-b27gya _isfJqqskSRqop8TStvGA"
            data-testid="alert"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="_3_XuN5pkvTDnwUYEFefKiC"
              d="M512.5 295.956c-23.588 0-42.709 19.122-42.709 42.709v213.542c0 23.588 19.121 42.709 42.709 42.709s42.709-19.121 42.709-42.709v-213.542c0-23.587-19.121-42.709-42.709-42.709zM469.792 723.039c0-23.588 19.121-42.709 42.709-42.709s42.709 19.121 42.709 42.709c0 23.588-19.121 42.709-42.709 42.709s-42.709-19.121-42.709-42.709zM939.585 509.498c0-235.872-191.214-427.084-427.084-427.084-235.872 0-427.084 191.212-427.084 427.084 0 235.869 191.212 427.084 427.084 427.084 235.869 0 427.084-191.214 427.084-427.084zM854.167 509.498c0 188.698-152.968 341.667-341.667 341.667s-341.667-152.968-341.667-341.667c0-188.697 152.969-341.667 341.667-341.667s341.667 152.969 341.667 341.667z"
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
