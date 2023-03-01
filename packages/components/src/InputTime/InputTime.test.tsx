import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { CivilTime } from "@std-proposal/temporal";
import { InputTime } from ".";

afterEach(cleanup);

it("renders a InputTime", () => {
  const { container } = render(<InputTime />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="wrapper"
      >
        <div
          class="inputWrapper"
        >
          <label
            class="label"
            for="123e4567-e89b-12d3-a456-426655440001"
          />
          <input
            class="input"
            id="123e4567-e89b-12d3-a456-426655440001"
            type="time"
            value=""
          />
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
        class="wrapper"
      >
        <div
          class="inputWrapper"
        >
          <label
            class="label"
            for="123e4567-e89b-12d3-a456-426655440007"
          />
          <input
            class="input"
            id="123e4567-e89b-12d3-a456-426655440007"
            type="time"
            value="11:23"
          />
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
        class="wrapper"
      >
        <div
          class="inputWrapper"
        >
          <label
            class="label"
            for="123e4567-e89b-12d3-a456-426655440009"
          />
          <input
            class="input"
            id="123e4567-e89b-12d3-a456-426655440009"
            readonly=""
            type="time"
            value="11:23"
          />
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
        class="wrapper"
      >
        <div
          class="inputWrapper"
        >
          <label
            class="label"
            for="123e4567-e89b-12d3-a456-426655440015"
          />
          <input
            class="input"
            id="123e4567-e89b-12d3-a456-426655440015"
            readonly=""
            type="time"
            value="11:23"
          />
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
        class="wrapper invalid"
      >
        <div
          class="inputWrapper"
        >
          <label
            class="label"
            for="123e4567-e89b-12d3-a456-426655440021"
          />
          <input
            class="input"
            id="123e4567-e89b-12d3-a456-426655440021"
            type="time"
            value=""
          />
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
