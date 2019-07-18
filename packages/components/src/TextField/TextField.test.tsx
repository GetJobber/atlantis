import React from "react";
import renderer from "react-test-renderer";
import { TextField } from ".";

it("renders a regular input for text and numbers", () => {
  const tree = renderer
    .create(<TextField placeholder="Favourite colour" />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
        <div
          className="wrapper"
          style={Object {}}
        >
          <label
            className="label"
          >
            Favourite colour
          </label>
          <input
            className="formField"
            disabled={false}
            onChange={[Function]}
            readOnly={false}
            type="text"
          />
        </div>
    `);
});

it("renders a textarea", () => {
  const tree = renderer
    .create(
      <TextField placeholder="Describe your favourite colour?" multiline />,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
        <div
          className="wrapper"
          style={Object {}}
        >
          <label
            className="label"
          >
            Describe your favourite colour?
          </label>
          <textarea
            className="formField"
            disabled={false}
            onChange={[Function]}
            readOnly={false}
          />
        </div>
    `);
});

it("renders a number input field", () => {
  const tree = renderer
    .create(<TextField type="number" placeholder="Your phone" />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="wrapper"
      style={Object {}}
    >
      <label
        className="label"
      >
        Your phone
      </label>
      <input
        className="formField"
        disabled={false}
        onChange={[Function]}
        readOnly={false}
        type="number"
      />
    </div>
  `);
});
