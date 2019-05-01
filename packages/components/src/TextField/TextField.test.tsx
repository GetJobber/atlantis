import React from "react";
import { TextField } from "./TextField";
import renderer from "react-test-renderer";

it("renders correctly with no props", () => {
  const tree = renderer.create(<TextField />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="inputWrapper normal"
    >
      <label
        className="label"
      >
        <input
          className="input"
          disabled={false}
          type="text"
        />
      </label>
    </div>
  `);
});

it("renders correctly with a placeholder", () => {
  const tree = renderer
    .create(<TextField placeholder="My placeholder" />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="inputWrapper normal"
    >
      <label
        className="label"
      >
        <input
          className="input"
          disabled={false}
          placeholder="My placeholder"
          type="text"
        />
        <span
          className="labelContent"
        >
          My placeholder
        </span>
      </label>
    </div>
  `);
});

it("renders correctly as small", () => {
  const tree = renderer.create(<TextField size="small" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="inputWrapper small"
    >
      <label
        className="label"
      >
        <input
          className="input"
          disabled={false}
          type="text"
        />
      </label>
    </div>
  `);
});

it("renders correctly as large", () => {
  const tree = renderer.create(<TextField size="large" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="inputWrapper large"
    >
      <label
        className="label"
      >
        <input
          className="input"
          disabled={false}
          type="text"
        />
      </label>
    </div>
  `);
});

it("renders correctly in a disabled state", () => {
  const tree = renderer.create(<TextField disabled />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="inputWrapper normal"
    >
      <label
        className="label"
      >
        <input
          className="input"
          disabled={true}
          type="text"
        />
      </label>
    </div>
  `);
});
