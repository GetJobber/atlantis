import React from "react";
import { render } from "@testing-library/react-native";
import { TextStyle } from "react-native";
import {
  SuffixIcon,
  SuffixIconProps,
  SuffixLabel,
  SuffixLabelProps,
} from "./Suffix";
import { typographyStyles } from "../../../Typography";

const mockLabel = "$";

function setupLabel({
  disabled = false,
  focused = false,
  hasMiniLabel = false,
  inputInvalid = false,
  label = mockLabel,
  styleOverride,
}: Partial<SuffixLabelProps>) {
  return render(
    <SuffixLabel
      disabled={disabled}
      focused={focused}
      hasMiniLabel={hasMiniLabel}
      inputInvalid={inputInvalid}
      label={label}
      styleOverride={styleOverride}
    />,
  );
}

function setupIcon({
  disabled = false,
  focused = false,
  hasMiniLabel = false,
  inputInvalid = false,
  icon = "invoice",
}: Partial<SuffixIconProps>) {
  return render(
    <SuffixIcon
      disabled={disabled}
      focused={focused}
      hasMiniLabel={hasMiniLabel}
      inputInvalid={inputInvalid}
      icon={icon}
    />,
  );
}

describe("Suffix", () => {
  it("renders a suffix label when specified", () => {
    const { getByText } = setupLabel({});
    expect(getByText(mockLabel)).toBeDefined();
  });

  it("renders a suffix icon when specified", () => {
    const { getByTestId } = setupIcon({});
    expect(getByTestId("invoice")).toBeDefined();
  });

  describe("Custom Label Style", () => {
    it("uses default styling when no style override is provided", () => {
      const { getByText } = setupLabel({});
      const suffix = getByText(mockLabel);
      const expectedStyle = [
        typographyStyles.baseRegularRegular,
        typographyStyles.base,
        typographyStyles.startAlign,
        typographyStyles.defaultSize,
        typographyStyles.baseLetterSpacing,
      ];
      expect(suffix.props.style).toEqual(expectedStyle);
    });

    it("uses style override for label when provided", () => {
      const styleOverride = {
        fontSize: 50,
        color: "purple",
      };
      const { getByText } = setupLabel({ styleOverride });
      const suffix = getByText(mockLabel);
      const flattenedStyle = suffix.props.style.reduce(
        (style: TextStyle, additionalStyles: TextStyle) => ({
          ...style,
          ...additionalStyles,
        }),
        {},
      );

      const expectedStyle = {
        ...typographyStyles.baseRegularRegular,
        lineHeight: typographyStyles.defaultSize.lineHeight,
        ...styleOverride,
      };

      expect(flattenedStyle).toEqual(expectedStyle);
    });
  });
});
