import React, { useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputPhoneNumber } from "./InputPhoneNumber";

const placeholder = "Phone";
const validationMessage = "Phone number must contain 10 or more digits";

describe("InputPhoneNumber", () => {
  it("should render a field", () => {
    render(
      <InputPhoneNumber
        placeholder={placeholder}
        value=""
        onChange={jest.fn()}
      />,
    );

    const input = screen.getByLabelText(placeholder);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "tel");
  });

  it("should throw a required error when blurred", async () => {
    render(
      <InputPhoneNumber
        placeholder={placeholder}
        value=""
        onChange={jest.fn()}
        required={true}
      />,
    );

    const input = screen.getByLabelText(placeholder);
    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(
      await screen.findByText(`${placeholder} is required`),
    ).toBeInTheDocument();
  });

  it("should use 'Phone number' as a subject of the error when the placeholder doesn't exist", async () => {
    render(<InputPhoneNumber value="" onChange={jest.fn()} required={true} />);

    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(
      await screen.findByText("Phone number is required"),
    ).toBeInTheDocument();
  });

  describe("The validation error message", () => {
    it("should appear when the user doesn't enter ten or more digits", async () => {
      render(<InputPhoneNumber value="123123" onChange={jest.fn()} />);
      const input = screen.getByRole("textbox");
      input.focus();
      input.blur();
      expect(await screen.findByText(validationMessage)).toBeInTheDocument();
    });

    it("should disappear once the input has been changed back to a valid phone number", async () => {
      render(<TestInput />);

      const input = screen.getByRole("textbox");

      fireEvent.focus(input);
      fireEvent.change(input, {
        target: { value: "32732" },
      });
      fireEvent.blur(input);

      expect(await screen.findByText(validationMessage)).toBeInTheDocument();

      fireEvent.focus(input);
      fireEvent.change(input, {
        target: { value: "6135551232" },
      });
      fireEvent.blur(input);

      await waitFor(() => {
        expect(screen.queryByText(validationMessage)).not.toBeInTheDocument();
      });

      function TestInput() {
        const [value, setValue] = useState("");

        return <InputPhoneNumber value={value} onChange={setValue} />;
      }
    });
    it("should call onChange with the correct value", async () => {
      const mockOnChange = jest.fn();
      render(<InputPhoneNumber value="123123" onChange={mockOnChange} />);
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
        <InputPhoneNumber
          placeholder={placeholder}
          value=""
          onChange={jest.fn()}
        />,
      );

      expect(screen.getByText("(___) ___-____")).toBeInTheDocument();
    });

    it("should have the correct style when the input is empty", () => {
      render(
        <InputPhoneNumber
          placeholder={placeholder}
          value=""
          onChange={jest.fn()}
        />,
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("emptyPhoneNumber");
    });
    it("should have the correct style when the input is not empty", () => {
      render(
        <InputPhoneNumber
          placeholder={placeholder}
          value="123123"
          onChange={jest.fn()}
        />,
      );

      const input = screen.getByRole("textbox");
      expect(input).not.toHaveClass("emptyPhoneNumber");
    });
    it("should have the correct style when the pattern isn't one we need to adjust for", () => {
      render(
        <InputPhoneNumber
          placeholder={placeholder}
          pattern="***-***-**"
          value="123123"
          onChange={jest.fn()}
        />,
      );

      const input = screen.getByRole("textbox");
      expect(input).not.toHaveClass("emptyPhoneNumber");
    });

    it("should render a custom pattern", () => {
      const { getByText } = render(
        <InputPhoneNumber
          placeholder={placeholder}
          pattern="***-***-** n **"
          value=""
          onChange={jest.fn()}
        />,
      );

      expect(getByText("___-___-__ n __")).toBeInTheDocument();
    });

    it("should update the validation to limit characters", async () => {
      render(
        <InputPhoneNumber
          value="123123"
          pattern="*** ****"
          onChange={jest.fn()}
        />,
      );
      const customPatternValidationMessage =
        "Phone number must contain 7 or more digits";
      const input = screen.getByRole("textbox");
      input.focus();
      input.blur();
      expect(
        await screen.findByText(customPatternValidationMessage),
      ).toBeInTheDocument();
    });
  });
});
