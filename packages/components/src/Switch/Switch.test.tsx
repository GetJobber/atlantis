import React from "react";
import renderer from "react-test-renderer";
import { Switch } from ".";

it("renders a Switch", () => {
  const tree = renderer.create(<Switch ariaLabel="Toggle me" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    Array [
      <button
        aria-checked={false}
        className="track"
        onClick={[Function]}
        role="switch"
        type="button"
      >
        <span
          className="toggle"
        >
          <span
            className="label"
          >
            <span
              className="base small bold uppercase white"
            >
              On
            </span>
          </span>
          <span
            className="pip"
          />
          <span
            className="label"
          >
            <span
              className="base small bold uppercase greyBlue"
            >
              Off
            </span>
          </span>
        </span>
      </button>,
      <input
        type="hidden"
        value="false"
      />,
    ]
  `);
});

it("renders a Switch that is turned ON", () => {
  const tree = renderer
    .create(<Switch ariaLabel="Toggle me" value={true} />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    Array [
      <button
        aria-checked={true}
        className="track isChecked"
        onClick={[Function]}
        role="switch"
        type="button"
      >
        <span
          className="toggle"
        >
          <span
            className="label"
          >
            <span
              className="base small bold uppercase white"
            >
              On
            </span>
          </span>
          <span
            className="pip"
          />
          <span
            className="label"
          >
            <span
              className="base small bold uppercase greyBlue"
            >
              Off
            </span>
          </span>
        </span>
      </button>,
      <input
        type="hidden"
        value="true"
      />,
    ]
  `);
});
