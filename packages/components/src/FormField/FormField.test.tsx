import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { FormField } from ".";

afterEach(cleanup);
it("renders correctly with no props", () => {
  const tree = renderer.create(<FormField />).toJSON();
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
        id="123e4567-e89b-12d3-a456-426655440001"
        onBlur={[Function]}
        onChange={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        type="text"
      />
    </div>
  `);
});

it("renders correctly with a placeholder", () => {
  const tree = renderer
    .create(<FormField placeholder="My placeholder" />)
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
        htmlFor="123e4567-e89b-12d3-a456-426655440002"
      >
        My placeholder
      </label>
      <input
        className="formField"
        id="123e4567-e89b-12d3-a456-426655440002"
        onBlur={[Function]}
        onChange={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        type="text"
      />
    </div>
  `);
});

it("renders correctly as small", () => {
  const tree = renderer.create(<FormField size="small" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="wrapper small"
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
        id="123e4567-e89b-12d3-a456-426655440003"
        onBlur={[Function]}
        onChange={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        type="text"
      />
    </div>
  `);
});

it("renders correctly in a readonly state", () => {
  const tree = renderer.create(<FormField readonly={true} />).toJSON();
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
        htmlFor="123e4567-e89b-12d3-a456-426655440004"
      >
         
      </label>
      <input
        className="formField"
        id="123e4567-e89b-12d3-a456-426655440004"
        onBlur={[Function]}
        onChange={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        readOnly={true}
        type="text"
      />
    </div>
  `);
});

it("renders correctly in a disabled state", () => {
  const tree = renderer.create(<FormField disabled={true} />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="wrapper disabled"
      style={
        Object {
          "--formField-maxLength": undefined,
        }
      }
    >
      <label
        className="label"
        htmlFor="123e4567-e89b-12d3-a456-426655440005"
      >
         
      </label>
      <input
        className="formField"
        disabled={true}
        id="123e4567-e89b-12d3-a456-426655440005"
        onBlur={[Function]}
        onChange={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        type="text"
      />
    </div>
  `);
});

it("renders a field with error", () => {
  const tree = renderer.create(<FormField value="wrong!" />).toJSON();
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
        htmlFor="123e4567-e89b-12d3-a456-426655440006"
      >
         
      </label>
      <input
        className="formField"
        defaultValue="wrong!"
        id="123e4567-e89b-12d3-a456-426655440006"
        onBlur={[Function]}
        onChange={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        type="text"
      />
    </div>
  `);
});

it("it should set the value", () => {
  const value = "Look, some words!";
  const { getByDisplayValue } = render(<FormField value={value} />);

  expect(getByDisplayValue(value)).toBeDefined();
});

test("it should call the handler with the new value", () => {
  const placeholder = "I hold places.";
  const newValue =
    "The snake which cannot cast its skin has to die. As well the minds which are prevented from changing their opinions; they cease to be mind.";
  const newerValue =
    "They always say time changes things, but you actually have to change them yourself.";
  const changeHandler = jest.fn();

  const { getByLabelText } = render(
    <FormField
      name="Got milk?"
      onChange={changeHandler}
      placeholder={placeholder}
    />,
  );

  fireEvent.change(getByLabelText(placeholder), {
    target: { value: newValue },
  });
  expect(changeHandler).toHaveBeenCalledWith(newValue);

  fireEvent.change(getByLabelText(placeholder), {
    target: { value: newerValue },
  });
  expect(changeHandler).toHaveBeenCalledWith(newerValue);
});

test("it should call the validation handler when typing a new value", () => {
  const validationHandler = jest.fn();

  render(
    <FormField
      name="Got milk?"
      onValidation={validationHandler}
      placeholder="I hold places."
    />,
  );

  expect(validationHandler).toHaveBeenCalled();
  expect(validationHandler).toHaveBeenCalledWith(undefined);
});

test("it should call the validation handler with a message when there is an error", async () => {
  const validationHandler = jest.fn();
  const validate = val => (val == "Bob" ? "message" : "");

  const { getByLabelText } = render(
    <FormField
      type="text"
      name="Got milk?"
      onValidation={validationHandler}
      placeholder="I hold places"
      value="test"
      validations={{
        validate,
      }}
    />,
  );

  const input = getByLabelText("I hold places");
  input.focus();
  fireEvent.change(input, { target: { value: "Bob" } });
  input.blur();

  expect(validationHandler).toHaveBeenCalled();
  await waitFor(() => {
    expect(validationHandler).toHaveBeenCalledWith("message");
  });
});

test("it should handle when the enter key is pressed", () => {
  const enterHandler = jest.fn();
  const placeholder = "Milk heals bones";

  const { getByLabelText } = render(
    <FormField
      name="Enter the milk house"
      onEnter={enterHandler}
      placeholder={placeholder}
    />,
  );

  fireEvent.keyDown(getByLabelText(placeholder), {
    key: "Enter",
    code: "Enter",
  });

  expect(enterHandler).toHaveBeenCalledTimes(1);

  fireEvent.keyDown(getByLabelText(placeholder), {
    key: "Enter",
    code: "Enter",
  });

  expect(enterHandler).toHaveBeenCalledTimes(2);
});

test("it should not handle when the shift key and enter key are pressed", () => {
  const enterHandler = jest.fn();
  const placeholder = "Milk heals bones";

  const { getByLabelText } = render(
    <FormField
      name="Enter the milk house"
      onEnter={enterHandler}
      placeholder={placeholder}
    />,
  );

  fireEvent.keyDown(getByLabelText(placeholder), {
    key: "Enter",
    code: "Enter",
    shiftKey: true,
  });

  expect(enterHandler).toHaveBeenCalledTimes(0);
});

test("it should not handle when the shift key and control key are pressed", () => {
  const enterHandler = jest.fn();
  const placeholder = "Milk heals bones";

  const { getByLabelText } = render(
    <FormField
      name="Enter the milk house"
      onEnter={enterHandler}
      placeholder={placeholder}
    />,
  );

  fireEvent.keyDown(getByLabelText(placeholder), {
    key: "Enter",
    code: "Enter",
    ctrlKey: true,
  });

  expect(enterHandler).toHaveBeenCalledTimes(0);
});

test("it should not have a name by default", () => {
  const { getByLabelText } = render(<FormField placeholder="foo" />);
  expect(getByLabelText("foo")).not.toHaveAttribute("name");
});

test("it should use the name prop when set", () => {
  const { getByLabelText } = render(
    <FormField placeholder="foo" name="dillan" />,
  );
  expect(getByLabelText("foo")).toHaveAttribute("name", "dillan");
});

test("it should generate a name if validations are set", () => {
  const { getByLabelText } = render(
    <FormField placeholder="foo" validations={{ required: true }} />,
  );
  const input = getByLabelText("foo");
  const name = input.getAttribute("name");
  expect(name).toContain("generatedName--");
});

test("it should set the inputMode when the keyboard prop is set", () => {
  const keyboardMode = "numeric";
  const { getByLabelText } = render(
    <FormField placeholder="foo" keyboard={keyboardMode} />,
  );
  const input = getByLabelText("foo");
  const name = input.getAttribute("inputMode");
  expect(name).toContain(keyboardMode);
});

test("it should render the spinner when loading is true", () => {
  const { getByLabelText } = render(
    <FormField placeholder="foo" type="text" loading={true} />,
  );
  const spinner = getByLabelText("loading");

  expect(spinner).toBeInstanceOf(HTMLElement);
});

it("it should set the autocomplete value with one-time-code", () => {
  const { getByLabelText } = render(
    <FormField placeholder="foo" autocomplete={"one-time-code"} />,
  );
  const input = getByLabelText("foo");
  const autocomplete = input.getAttribute("autocomplete");
  expect(autocomplete).toContain("one-time-code");
});

it("it should set the autocomplete value to off", () => {
  const { getByLabelText } = render(
    <FormField placeholder="foo" autocomplete={false} />,
  );
  const input = getByLabelText("foo");
  const autocomplete = input.getAttribute("autocomplete");
  expect(autocomplete).toContain("autocomplete-off");
});
