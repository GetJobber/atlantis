import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { InputPhoneNumber } from "./InputPhoneNumber";

const placeholder = "Phone";

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
});
