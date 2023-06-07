import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { InputPassword } from "./InputPassword";
import { messages } from "./messages";
import { InputFieldWrapperProps } from "../InputFieldWrapper";

const MockInputFieldWrapper = jest.fn();
jest.mock("../InputFieldWrapper", () => ({
  ...jest.requireActual("../InputFieldWrapper"),
  InputFieldWrapper: function Mock(props: InputFieldWrapperProps) {
    MockInputFieldWrapper(props);
    return jest.requireActual("../InputFieldWrapper").InputFieldWrapper(props);
  },
}));
describe("InputPassword", () => {
  it("renders an InputPassword", () => {
    const value = "password";
    const { getByDisplayValue } = render(<InputPassword value={value} />);
    expect(getByDisplayValue(value)).toBeTruthy();
  });

  it("displays the validation message when an invalid password is entered", async () => {
    const a11yLabel = "InputPasswordTest";
    const { getByText, getByLabelText } = render(
      <InputPassword value="" accessibilityLabel={a11yLabel} />,
    );

    await waitFor(() => {
      fireEvent(getByLabelText(a11yLabel), "blur");
    });

    expect(
      getByText(messages.passwordRequired.defaultMessage, {
        includeHiddenElements: true,
      }),
    ).toBeDefined();
  });

  describe("InputPassword gets the expected props", () => {
    it("renders an invalid InputPassword", () => {
      const props = { invalid: true };
      render(<InputPassword {...props} />);
      expect(MockInputFieldWrapper).toHaveBeenCalledWith(
        expect.objectContaining(props),
      );
    });
  });

  describe("Privacy eye", () => {
    it("renders when usePrivaryEye is true", () => {
      const testId = "eye";
      const { getByTestId } = render(
        <InputPassword
          value="password"
          suffix={{
            icon: testId,
          }}
        />,
      );

      expect(getByTestId("eye")).toBeDefined();
    });

    it("does not render when usePrivaryEye is false", () => {
      const testId = "eye";
      const { queryByTestId } = render(
        <InputPassword
          value="password"
          usePrivacyEye={false}
          suffix={{
            icon: testId,
          }}
        />,
      );

      expect(queryByTestId("eye")).toBeNull();
    });

    it("obscures the password by default", () => {
      const { getByDisplayValue } = render(
        <InputPassword
          value="password"
          suffix={{
            icon: "eye",
          }}
        />,
      );

      expect(getByDisplayValue("password").props.secureTextEntry).toBeTruthy();
    });
  });
});
