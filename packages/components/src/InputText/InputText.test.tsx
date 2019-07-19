import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";
import { InputText } from ".";

it("renders a regular input for text and numbers", () => {
  const tree = renderer
    .create(<InputText placeholder="Favourite colour" />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
        <div
          className="wrapper"
          style={Object {}}
        >
          <label
            className="label"
          >
            Favourite colour
          </label>
          <input
            className="formField"
            onChange={[Function]}
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
          style={Object {}}
        >
          <label
            className="label"
          >
            Describe your favourite colour?
          </label>
          <textarea
            className="formField"
            onChange={[Function]}
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
      style={Object {}}
    >
      <label
        className="label"
      >
        Describe your favourite colour?
      </label>
      <textarea
        className="formField"
        onChange={[Function]}
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
