import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

describe("The validation error message", () => {
    it("should appear when the user doesn't enter ten or more digits", async () => {
      render(<InputPhoneNumber value="123123" onChange={jest.fn()} />);
      const input = screen.getByRole("textbox");
      input.focus();
      input.blur();
      expect(
        await screen.findByText("Enter a phone number"),
      ).toBeInTheDocument();
    });

    it("should not appear with a valid phone number", async () => {
      const validationHandler = jest.fn();
      render(
        <InputPhoneNumber
          value="6135551232"
          onChange={jest.fn()}
          onValidation={validationHandler}
        />,
      );
      const input = screen.getByRole("textbox");
      input.focus();
      input.blur();

      await waitFor(() => {
        expect(validationHandler).toHaveBeenCalledWith(undefined);
      });
    });

    it("should disappear once the input has been changed back to a valid phone number", async () => {
      const validationHandler = jest.fn();
      const changeHandler = jest.fn();

      render(
        <InputPhoneNumber
          value="613555"
          onChange={changeHandler}
          onValidation={validationHandler}
        />,
      );
      const input = screen.getByRole("textbox");

      input.focus();
      input.blur();

      expect(
        await screen.findByText("Enter a phone number"),
      ).toBeInTheDocument();
      waitFor(() => {
        expect(validationHandler).toHaveBeenCalledWith("Enter a phone number");
      });

      input.focus();
      fireEvent.change(input, { target: { value: "6135551232" } });
      input.blur();

      await waitFor(() => {
        expect(changeHandler).toHaveBeenCalledWith("(613) 555-1232");
        expect(validationHandler).toHaveBeenCalledWith(undefined);
      });
    });
  });
});
