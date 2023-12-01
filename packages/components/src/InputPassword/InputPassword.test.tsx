import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { InputPassword } from ".";

describe("<InputPassword />", () => {
  it("renders an input type password", () => {
    const { container } = render(<InputPassword value="123" />);
    expect(container).toMatchSnapshot();
  });

  it("renders a show/hide password button", () => {
    const { getByLabelText } = render(
      <InputPassword value="123" hasVisibility />,
    );
    expect(getByLabelText("Show password")).toBeInTheDocument();
  });

  it("should call the handler with a value", () => {
    const changeHandler = jest.fn();
    const newValue = "password";
    const placeholder = "Count";

    const { getByLabelText } = render(
      <InputPassword
        onChange={changeHandler}
        placeholder={placeholder}
        name={placeholder}
      />,
    );

    fireEvent.change(getByLabelText(placeholder), {
      target: { value: newValue },
    });
    expect(changeHandler).toHaveBeenCalledWith(newValue);
  });

  describe("hasVisibility", () => {
    it("should toggle visible on click", async () => {
      const { getByLabelText, container } = render(
        <InputPassword value="password" hasVisibility />,
      );
      expect(
        container.querySelector("input[type='password']"),
      ).toBeInTheDocument();

      fireEvent.click(getByLabelText("Show password"));
      expect(container.querySelector("input[type='text']")).toBeInTheDocument();
      expect(
        container.querySelector("input[type='password']"),
      ).not.toBeInTheDocument();

      fireEvent.click(getByLabelText("Hide password"));
      expect(
        container.querySelector("input[type='password']"),
      ).toBeInTheDocument();
      expect(
        container.querySelector("input[type='text']"),
      ).not.toBeInTheDocument();
    });
  });
});
