import React from "react";
import renderer from "react-test-renderer";
import { InputValidation } from ".";

it("renders the input validation messages", () => {
  const tree = renderer
    .create(
      <InputValidation
        messages={[
          {
            message: "I'm a success message",
            status: "success",
          },
          {
            message: "I'm an error message",
            status: "error",
          },
          {
            message: "I'm a warning message",
            status: "warn",
          },
          {
            message: "I'm an info message",
            status: "info",
          },
          {
            shouldShow: true,
            message: "I'm shown",
            status: "success",
          },
          {
            shouldShow: false,
            message: "I ain't",
            status: "error",
          },
          {
            shouldShow: true,
            message: "A am too!",
            status: "warn",
          },
        ]}
      />,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="hasValidationMessage"
    >
      <div
        style={
          Object {
            "height": "100%",
            "opacity": 1,
            "transform": "none",
          }
        }
      >
        <p
          className="base regular base green"
        >
          I'm a success message
        </p>
      </div>
      <div
        style={
          Object {
            "height": "100%",
            "opacity": 1,
            "transform": "none",
          }
        }
      >
        <p
          className="base regular base red"
        >
          I'm an error message
        </p>
      </div>
      <div
        style={
          Object {
            "height": "100%",
            "opacity": 1,
            "transform": "none",
          }
        }
      >
        <p
          className="base regular base yellowDark"
        >
          I'm a warning message
        </p>
      </div>
      <div
        style={
          Object {
            "height": "100%",
            "opacity": 1,
            "transform": "none",
          }
        }
      >
        <p
          className="base regular base lightBlue"
        >
          I'm an info message
        </p>
      </div>
      <div
        style={
          Object {
            "height": "100%",
            "opacity": 1,
            "transform": "none",
          }
        }
      >
        <p
          className="base regular base green"
        >
          I'm shown
        </p>
      </div>
      <div
        style={
          Object {
            "height": "100%",
            "opacity": 1,
            "transform": "none",
          }
        }
      >
        <p
          className="base regular base yellowDark"
        >
          A am too!
        </p>
      </div>
    </div>
  `);
});
