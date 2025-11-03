import React from "react";
import { render, renderHook } from "@testing-library/react-native";
import type { TextStyle } from "react-native";
import type { SuffixIconProps, SuffixLabelProps } from "./Suffix";
import { SuffixIcon, SuffixLabel } from "./Suffix";
import { useTypographyStyles } from "../../../Typography";

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
  inputInvalid = false,
  icon = "invoice",
}: Partial<SuffixIconProps>) {
  return render(
    <SuffixIcon
      disabled={disabled}
      focused={focused}
      inputInvalid={inputInvalid}
      icon={icon}
    />,
  );
}

let typographyStyles: ReturnType<typeof useTypographyStyles>;

beforeAll(() => {
  const typographyStylesHook = renderHook(() => useTypographyStyles());
  typographyStyles = typographyStylesHook.result.current;
});

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
