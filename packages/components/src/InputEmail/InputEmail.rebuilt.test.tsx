import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputEmailRebuilt } from "./InputEmail.rebuilt";

describe("InputEmailRebuilt", () => {
  it("renders a basic InputEmailRebuilt", () => {
    const { container } = render(<InputEmailRebuilt version={2} />);
    expect(container).toMatchSnapshot();
  });

  it("renders correctly with placeholder", () => {
    const { container } = render(
      <InputEmailRebuilt version={2} placeholder="Enter email" />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly as small", () => {
    const { container } = render(
      <InputEmailRebuilt version={2} size="small" />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly as large", () => {
    const { container } = render(
      <InputEmailRebuilt version={2} size="large" />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly when disabled", () => {
    const { container } = render(<InputEmailRebuilt version={2} disabled />);
    expect(container).toMatchSnapshot();
  });

  it("renders correctly when invalid", () => {
    const { container } = render(<InputEmailRebuilt version={2} invalid />);
    expect(container).toMatchSnapshot();
  });

  it("renders the value when set", () => {
    const value = "test@example.com";
    render(<InputEmailRebuilt version={2} value={value} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue(value);
  });

  describe("Action handlers", () => {
    it("should call onChange with the new value when input changes", async () => {
      const changeHandler = jest.fn();
      const initialValue = "initial@example.com";
      const newValue = "new@example.com";

      render(
        <InputEmailRebuilt
          version={2}
          value={initialValue}
          onChange={changeHandler}
        />,
      );

      const inputElement = screen.getByRole("textbox");
      fireEvent.change(inputElement, { target: { value: newValue } });
      expect(changeHandler).toHaveBeenCalledWith(newValue, expect.any(Object));
    });

    it("should call onFocus when the input is focused", async () => {
      const focusHandler = jest.fn();
      const value = "test@example.com";

      render(
        <InputEmailRebuilt version={2} value={value} onFocus={focusHandler} />,
      );

      await userEvent.click(screen.getByDisplayValue(value));
      expect(focusHandler).toHaveBeenCalledTimes(1);
    });

    it("should call onBlur when the input loses focus", async () => {
      const blurHandler = jest.fn();

      render(
        <>
          <InputEmailRebuilt version={2} onBlur={blurHandler} />
          <button type="button" data-testid="other-element">
            Other element
          </button>
        </>,
      );

      const inputElement = screen.getByRole("textbox");
      await userEvent.click(inputElement);
      await userEvent.click(screen.getByTestId("other-element"));

      expect(blurHandler).toHaveBeenCalledTimes(1);
    });

    it("should call onChange with undefined, call onBlur, and focus input when cleared", async () => {
      const changeHandler = jest.fn();
      const blurHandler = jest.fn();
      const ref = React.createRef<HTMLInputElement>();
      const initialValue = "test@example.com";

      render(
        <InputEmailRebuilt
          version={2}
          value={initialValue}
          onChange={changeHandler}
          onBlur={blurHandler}
          clearable="always"
          ref={ref}
        />,
      );

      const clearButton = screen.getByTestId("ATL-FormField-clearButton");
      await userEvent.click(clearButton);

      expect(changeHandler).toHaveBeenCalledWith("");
      expect(blurHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe("Ref handling", () => {
    it("should forward ref to the input element", () => {
      const ref = React.createRef<HTMLInputElement>();

      render(<InputEmailRebuilt version={2} ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it("should allow access to native input methods through ref", async () => {
      const ref = React.createRef<HTMLInputElement>();

      render(<InputEmailRebuilt version={2} ref={ref} />);

      const inputElement = screen.getByRole("textbox");
      const focusSpy = jest.spyOn(inputElement, "focus");
      const blurSpy = jest.spyOn(inputElement, "blur");

      ref.current?.focus();
      expect(focusSpy).toHaveBeenCalled();

      ref.current?.blur();
      expect(blurSpy).toHaveBeenCalled();
    });
  });
});
