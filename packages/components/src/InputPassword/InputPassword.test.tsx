import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { InputPassword } from ".";

afterEach(cleanup);

describe("<InputPassword />", () => {
  it("renders an input type password", () => {
    const { container } = render(<InputPassword value="123" />);
    expect(container).toMatchSnapshot();
  });

  it("renders a show/hide password button", () => {
    const { getByLabelText } = render(
      <InputPassword value="123" hasVisibilityToggle />,
    );
    expect(getByLabelText("Input action")).toBeInTheDocument();
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

  describe("hasVisibilityToggle", () => {
    it("should toggle visible on click", async () => {
      const { getByLabelText, container } = render(
        <InputPassword value="password" hasVisibilityToggle />,
      );
      // initially should display password input
      expect(
        container.querySelector("input[type='password']"),
      ).toBeInTheDocument();

      // clicking on visibility toggle, should see password
      fireEvent.click(getByLabelText("Input action"));
      expect(container.querySelector("input[type='text']")).toBeInTheDocument();
      expect(
        container.querySelector("input[type='password']"),
      ).not.toBeInTheDocument();
    });
  });
});
