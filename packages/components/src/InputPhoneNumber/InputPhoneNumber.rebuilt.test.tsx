import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputPhoneNumberRebuilt } from "./InputPhoneNumber.rebuilt";

const placeholder = "Phone";

describe("InputPhoneNumber V2", () => {
  it("should render a field", () => {
    render(
      <InputPhoneNumberRebuilt
        loading={false}
        placeholder={placeholder}
        value=""
        version={2}
        onChange={jest.fn()}
      />,
    );

    const input = screen.getByLabelText(placeholder);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "tel");
  });

  it("should call onChange with the correct value", async () => {
    const mockOnChange = jest.fn();
    render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        value="123123"
        onChange={mockOnChange}
        version={2}
      />,
    );
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "123123");
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(
        "(123) 123-3",
        expect.any(Object),
      );
    });
  });
});

describe("pattern", () => {
  it("should have the phone number pattern", () => {
    render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        value=""
        onChange={jest.fn()}
        version={2}
      />,
    );

    expect(screen.getByText("(___) ___-____")).toBeInTheDocument();
  });

  it("should have the correct style when the input is empty", () => {
    render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        value=""
        onChange={jest.fn()}
        version={2}
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("emptyValue");
  });

  it("should have the correct style when the input is not empty", () => {
    render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        value="123123"
        onChange={jest.fn()}
        version={2}
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).not.toHaveClass("emptyValue");
  });
  it("should have the correct style when the pattern isn't one we need to adjust for", () => {
    render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        pattern="***-***-**"
        value="123123"
        version={2}
        onChange={jest.fn()}
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).not.toHaveClass("emptyValue");
  });

  it("should render a custom pattern", () => {
    const { getByText } = render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        pattern="***-***-** n **"
        value=""
        onChange={jest.fn()}
        version={2}
      />,
    );

    expect(getByText("___-___-__ n __")).toBeInTheDocument();
  });
});

// Tests for shared HTMLInputBaseProps
describe("HTMLInputBaseProps", () => {
  it("should render with id attribute", () => {
    render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        value=""
        onChange={jest.fn()}
        version={2}
        id="phone-id"
      />,
    );
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "phone-id");
  });

  it("should render with name attribute", () => {
    render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        value=""
        onChange={jest.fn()}
        version={2}
        name="phone-name"
      />,
    );
    expect(screen.getByRole("textbox")).toHaveAttribute("name", "phone-name");
  });

  it("should be disabled when disabled prop is true", () => {
    render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        value=""
        onChange={jest.fn()}
        version={2}
        disabled
      />,
    );
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("should not allow typing when disabled", async () => {
    const changeHandler = jest.fn();
    render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        value=""
        onChange={changeHandler}
        version={2}
        disabled
      />,
    );
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "123");
    expect(changeHandler).not.toHaveBeenCalled();
  });

  it("should be read-only when readOnly prop is true", () => {
    render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        value="1234567890"
        onChange={jest.fn()}
        version={2}
        readOnly
      />,
    );
    expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
  });

  it("should auto-focus when autoFocus prop is true", () => {
    render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        value=""
        onChange={jest.fn()}
        version={2}
        autoFocus
      />,
    );
    expect(screen.getByRole("textbox")).toHaveFocus();
  });
});

// Tests for shared RebuiltInputCommonProps
describe("RebuiltInputCommonProps", () => {
  it("should display error message", () => {
    const errorMessage = "Invalid phone number";
    render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        value=""
        onChange={jest.fn()}
        version={2}
        error={errorMessage}
      />,
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should have invalid styling when invalid prop is true", () => {
    const { container } = render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        value=""
        onChange={jest.fn()}
        version={2}
        invalid
      />,
    );
    expect(container.querySelector(".invalid")).toBeInTheDocument();
  });

  it("should render with small size", () => {
    const { container } = render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        value=""
        onChange={jest.fn()}
        version={2}
        size="small"
      />,
    );
    expect(container.querySelector(".small")).toBeInTheDocument();
  });

  it("should render with large size", () => {
    const { container } = render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        value=""
        onChange={jest.fn()}
        version={2}
        size="large"
      />,
    );
    expect(container.querySelector(".large")).toBeInTheDocument();
  });

  it("should render string description", () => {
    const description = "Enter your contact number";
    render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        value=""
        onChange={jest.fn()}
        version={2}
        description={description}
      />,
    );
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("should render with prefix", () => {
    render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        value=""
        onChange={jest.fn()}
        version={2}
        prefix={{ label: "+1" }}
      />,
    );
    expect(screen.getByText("+1")).toBeInTheDocument();
  });

  it("should render with suffix", () => {
    render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        value=""
        onChange={jest.fn()}
        version={2}
        suffix={{ label: "Mobile" }}
      />,
    );
    expect(screen.getByText("Mobile")).toBeInTheDocument();
  });
});

// Tests for FocusEvents
describe("Event handlers", () => {
  it("should call onFocus when input is focused", async () => {
    const focusHandler = jest.fn();
    render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        value=""
        onChange={jest.fn()}
        version={2}
        onFocus={focusHandler}
      />,
    );
    await userEvent.click(screen.getByRole("textbox"));
    expect(focusHandler).toHaveBeenCalledTimes(1);
  });

  it("should call onBlur when input loses focus", async () => {
    const blurHandler = jest.fn();
    render(
      <>
        <InputPhoneNumberRebuilt
          placeholder={placeholder}
          value=""
          onChange={jest.fn()}
          version={2}
          onBlur={blurHandler}
        />
        <button type="button" data-testid="other-element">
          Other
        </button>
      </>,
    );
    const input = screen.getByRole("textbox");
    await userEvent.click(input);
    await userEvent.click(screen.getByTestId("other-element"));
    expect(blurHandler).toHaveBeenCalledTimes(1);
  });

  it("should accept onKeyDown prop", () => {
    const keyDownHandler = jest.fn();
    // Just verify the prop is accepted without error
    const { container } = render(
      <InputPhoneNumberRebuilt
        placeholder={placeholder}
        value=""
        onChange={jest.fn()}
        version={2}
        onKeyDown={keyDownHandler}
      />,
    );
    expect(container.querySelector("input")).toBeInTheDocument();
  });
});
