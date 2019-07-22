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
      <input
        className="formField"
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
      >
        My placeholder
      </label>
      <input
        className="formField"
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
      <input
        className="formField"
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
      <input
        className="formField"
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
      <input
        className="formField"
        disabled={true}
        onChange={[Function]}
        onFocus={[Function]}
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
