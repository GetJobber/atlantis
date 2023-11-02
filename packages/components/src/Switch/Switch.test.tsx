import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from ".";

it("renders a Switch", () => {
  const { container } = render(<Switch ariaLabel="Toggle me" />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <button
        aria-checked="false"
        aria-label="Toggle me"
        class="track"
        role="switch"
        type="button"
      >
        <span
          class="label"
        >
          <span
            class="base bold small uppercase white"
          >
            On
          </span>
        </span>
        <span
          class="pip"
        />
        <span
          class="label"
        >
          <span
            class="base bold small uppercase greyBlue"
          >
            Off
          </span>
        </span>
      </button>
      <input
        type="hidden"
        value="false"
      />
    </div>
  `);
});

it("renders a Switch that is turned ON", () => {
  const { container } = render(<Switch ariaLabel="Toggle me" value={true} />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <button
        aria-checked="true"
        aria-label="Toggle me"
        class="track isChecked"
        role="switch"
        type="button"
      >
        <span
          class="label"
        >
          <span
            class="base bold small uppercase white"
          >
            On
          </span>
        </span>
        <span
          class="pip"
        />
        <span
          class="label"
        >
          <span
            class="base bold small uppercase greyBlue"
          >
            Off
          </span>
        </span>
      </button>
      <input
        type="hidden"
        value="true"
      />
    </div>
  `);
});

it("renders a disabled Switch", () => {
  const { container } = render(
    <Switch ariaLabel="Can't touch this" disabled={true} />,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <button
        aria-checked="false"
        aria-label="Can't touch this"
        class="track disabled"
        disabled=""
        role="switch"
        type="button"
      >
        <span
          class="label"
        >
          <span
            class="base bold small uppercase grey"
          >
            On
          </span>
        </span>
        <span
          class="pip"
        />
        <span
          class="label"
        >
          <span
            class="base bold small uppercase grey"
          >
            Off
          </span>
        </span>
      </button>
      <input
        type="hidden"
        value="false"
      />
    </div>
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
