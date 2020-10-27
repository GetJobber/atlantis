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
