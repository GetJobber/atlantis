import React from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { InputNumber, InputNumberRef } from ".";

afterEach(cleanup);

it("renders an input type number", () => {
  const { container } = render(<InputNumber value={123} />);
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
                name="generatedName--123e4567-e89b-12d3-a456-426655440001"
                type="number"
                value="123"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
});

test("it should call the handler with a number value", () => {
  const changeHandler = jest.fn();
  const newValue = 100;
  const placeholder = "Count";

  const { getByLabelText } = render(
    <InputNumber
      onChange={changeHandler}
      placeholder={placeholder}
      name={placeholder}
    />,
  );

  fireEvent.change(getByLabelText(placeholder), {
    target: { value: newValue },
  });
  expect(changeHandler).toHaveBeenCalledWith(newValue);
});

test("it should call the validation with empty string as a success", () => {
  const validationHandler = jest.fn();

  render(
    <InputNumber
      value={100}
      min={99}
      max={100}
      onValidation={validationHandler}
      placeholder="Count to 100"
    />,
  );

  expect(validationHandler).toHaveBeenCalledWith("");
});

test("it should call the validation with a range error", async () => {
  const validationHandler = jest.fn();

  const { getByLabelText } = render(
    <InputNumber
      value={101}
      min={99}
      max={100}
      onValidation={validationHandler}
      placeholder="Count to 100"
    />,
  );

  const input = getByLabelText("Count to 100");
  input.focus();
  input.blur();

  await waitFor(() => {
    expect(validationHandler).toHaveBeenCalledWith(
      "Enter a number between 99 and 100",
    );
  });
});

test("it should call the validation with a max length error", async () => {
  const validationHandler = jest.fn();

  const { getByLabelText } = render(
    <InputNumber
      value={101}
      max={100}
      onValidation={validationHandler}
      placeholder="Count to 100"
    />,
  );

  const input = getByLabelText("Count to 100");
  input.focus();
  input.blur();

  await waitFor(() => {
    expect(validationHandler).toHaveBeenCalledWith(
      "Enter a number that is less than or equal to 100",
    );
  });
});

test("it should call the validation with a min length error", async () => {
  const validationHandler = jest.fn();

  const { getByLabelText } = render(
    <InputNumber
      value={98}
      min={99}
      onValidation={validationHandler}
      placeholder="Count to 100"
    />,
  );

  const input = getByLabelText("Count to 100");
  input.focus();
  input.blur();

  await waitFor(() => {
    expect(validationHandler).toHaveBeenCalledWith(
      "Enter a number that is greater than or equal to 99",
    );
  });
});

test("validation passes if number is correct", async () => {
  const validationHandler = jest.fn();

  const { getByLabelText } = render(
    <InputNumber
      value={98}
      min={99}
      onValidation={validationHandler}
      placeholder="Count to 100"
    />,
  );

  const input = getByLabelText("Count to 100");
  input.focus();
  input.blur();

  await waitFor(() => {
    expect(validationHandler).toHaveBeenCalledWith(
      "Enter a number that is greater than or equal to 99",
    );
  });

  fireEvent.change(input, { target: { value: 101 } });
  input.focus();
  input.blur();

  await waitFor(() => {
    expect(validationHandler).toHaveBeenCalledWith("");
  });
});

test("allows custom validation", async () => {
  const validationHandler = jest.fn();

  const { getByLabelText } = render(
    <InputNumber
      value={12}
      min={10}
      onValidation={validationHandler}
      placeholder="Count to 10"
      validations={{
        max: {
          value: 1,
          message: "only one number",
        },
      }}
    />,
  );

  const input = getByLabelText("Count to 10");

  input.focus();
  input.blur();

  await waitFor(() => {
    expect(validationHandler).toHaveBeenCalledWith("only one number");
  });
});

