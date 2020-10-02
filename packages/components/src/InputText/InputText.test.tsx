import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";
import { InputText } from ".";
import { InputTextRef } from "./InputText";

it("renders a regular input for text and numbers", () => {
  const tree = renderer
    .create(<InputText placeholder="Favourite colour" />)
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
        htmlFor="123e4567-e89b-12d3-a456-426655440001"
      >
        Favourite colour
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

it("renders a textarea", () => {
  const tree = renderer
    .create(
      <InputText placeholder="Describe your favourite colour?" multiline />,
    )
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
        className="label textareaLabel"
        htmlFor="123e4567-e89b-12d3-a456-426655440002"
      >
        Describe your favourite colour?
      </label>
      <textarea
        className="formField"
        id="123e4567-e89b-12d3-a456-426655440002"
        onBlur={[Function]}
        onChange={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        rows={3}
      />
    </div>
  `);
});

it("renders a textarea with 4 rows", () => {
  const tree = renderer
    .create(
      <InputText
        placeholder="Describe your favourite colour?"
        multiline
        rows={4}
      />,
    )
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
        className="label textareaLabel"
        htmlFor="123e4567-e89b-12d3-a456-426655440003"
      >
        Describe your favourite colour?
      </label>
      <textarea
        className="formField"
        id="123e4567-e89b-12d3-a456-426655440003"
        onBlur={[Function]}
        onChange={[Function]}
        onFocus={[Function]}
        onKeyDown={[Function]}
        rows={4}
      />
    </div>
  `);
});

test("it should call the handler with the new value", () => {
  const placeholder = "I hold places.";
  const newValue =
    "The snake which cannot cast its skin has to die. As well the minds which are prevented from changing their opinions; they cease to be mind.";
  const newerValue =
    "They always say time changes things, but you actually have to change them yourself.";
  const changeHandler = jest.fn();

  const { getByLabelText } = render(
    <InputText
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

test("it should handle inserting text", () => {
  const initial = "Got milk?";
  const result = `${initial}YUP`;
  const secondResult = `${initial}YUPsure`;

  const textRef = React.createRef<InputTextRef>();
  const changeHandler = jest.fn();

  render(<InputText value={initial} onChange={changeHandler} ref={textRef} />);

  textRef.current.insert("YUP");
  expect(changeHandler).toHaveBeenCalledWith(result);

  textRef.current.insert("sure");
  expect(changeHandler).toHaveBeenCalledWith(secondResult);
});
