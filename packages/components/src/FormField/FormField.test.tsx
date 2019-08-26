import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render } from "@testing-library/react";
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
        htmlFor="123e4567-e89b-12d3-a456-426655440000"
      >
         
      </label>
      <input
        className="formField"
        id="123e4567-e89b-12d3-a456-426655440000"
        onChange={[Function]}
        onFocus={[Function]}
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
                                    htmlFor="123e4567-e89b-12d3-a456-426655440000"
                                  >
                                    My placeholder
                                  </label>
                                  <input
                                    className="formField"
                                    id="123e4567-e89b-12d3-a456-426655440000"
                                    onChange={[Function]}
                                    onFocus={[Function]}
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
        htmlFor="123e4567-e89b-12d3-a456-426655440000"
      >
         
      </label>
      <input
        className="formField"
        id="123e4567-e89b-12d3-a456-426655440000"
        onChange={[Function]}
        onFocus={[Function]}
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
        htmlFor="123e4567-e89b-12d3-a456-426655440000"
      >
         
      </label>
      <input
        className="formField"
        id="123e4567-e89b-12d3-a456-426655440000"
        onChange={[Function]}
        onFocus={[Function]}
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
        htmlFor="123e4567-e89b-12d3-a456-426655440000"
      >
         
      </label>
      <input
        className="formField"
        disabled={true}
        id="123e4567-e89b-12d3-a456-426655440000"
        onChange={[Function]}
        onFocus={[Function]}
        type="text"
      />
    </div>
  `);
});

it("renders a field with error", () => {
  const tree = renderer
    .create(
      <FormField value="wrong!" errorMessage="Enter a value that is correct" />,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    Array [
      <p
        className="base base red"
      >
        Enter a value that is correct
      </p>,
      <div
        className="wrapper hasErrorMessage invalid"
        style={
          Object {
            "--formField-maxLength": undefined,
          }
        }
      >
        <label
          className="label"
          htmlFor="123e4567-e89b-12d3-a456-426655440000"
        >
           
        </label>
        <input
          className="formField"
          id="123e4567-e89b-12d3-a456-426655440000"
          onChange={[Function]}
          onFocus={[Function]}
          type="text"
          value="wrong!"
        />
      </div>,
    ]
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
      onValidate={validationHandler}
      placeholder="I hold places."
    />,
  );

  expect(validationHandler).toHaveBeenCalledWith("pass", "");
});

test("it should call the validation handler with a fail status when there's an error", () => {
  const validationHandler = jest.fn();

  render(
    <FormField
      name="Got milk?"
      onValidate={validationHandler}
      placeholder="I hold places"
      errorMessage="Nope!"
    />,
  );

  expect(validationHandler).toHaveBeenCalledWith("fail", "Nope!");
});
