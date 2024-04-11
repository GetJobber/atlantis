import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { InputText } from ".";
import { InputTextRef } from "./InputText";

it("renders a regular input for text and numbers", () => {
  const { container } = render(<InputText placeholder="Favourite colour" />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="container"
      >
        <div
          class="wrapper text"
          data-testid="Form-Field-Wrapper"
        >
          <div
            class="horizontalWrapper"
          >
            <div
              class="inputWrapper"
            >
              <label
                class="label"
                for=":r0:"
              >
                Favourite colour
              </label>
              <div
                class="childrenWrapper"
                tabindex="-1"
              >
                <input
                  class="input"
                  id=":r0:"
                  type="text"
                  value=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
});

it("renders a textarea", () => {
  const { container } = render(
    <InputText placeholder="Describe your favourite colour?" multiline />,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="container"
      >
        <div
          class="wrapper text textarea"
          data-testid="Form-Field-Wrapper"
        >
          <div
            class="horizontalWrapper"
          >
            <div
              class="inputWrapper"
            >
              <label
                class="label"
                for=":r2:"
              >
                Describe your favourite colour?
              </label>
              <div
                class="childrenWrapper"
                tabindex="-1"
              >
                <textarea
                  class="input"
                  id=":r2:"
                  rows="3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
});

it("renders a textarea with 4 rows", () => {
  const { container } = render(
    <InputText
      placeholder="Describe your favourite colour?"
      multiline
      rows={4}
    />,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="container"
      >
        <div
          class="wrapper text textarea"
          data-testid="Form-Field-Wrapper"
        >
          <div
            class="horizontalWrapper"
          >
            <div
              class="inputWrapper"
            >
              <label
                class="label"
                for=":r4:"
              >
                Describe your favourite colour?
              </label>
              <div
                class="childrenWrapper"
                tabindex="-1"
              >
                <textarea
                  class="input"
                  id=":r4:"
                  rows="4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
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

  textRef.current?.insert("YUP");
  expect(changeHandler).toHaveBeenCalledWith(result);

  textRef.current?.insert("sure");
  expect(changeHandler).toHaveBeenCalledWith(secondResult);
});

test("it should focus input text", () => {
  const placeholder = "Got milk?";

  const textRef = React.createRef<InputTextRef>();

  const { getByLabelText } = render(
    <InputText placeholder={placeholder} ref={textRef} />,
  );

  textRef.current?.focus();
  expect(getByLabelText(placeholder)).toHaveFocus();
});

test("it should scroll into view input text", () => {
  const scrollIntoViewMock = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

  const placeholder = "Got milk?";

  const textRef = React.createRef<InputTextRef>();

  render(<InputText placeholder={placeholder} ref={textRef} />);

  textRef.current?.scrollIntoView();
  expect(scrollIntoViewMock).toHaveBeenCalled();
});
