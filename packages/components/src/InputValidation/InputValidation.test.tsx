import React from "react";
import renderer from "react-test-renderer";
import { InputValidation } from ".";

it("renders the input validation messages", () => {
  const tree = renderer
    .create(<InputValidation message="I am an error" />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="hasValidationMessage"
    >
      <div
        style={
          Object {
            "height": "0px",
            "opacity": 0,
            "transform": "translateY(5%) translateZ(0)",
          }
        }
      >
        <div
          className="message"
        >
          <svg
            className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
            data-testid="alert"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="_3kicqC60DO19i9GJUdTy7F"
              d="M512 298.667c-23.565 0-42.667 19.103-42.667 42.667v213.333c0 23.565 19.102 42.667 42.667 42.667s42.667-19.102 42.667-42.667v-213.333c0-23.564-19.102-42.667-42.667-42.667z"
            />
            <path
              className="_3kicqC60DO19i9GJUdTy7F"
              d="M469.333 725.333c0-23.565 19.102-42.667 42.667-42.667s42.667 19.102 42.667 42.667c0 23.565-19.102 42.667-42.667 42.667s-42.667-19.102-42.667-42.667z"
            />
            <path
              className="_3kicqC60DO19i9GJUdTy7F"
              d="M938.667 512c0-235.642-191.027-426.667-426.667-426.667-235.642 0-426.667 191.025-426.667 426.667 0 235.639 191.025 426.667 426.667 426.667 235.639 0 426.667-191.027 426.667-426.667zM853.333 512c0 188.514-152.819 341.333-341.333 341.333s-341.333-152.819-341.333-341.333c0-188.513 152.82-341.333 341.333-341.333s341.333 152.82 341.333 341.333z"
            />
          </svg>
          <p
            className="base regular base red"
          >
            I am an error
          </p>
        </div>
      </div>
    </div>
  `);
});
