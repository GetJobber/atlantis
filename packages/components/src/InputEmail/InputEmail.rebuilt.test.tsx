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

    it("should not call onBlur when cleared programmatically", async () => {
      const blurHandler = jest.fn();
      const ref = React.createRef<HTMLInputElement>();
      const initialValue = "test@example.com";

      render(
        <InputEmailRebuilt
          version={2}
          value={initialValue}
          onBlur={blurHandler}
          clearable="always"
          ref={ref}
        />,
      );

      const clearButton = screen.getByTestId("ATL-FormField-clearButton");
      await userEvent.click(clearButton);

      expect(blurHandler).not.toHaveBeenCalled();
    });

    it("should call onChange with empty string, and focus input when cleared", async () => {
      const changeHandler = jest.fn();
      const ref = React.createRef<HTMLInputElement>();
      const initialValue = "test@example.com";

      render(
        <InputEmailRebuilt
          version={2}
          value={initialValue}
          onChange={changeHandler}
          clearable="always"
          ref={ref}
        />,
      );

      const clearButton = screen.getByTestId("ATL-FormField-clearButton");
      await userEvent.click(clearButton);

      expect(changeHandler).toHaveBeenCalledWith("");
      expect(ref.current).toHaveFocus();
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

  // Additional tests for shared props coverage
  describe("Shared HTMLInputBaseProps", () => {
    it("should render with id attribute", () => {
      render(<InputEmailRebuilt version={2} id="email-id" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "email-id");
    });

    it("should render with name attribute", () => {
      render(<InputEmailRebuilt version={2} name="email-name" />);
      expect(screen.getByRole("textbox")).toHaveAttribute("name", "email-name");
    });

    it("should be read-only when readOnly prop is true", () => {
      render(
        <InputEmailRebuilt version={2} value="test@example.com" readOnly />,
      );
      expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
    });

    it("should not allow typing when readOnly", async () => {
      const changeHandler = jest.fn();
      render(
        <InputEmailRebuilt
          version={2}
          value="test@example.com"
          readOnly
          onChange={changeHandler}
        />,
      );
      const input = screen.getByRole("textbox");
      await userEvent.type(input, "new");
      expect(changeHandler).not.toHaveBeenCalled();
    });

    it("should auto-focus when autoFocus prop is true", () => {
      render(<InputEmailRebuilt version={2} autoFocus />);
      expect(screen.getByRole("textbox")).toHaveFocus();
    });
  });

  describe("Shared RebuiltInputCommonProps", () => {
    it("should display error message", () => {
      const errorMessage = "Invalid email address";
      render(<InputEmailRebuilt version={2} error={errorMessage} />);
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it("should show loading spinner when loading prop is true", () => {
      const { container } = render(<InputEmailRebuilt version={2} loading />);
      expect(container.querySelector(".spinner")).toBeInTheDocument();
    });

    it("should render string description", () => {
      const description = "We'll never share your email";
      render(<InputEmailRebuilt version={2} description={description} />);
      expect(screen.getByText(description)).toBeInTheDocument();
    });

    it("should render with prefix", () => {
      render(<InputEmailRebuilt version={2} prefix={{ icon: "email" }} />);
      expect(screen.getByTestId("email")).toBeInTheDocument();
    });

    it("should render with suffix", () => {
      render(
        <InputEmailRebuilt version={2} suffix={{ label: "@company.com" }} />,
      );
      expect(screen.getByText("@company.com")).toBeInTheDocument();
    });

    it("should render inline", () => {
      const { container } = render(<InputEmailRebuilt version={2} inline />);
      expect(container.querySelector(".inline")).toBeInTheDocument();
    });
  });

  describe("Event handlers", () => {
    it("should call onKeyDown when key is pressed", async () => {
      const keyDownHandler = jest.fn();
      render(<InputEmailRebuilt version={2} onKeyDown={keyDownHandler} />);
      const input = screen.getByRole("textbox");
      await userEvent.type(input, "a");
      expect(keyDownHandler).toHaveBeenCalled();
    });

    it("should call onKeyUp when key is released", async () => {
      const keyUpHandler = jest.fn();
      render(<InputEmailRebuilt version={2} onKeyUp={keyUpHandler} />);
      const input = screen.getByRole("textbox");
      await userEvent.type(input, "a");
      expect(keyUpHandler).toHaveBeenCalled();
    });
  });
});
