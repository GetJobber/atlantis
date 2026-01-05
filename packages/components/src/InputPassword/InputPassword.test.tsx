import React from "react";
import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

describe("clearable while-editing", () => {
  it("shows clear when focused and has value; hides on blur", async () => {
    const { getByLabelText, queryByLabelText, findByLabelText } = render(
      <InputPassword
        placeholder="Password"
        value="secret"
        clearable="while-editing"
      />,
    );
    const input = getByLabelText("Password");

    await userEvent.click(input);

    const clear = await findByLabelText("Clear input");

    expect(clear).toBeVisible();

    await userEvent.tab(); // focus the clear button
    await userEvent.tab(); // blur the clear button

    expect(queryByLabelText("Clear input")).not.toBeInTheDocument();
  });

  it("does not show clear when there is no value", async () => {
    const { getByLabelText, queryByLabelText } = render(
      <InputPassword
        placeholder="Password"
        value=""
        clearable="while-editing"
      />,
    );
    const input = getByLabelText("Password");

    await userEvent.click(input);

    expect(queryByLabelText("Clear input")).not.toBeInTheDocument();
  });
});

describe("clearable always", () => {
  it("always shows when clearable=always and has value, even blurred", async () => {
    const { getByLabelText } = render(
      <InputPassword
        placeholder="Password"
        value="secret"
        clearable="always"
      />,
    );
    const input = getByLabelText("Password");

    await userEvent.click(input);
    await userEvent.tab(); // focus the clear button
    await userEvent.tab(); // blur the clear button

    const clear = getByLabelText("Clear input");

    expect(clear).toBeVisible();
  });
});
