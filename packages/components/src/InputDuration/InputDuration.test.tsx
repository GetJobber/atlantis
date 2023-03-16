import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { InputDuration } from ".";

afterEach(cleanup);

it("renders a InputDuration", () => {
  const { container } = render(<InputDuration onChange={jest.fn()} />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        style="position: relative;"
      >
        <div
          class="wrapper"
        >
          <div
            class="inputWrapper"
          >
            <label
              class="label"
              for="123e4567-e89b-12d3-a456-426655440001"
            >
              Duration
            </label>
            <input
              class="input"
              id="123e4567-e89b-12d3-a456-426655440001"
              type="text"
              value=""
            />
          </div>
        </div>
        <div
          aria-hidden="true"
          style="position: absolute; top: 14px; font-size: 16px; left: 17px; z-index: 2; pointer-events: none;"
        >
          <span
            style="opacity: 0;"
          />
        </div>
      </div>
    </div>
  `);
});

it("renders an initial time when given 'defaultValue'", () => {
  const { container } = render(
    <InputDuration defaultValue={"10:55"} onChange={jest.fn()} />,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        style="position: relative;"
      >
        <div
          class="wrapper miniLabel"
        >
          <div
            class="inputWrapper"
          >
            <label
              class="label"
              for="123e4567-e89b-12d3-a456-426655440003"
            >
              Duration
            </label>
            <input
              class="input"
              id="123e4567-e89b-12d3-a456-426655440003"
              type="text"
              value="10:55"
            />
          </div>
        </div>
        <div
          aria-hidden="true"
          style="position: absolute; top: 14px; font-size: 16px; left: 17px; z-index: 2; pointer-events: none;"
        >
          <span
            style="opacity: 0;"
          >
            10:55
          </span>
        </div>
      </div>
    </div>
  `);
});

it("should call the onChange function when the component is modified", () => {
  const newValue = "05:32";

  const changeHandler = jest.fn();

  const { container } = render(<InputDuration onChange={changeHandler} />);

  const input = container.querySelector("input");

  expect(input).toBeDefined();

  input &&
    fireEvent.change(input, {
      target: { value: newValue },
    });

  expect(changeHandler).toHaveBeenCalledWith(newValue);
});
