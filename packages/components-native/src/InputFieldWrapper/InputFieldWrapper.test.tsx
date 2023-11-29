import React from "react";
import { RenderAPI, fireEvent, render } from "@testing-library/react-native";
// eslint-disable-next-line no-restricted-imports
import { Text, ViewStyle } from "react-native";
import {
  InputFieldWrapper,
  InputFieldWrapperProps,
  commonInputStyles,
} from ".";
import { styles } from "./InputFieldWrapper.style";
import { typographyStyles } from "../Typography";

const mockLabel = { label: "$" };

type InputFieldWrapperTestProps = Omit<InputFieldWrapperProps, "children">;

function renderInputFieldWrapper(props: InputFieldWrapperTestProps): RenderAPI {
  return render(
    <InputFieldWrapper {...props}>
      <Text>Test</Text>
    </InputFieldWrapper>,
  );
}

function renderWithPrefixLabel(hasValue: boolean): RenderAPI {
  return renderInputFieldWrapper({ prefix: mockLabel, hasValue });
}

function renderWithSuffixLabel(hasValue: boolean): RenderAPI {
  return renderInputFieldWrapper({ suffix: mockLabel, hasValue });
}

const clearInput = "Clear input";
describe("InputFieldWrapper", () => {
  it("renders an invalid InputFieldWrapper", () => {
    const { getByTestId } = renderInputFieldWrapper({ invalid: true });

    expect(getByTestId("ATL-InputFieldWrapper").props.style).toContainEqual(
      styles.inputInvalid,
    );
  });

  it("renders an invalid InputFieldWrapper with non-empty string", () => {
    const invalid = "invalid string test";
    const { getByText, getByTestId } = renderInputFieldWrapper({
      invalid,
    });

    expect(getByTestId("ATL-InputFieldWrapper").props.style).toContainEqual(
      styles.inputInvalid,
    );
    expect(getByText(invalid, { includeHiddenElements: true })).toBeDefined();
  });

  it("renders a valid InputFieldWrapper with empty string", () => {
    const { getByTestId } = renderInputFieldWrapper({ invalid: "" });

    expect(getByTestId("ATL-InputFieldWrapper").props.style).not.toContainEqual(
      styles.inputInvalid,
    );
  });

  it("renders a disabled InputFieldWrapper", () => {
    const { getByTestId } = renderInputFieldWrapper({ disabled: true });

    expect(getByTestId("ATL-InputFieldWrapper").props.style).toContainEqual({
      backgroundColor: "rgb(225, 225, 225)",
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    });
  });

  it("renders a InputFieldWrapper with placeholder", () => {
    const placeholder = "test";
    const { getByText } = renderInputFieldWrapper({ placeholder });

    expect(
      getByText(placeholder, { includeHiddenElements: true }),
    ).toBeTruthy();
  });

  it("renders a prefix icon when specified", () => {
    const { getByTestId } = renderInputFieldWrapper({
      prefix: { icon: "invoice" },
    });
    expect(getByTestId("invoice")).toBeDefined();
  });

  it("renders a suffix icon when specified", () => {
    const { getByTestId } = renderInputFieldWrapper({
      suffix: { icon: "invoice" },
    });
    expect(getByTestId("invoice")).toBeDefined();
  });

  describe("when hasValue", () => {
    it("renders a prefix label", () => {
      const { getByText } = renderWithPrefixLabel(true);
      expect(getByText(mockLabel.label)).toBeDefined();
    });

    it("renders a suffix label", () => {
      const { getByText } = renderWithSuffixLabel(true);
      expect(getByText(mockLabel.label)).toBeDefined();
    });
  });

  describe("when not hasValue", () => {
    it("does not render a prefix label", () => {
      const { queryByText } = renderWithPrefixLabel(false);
      expect(queryByText(mockLabel.label)).toBeNull();
    });

    it("does not render a suffix label", () => {
      const { queryByText } = renderWithSuffixLabel(false);
      expect(queryByText(mockLabel.label)).toBeNull();
    });
  });

  describe("ClearAction", () => {
    it("renders the Clear Action Button when showClearAction is true", () => {
      const { getByLabelText } = renderInputFieldWrapper({
        showClearAction: true,
      });
      expect(getByLabelText(clearInput)).toBeDefined();
    });

    it("does not render the Clear Action Button when showClearAction is false", () => {
      const { queryByLabelText } = renderInputFieldWrapper({
        showClearAction: false,
      });
      expect(queryByLabelText(clearInput)).toBeNull();
    });

    it("calls onClear when the Clear Action button is pressed", () => {
      const onClear = jest.fn();
      const { getByLabelText } = renderInputFieldWrapper({
        showClearAction: true,
        onClear: onClear,
      });
      fireEvent(getByLabelText(clearInput), "press");
      expect(onClear).toHaveBeenCalled();
    });
  });

  describe("Custom Styling", () => {
    it("has the default container styling when no style override is provided", () => {
      const { getByTestId } = renderInputFieldWrapper({});
      const container = getByTestId("ATL-InputFieldWrapper");
      expect(container.props.style).toContainEqual({
        ...commonInputStyles.container,
      });
    });

    it("shows the container style override when provided", () => {
      const styleOverride = {
        container: {
          backgroundColor: "purple",
          width: "50%",
        },
      };
      const { getByTestId } = renderInputFieldWrapper({
        styleOverride,
      });
      const container = getByTestId("ATL-InputFieldWrapper");

      const flattenedStyle = container.props.style.reduce(
        (style: ViewStyle, additionalStyles: ViewStyle) => ({
          ...style,
          ...additionalStyles,
        }),
        {},
      );
      expect(flattenedStyle.backgroundColor).toEqual(
        styleOverride.container.backgroundColor,
      );
      expect(flattenedStyle.width).toEqual(styleOverride.container.width);
      expect(flattenedStyle.borderColor).toEqual(
        commonInputStyles.container.borderColor,
      );
      expect(flattenedStyle.marginVertical).toEqual(
        commonInputStyles.container.marginVertical,
      );
    });
    it("has the default placeholder styling when no style override is provided", () => {
      const placeholderText = "myplaceholder";
      const { getByText } = renderInputFieldWrapper({
        placeholder: placeholderText,
        focused: true,
      });
      const placeholder = getByText(placeholderText, {
        includeHiddenElements: true,
      });

      expect(placeholder.props.style).toContainEqual(
        typographyStyles.interactive,
      );
      expect(placeholder.props.style).toContainEqual(
        typographyStyles.defaultSize,
      );
    });

    it("shows the placeholder style override when provided", () => {
      const placeholderText = "myplaceholder";
      const styleOverride = {
        placeholderText: {
          color: "purple",
          fontSize: 30,
        },
      };
      const { getByText } = renderInputFieldWrapper({
        placeholder: placeholderText,
        styleOverride,
      });
      const placeholder = getByText(placeholderText, {
        includeHiddenElements: true,
      });

      const flattenedStyle = placeholder.props.style.reduce(
        (style: ViewStyle, additionalStyles: ViewStyle) => ({
          ...style,
          ...additionalStyles,
        }),
        {},
      );
      expect(flattenedStyle.color).toEqual(styleOverride.placeholderText.color);
      expect(flattenedStyle.fontSize).toEqual(
        styleOverride.placeholderText.fontSize,
      );
    });
  });
});
