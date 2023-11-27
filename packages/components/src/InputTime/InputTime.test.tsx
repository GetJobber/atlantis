import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { CivilTime } from "@std-proposal/temporal";
import { InputTime } from ".";

it("renders a InputTime", () => {
  const { container } = render(<InputTime />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="container"
      >
        <div
          class="wrapper"
        >
          <div
            class="inputWrapper"
          >
            <div
              class="childrenWrapper"
            >
              <input
                class="input"
                id="123e4567-e89b-12d3-a456-426655440001"
                type="time"
                value=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
});

it("renders an initial time when given 'defaultValue'", () => {
  const { container } = render(
    <InputTime defaultValue={new CivilTime(11, 23)} />,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="container"
      >
        <div
          class="wrapper"
        >
          <div
            class="inputWrapper"
          >
            <div
              class="childrenWrapper"
            >
              <input
                class="input"
                id="123e4567-e89b-12d3-a456-426655440007"
                type="time"
                value="11:23"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
});

it("renders correctly in a readonly state", () => {
  const { container } = render(
    <InputTime value={new CivilTime(11, 23)} readonly={true} />,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="container"
      >
        <div
          class="wrapper"
        >
          <div
            class="inputWrapper"
          >
            <div
              class="childrenWrapper"
            >
              <input
                class="input"
                id="123e4567-e89b-12d3-a456-426655440009"
                readonly=""
                type="time"
                value="11:23"
              />
            </div>
          </div>
          <div
            class="affixIcon suffix hasAction"
          >
            <button
              aria-label="clear undefined"
              class="button base onlyIcon subtle tertiary"
              type="button"
            >
              <svg
                class="Z6OfUI2sH34- TphtDHcwxDc-"
                data-testid="remove"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class=""
                  d="M12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 0 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 1 0-1.414-1.414L12 10.586Z"
                />
              </svg>
              <span
                class="base extraBold base base"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  `);
});

it("adds a error border when invalid", () => {
  const { container } = render(
    <InputTime value={new CivilTime(11, 23)} readonly={true} />,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="container"
      >
        <div
          class="wrapper"
        >
          <div
            class="inputWrapper"
          >
            <div
              class="childrenWrapper"
            >
              <input
                class="input"
                id="123e4567-e89b-12d3-a456-426655440015"
                readonly=""
                type="time"
                value="11:23"
              />
            </div>
          </div>
          <div
            class="affixIcon suffix hasAction"
          >
            <button
              aria-label="clear undefined"
              class="button base onlyIcon subtle tertiary"
              type="button"
            >
              <svg
                class="Z6OfUI2sH34- TphtDHcwxDc-"
                data-testid="remove"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class=""
                  d="M12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 0 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 1 0-1.414-1.414L12 10.586Z"
                />
              </svg>
              <span
                class="base extraBold base base"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  `);
});

it("should set the value when given 'value' and 'onChange'", () => {
  const { container } = render(<InputTime invalid />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="container"
      >
        <div
          class="wrapper invalid"
        >
          <div
            class="inputWrapper"
          >
            <div
              class="childrenWrapper"
            >
              <input
                class="input"
                id="123e4567-e89b-12d3-a456-426655440021"
                type="time"
                value=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
});

it("should call the onChange function when the component is modified", () => {
  const newValue = "05:32";
  // The event value get converted to a CivilTime inside the component.
  const newCivilTime = new CivilTime(5, 32);

  const changeHandler = jest.fn();

  const { container } = render(
    <InputTime value={new CivilTime(2, 35)} onChange={changeHandler} />,
  );

  fireEvent.change(container.querySelector("input"), {
    target: { value: newValue },
  });

  expect(changeHandler).toHaveBeenCalledWith(newCivilTime);
});
