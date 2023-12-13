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
          data-testid="Form-Field-Wrapper"
        >
          <div
            class="inputWrapper"
          >
            <div
              class="childrenWrapper"
            >
              <input
                class="input"
                id=":r0:"
                placeholder="hh:mm"
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
          data-testid="Form-Field-Wrapper"
        >
          <div
            class="inputWrapper"
          >
            <div
              class="childrenWrapper"
            >
              <input
                class="input"
                id=":r2:"
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
          data-testid="Form-Field-Wrapper"
        >
          <div
            class="inputWrapper"
          >
            <div
              class="childrenWrapper"
            >
              <input
                class="input"
                id=":r4:"
                readonly=""
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
          data-testid="Form-Field-Wrapper"
        >
          <div
            class="inputWrapper"
          >
            <div
              class="childrenWrapper"
            >
              <input
                class="input"
                id=":r6:"
                readonly=""
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

it("should set the value when given 'value' and 'onChange'", () => {
  const { container } = render(<InputTime invalid />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="container"
      >
        <div
          class="wrapper invalid"
          data-testid="Form-Field-Wrapper"
        >
          <div
            class="inputWrapper"
          >
            <div
              class="childrenWrapper"
            >
              <input
                class="input"
                id=":r8:"
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
