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
        class="track switch"
        role="switch"
        type="button"
      >
        <span
          class="icon"
        >
          <svg
            data-testid="cross"
            style="fill: var(--color-icon); display: inline-block; vertical-align: middle; width: 16px; height: 16px;"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 0 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 1 0-1.414-1.414L12 10.586Z"
              fill="var(--color-inactive--onSurface)"
            />
          </svg>
        </span>
        <span
          class="toggle"
        />
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
        class="track switch isChecked"
        role="switch"
        type="button"
      >
        <span
          class="icon"
        >
          <svg
            data-testid="checkmark"
            style="fill: var(--color-icon); display: inline-block; vertical-align: middle; width: 16px; height: 16px;"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.703 12.029a1 1 0 1 0-1.414 1.414l4.699 5.293a1 1 0 0 0 1.414 0L20.695 7.443a1 1 0 1 0-1.414-1.414L8.695 16.615l-3.992-4.586Z"
              style="fill: var(--color-surface);"
            />
          </svg>
        </span>
        <span
          class="toggle"
        />
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
    <Switch ariaLabel="Can't touch this" disabled={true} />
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <button
        aria-checked="false"
        aria-label="Can't touch this"
        class="track switch disabled"
        disabled=""
        role="switch"
        type="button"
      >
        <span
          class="icon"
        >
          <svg
            data-testid="cross"
            style="fill: var(--color-icon); display: inline-block; vertical-align: middle; width: 16px; height: 16px;"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 0 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 1 0-1.414-1.414L12 10.586Z"
              fill="var(--color-disabled)"
            />
          </svg>
        </span>
        <span
          class="toggle"
        />
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
    <Switch ariaLabel="Can't touch this" value={true} disabled={true} />
  );
  const element = getByRole("switch");

  await userEvent.click(element);
  expect(element).toHaveAttribute("aria-checked", "true");
});