test("it should call the custom validate function if provided", async () => {
  const validationHandler = jest.fn();
  const expectedValidationValue = Math.floor(
    Math.random() * Number.MAX_SAFE_INTEGER,
  );
  const { getByLabelText } = render(
    <InputNumber
      value={expectedValidationValue}
      placeholder="Custom validation function"
      validations={{
        validate: validationHandler,
      }}
    />,
  );

  const input = getByLabelText("Custom validation function");

  input.focus();
  input.blur();

  await waitFor(() => {
    expect(validationHandler).toHaveBeenCalledWith(
      expectedValidationValue,
      expect.any(Object),
    );
    // Received: 12, {"generatedName--123e4567-e89b-12d3-a456-426655440063": 12}
  });
});

test("it should use the custom validate object if provided", async () => {
  const validationHandler = jest.fn();
  const validationHandler2 = jest.fn();
  const expectedValidationValue = Math.floor(
    Math.random() * Number.MAX_SAFE_INTEGER,
  );

  const { getByLabelText } = render(
    <InputNumber
      value={expectedValidationValue}
      placeholder="Custom validation function"
      validations={{
        validate: {
          validationHandler,
          validationHandler2,
        },
      }}
    />,
  );

  const input = getByLabelText("Custom validation function");

  input.focus();
  input.blur();

  await waitFor(() => {
    expect(validationHandler).toHaveBeenCalledWith(
      expectedValidationValue,
      expect.anything(),
    );
    expect(validationHandler2).toHaveBeenCalledWith(
      expectedValidationValue,
      expect.anything(),
    );
  });
});

test("it should call the min validation if the custom validation passes", async () => {
  const { getByLabelText, getByText } = render(
    <InputNumber
      value={98}
      min={99}
      validations={{
        validate: {
          alwaysPasses: () => true,
        },
      }}
      placeholder="Count to 100"
    />,
  );

  const input = getByLabelText("Count to 100");
  input.focus();
  input.blur();

  await waitFor(() => {
    expect(
      getByText("Enter a number that is greater than or equal to 99"),
    ).toBeInTheDocument();
  });
});

test("it should call the max validation if the custom validation passes", async () => {
  const { getByLabelText, getByText } = render(
    <InputNumber
      value={101}
      max={100}
      validations={{
        validate: {
          alwaysPasses: () => true,
        },
      }}
      placeholder="Count to 100"
    />,
  );

  const input = getByLabelText("Count to 100");
  input.focus();
  input.blur();

  await waitFor(() => {
    expect(
      getByText("Enter a number that is less than or equal to 100"),
    ).toBeInTheDocument();
  });
});

test("it should handle focus", () => {
  const inputRef = React.createRef<InputNumberRef>();
  const placeholder = "Number";

  const { getByLabelText } = render(
    <InputNumber placeholder={placeholder} ref={inputRef} />,
  );

  inputRef.current.focus();
  expect(document.activeElement).toBe(getByLabelText(placeholder));
});

test("it should handle blur", () => {
  const inputRef = React.createRef<InputNumberRef>();
  const blurHandler = jest.fn();

  render(<InputNumber ref={inputRef} onBlur={blurHandler} />);

  inputRef.current.focus();
  inputRef.current.blur();
  expect(blurHandler).toHaveBeenCalledTimes(1);
});

it("should set inputMode to decimal", () => {
  const { getByLabelText } = render(
    <InputNumber keyboard="decimal" placeholder="Allow Decimals" />,
  );
  const input = getByLabelText("Allow Decimals");

  expect(input.inputMode).toEqual("decimal");
});

it("should set inputMode to numeric", () => {
  const { getByLabelText } = render(
    <InputNumber keyboard="numeric" placeholder="Numeric" />,
  );
  const input = getByLabelText("Numeric");

  expect(input.inputMode).toEqual("numeric");
});

it("should set not inputMode by default", () => {
  const { getByLabelText } = render(<InputNumber placeholder="Unset" />);
  const input = getByLabelText("Unset");

  expect(input.inputMode).toBeFalsy();
});
