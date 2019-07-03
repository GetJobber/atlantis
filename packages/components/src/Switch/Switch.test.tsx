import React from "react";
import renderer from "react-test-renderer";
import { Switch } from ".";

it("renders a Switch", () => {
  const tree = renderer.create(<Switch ariaLabel="Toggle me" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="container"
    >
      <button
        aria-checked={false}
        className="switch"
        onClick={[Function]}
        role="switch"
        type="button"
      >
        <span
          className="track"
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
      </button>
      <input
        type="hidden"
        value={false}
      />
    </div>
  `);
});

it("renders a Switch that is turned ON", () => {
  const tree = renderer
    .create(<Switch ariaLabel="Toggle me" value={true} />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="container isChecked"
    >
      <button
        aria-checked={true}
        className="switch"
        onClick={[Function]}
        role="switch"
        type="button"
      >
        <span
          className="track"
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
      </button>
      <input
        type="hidden"
        value={true}
      />
    </div>
  `);
});
