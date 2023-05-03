import React, { useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { InputPhoneNumber } from "./InputPhoneNumber";

const placeholder = "Phone";
const validationMessage = "Enter a phone number";

jest.mock("framer-motion", () => ({
  motion: {
    div: require("react").forwardRef(({ children, ...rest }, ref) => (
      <div {...rest} ref={ref}>
        {children}
      </div>
    )),
  },
  AnimatePresence: jest
    .fn()
    .mockImplementation(({ children }) => <>{children}</>),
  default: jest.fn(),
}));

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

  it("should use 'This' as a subject of the error when the placeholder doesn't exist", async () => {
    render(<InputPhoneNumber value="" onChange={jest.fn()} required={true} />);

    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(await screen.findByText("This is required")).toBeInTheDocument();
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
  });
});
