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

  describe("hyphenated props", () => {
    it("should not apply arbitrary data-* attributes to the input", () => {
      render(
        <InputPhoneNumberRebuilt
          version={2}
          value=""
          onChange={jest.fn()}
          data-arbitrary="true"
        />,
      );

      const input = screen.getByRole("textbox");
      expect(input).not.toHaveAttribute("data-arbitrary");
    });

    it("should not apply hyphenated aria attributes to the input", () => {
      render(
        <InputPhoneNumberRebuilt
          version={2}
          value=""
          onChange={jest.fn()}
          aria-expanded="true"
        />,
      );

      const input = screen.getByRole("textbox");
      expect(input).not.toHaveAttribute("aria-expanded");
    });

    it("should apply data attributes via dataAttributes prop", () => {
      render(
        <InputPhoneNumberRebuilt
          version={2}
          value=""
          onChange={jest.fn()}
          dataAttributes={{ "data-test": "value" }}
        />,
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("data-test", "value");
    });
  });
});
