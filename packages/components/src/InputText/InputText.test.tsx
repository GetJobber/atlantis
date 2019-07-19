import React from "react";
import renderer from "react-test-renderer";
import { InputText } from ".";

it("renders a regular input for text and numbers", () => {
  const tree = renderer
    .create(<InputText placeholder="Favourite colour" />)
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
            onChange={[Function]}
            type="text"
          />
        </div>
    `);
});

it("renders a textarea", () => {
  const tree = renderer
    .create(
      <InputText placeholder="Describe your favourite colour?" multiline />,
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
            onChange={[Function]}
          />
        </div>
    `);
});

it("renders a textarea with 4 rows", () => {
  const tree = renderer
    .create(
      <InputText
        placeholder="Describe your favourite colour?"
        multiline
        rows={4}
      />,
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
        onChange={[Function]}
        rows={4}
      />
    </div>
  `);
});
