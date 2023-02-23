import React from "react";
import renderer from "react-test-renderer";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from ".";

afterEach(cleanup);

it("renders a Switch", () => {
  const tree = renderer.create(<Switch ariaLabel="Toggle me" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    Array [
      <button
        aria-checked={false}
        aria-label="Toggle me"
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
              className="base bold small uppercase white"
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
              className="base bold small uppercase greyBlue"
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
        aria-label="Toggle me"
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
              className="base bold small uppercase white"
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
              className="base bold small uppercase greyBlue"
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

it("renders a disabled Switch", () => {
  const tree = renderer
    .create(<Switch ariaLabel="Can't touch this" disabled={true} />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    Array [
      <button
        aria-checked={false}
        aria-label="Can't touch this"
        className="track disabled"
        disabled={true}
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
              className="base bold small uppercase grey"
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
              className="base bold small uppercase grey"
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

test("it should change the input value on click", async () => {
  const { getByRole } = render(<Switch ariaLabel="Toggle me" />);
  const element = getByRole("switch");

  await userEvent.click(element);
  expect(element).toHaveAttribute("aria-checked", "true");

  await userEvent.click(element);
  expect(element).toHaveAttribute("aria-checked", "false");
});

test("it should not change the input value on click", async () => {
  const { getByRole } = render(
    <Switch ariaLabel="Can't touch this" value={true} disabled={true} />,
  );
  const element = getByRole("switch");

  await userEvent.click(element);
  expect(element).toHaveAttribute("aria-checked", "true");
});
