import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { InputPressable } from ".";
import { InputFieldWrapperProps } from "../InputFieldWrapper";

const MockInputFieldWrapper = jest.fn();
jest.mock("../InputFieldWrapper", () => ({
  ...jest.requireActual("../InputFieldWrapper"),
  InputFieldWrapper: function Mock(props: InputFieldWrapperProps) {
    MockInputFieldWrapper(props);
    return jest.requireActual("../InputFieldWrapper").InputFieldWrapper(props);
  },
}));

describe("InputPressable", () => {
  describe("InputFieldWrapper gets the expected props", () => {
    it("renders an invalid InputPressable", () => {
      const props = { invalid: true };
      render(<InputPressable {...props} />);
      expect(MockInputFieldWrapper).toHaveBeenCalledWith(
        expect.objectContaining(props),
      );
    });

    it("renders an invalid InputPressable with text", () => {
      const props = { invalid: "this test is invalid" };
      render(<InputPressable {...props} />);
      expect(MockInputFieldWrapper).toHaveBeenCalledWith(
        expect.objectContaining(props),
      );
    });

    it("renders a valid InputText with empty string", () => {
      const props = { invalid: "" };
      render(<InputPressable {...props} />);
      expect(MockInputFieldWrapper).toHaveBeenCalledWith(
        expect.objectContaining(props),
      );
    });
    it("renders a disabled InputPressable", () => {
      const props = { disabled: true };
      render(<InputPressable {...props} />);
      expect(MockInputFieldWrapper).toHaveBeenCalledWith(
        expect.objectContaining(props),
      );
    });

    it("renders an InputPressable with a placeholder", () => {
      const props = { placeholder: "test placeholder" };
      render(<InputPressable {...props} />);
      expect(MockInputFieldWrapper).toHaveBeenCalledWith(
        expect.objectContaining(props),
      );
    });
  });

  it("renders an InputPressable with a value", () => {
    const value = "test value";
    const { getByText } = render(<InputPressable value={value} />);
    expect(getByText(value, { includeHiddenElements: true })).toBeTruthy();
  });

  it("renders a prefix label when specified", () => {
    const label = "test label";
    const { getByText } = render(
      <InputPressable prefix={{ label }} value="hey" />,
    );
    expect(getByText(label)).toBeDefined();
  });

  it("renders a prefix icon when specified", () => {
    const { getByTestId } = render(
      <InputPressable prefix={{ icon: "calendar" }} />,
    );
    expect(getByTestId("calendar")).toBeDefined();
  });

  it("renders a suffix icon when specified", () => {
    const { getByTestId } = render(
      <InputPressable suffix={{ icon: "calendar" }} />,
    );
    expect(getByTestId("calendar")).toBeDefined();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const a11yLabel = "test InputPressable";
    const { getByLabelText } = render(
      <InputPressable
        onPress={onPressMock}
        value="test value"
        accessibilityLabel={a11yLabel}
      />,
    );

    fireEvent.press(getByLabelText(a11yLabel));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  describe("when given a value", () => {
    const value = "A value";

    it("renders an InputPressable with the value", () => {
      const { getByText } = render(<InputPressable value={value} />);
      expect(getByText(value, { includeHiddenElements: true })).toBeDefined();
    });

    it("renders a prefix label when specified", () => {
      const { getByText } = render(
        <InputPressable prefix={{ label: "test" }} value={value} />,
      );
      expect(getByText(value, { includeHiddenElements: true })).toBeDefined();
    });

    it("renders a suffix label when specified", () => {
      const { getByText } = render(
        <InputPressable suffix={{ label: "test" }} value={value} />,
      );
      expect(getByText(value, { includeHiddenElements: true })).toBeDefined();
    });
  });
});

describe("accessibilityLabel", () => {
  it("uses accessibilityLabel if specified", () => {
    const { getByLabelText } = render(
      <InputPressable
        value="test value"
        placeholder="placeholder"
        accessibilityLabel="accessibilityLabel"
      />,
    );

    expect(getByLabelText("accessibilityLabel")).toBeTruthy();
  });

  it("uses placeholder if unspecified", () => {
    const { getByLabelText } = render(
      <InputPressable value="test value" placeholder="placeholder" />,
    );

    expect(getByLabelText("placeholder")).toBeTruthy();
  });
});
