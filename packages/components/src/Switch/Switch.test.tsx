import React from "react";
import renderer from "react-test-renderer";
import { Switch } from ".";

it("renders a Switch", () => {
  const tree = renderer.create(<Switch ariaLabel="Toggle me" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <button
      aria-checked={false}
      className="container"
      onClick={[Function]}
      role="switch"
      type="button"
    >
      <div
        className="track"
      >
        <input
          type="hidden"
          value={false}
        />
        <div
          className="label"
        >
          <p
            className="base small bold uppercase white"
          >
            On
          </p>
        </div>
        <span
          className="pip"
        />
        <div
          className="label"
        >
          <p
            className="base small bold uppercase greyBlue"
          >
            Off
          </p>
        </div>
      </div>
    </button>
  `);
});

it("renders a Switch that is turned ON", () => {
  const tree = renderer
    .create(<Switch ariaLabel="Toggle me" value={true} />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <button
      aria-checked={true}
      className="container isChecked"
      onClick={[Function]}
      role="switch"
      type="button"
    >
      <div
        className="track"
      >
        <input
          type="hidden"
          value={true}
        />
        <div
          className="label"
        >
          <p
            className="base small bold uppercase white"
          >
            On
          </p>
        </div>
        <span
          className="pip"
        />
        <div
          className="label"
        >
          <p
            className="base small bold uppercase greyBlue"
          >
            Off
          </p>
        </div>
      </div>
    </button>
  `);
});
