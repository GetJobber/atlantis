import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { InputNumber, InputNumberRef } from ".";

afterEach(cleanup);

it("renders an input type number", () => {
  const tree = renderer.create(<InputNumber value="123" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="wrapper"
      style={
        Object {
          "--formField-maxLength": undefined,
        }
      }
    >
      <label
        className="label"
        htmlFor="123e4567-e89b-12d3-a456-426655440001"
      >
         
      </label>
      <input
        className="formField"
        defaultValue="123"
        id="123e4567-e89b-12d3-a456-426655440001"
        name="generatedName--123e4567-e89b-12d3-a456-426655440001"
        onBlur={[Function]}
        onChange={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        type="number"
      />
    </div>
  `);
});

it("renders an error", () => {
  const tree = renderer
    .create(<InputNumber value="1.1" errorMessage="Not a whole number" />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="wrapper"
      style={
        Object {
          "--formField-maxLength": undefined,
        }
      }
    >
      <label
        className="label"
        htmlFor="123e4567-e89b-12d3-a456-426655440003"
      >
         
      </label>
      <input
        className="formField"
        defaultValue="1.1"
        id="123e4567-e89b-12d3-a456-426655440003"
        name="generatedName--123e4567-e89b-12d3-a456-426655440003"
        onBlur={[Function]}
        onChange={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        type="number"
      />
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

test("it should call the validation with undefined as a success", () => {
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

  expect(validationHandler).toHaveBeenCalledWith(undefined);
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
    expect(validationHandler).toHaveBeenCalledWith(undefined);
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
        maxLength: {
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
