import React from "react";
import { render } from "@testing-library/react-native";
import { TextStyle } from "react-native";
import { ReactTestInstance } from "react-test-renderer";
import {
  PrefixIcon,
  PrefixIconProps,
  PrefixLabel,
  PrefixLabelProps,
  prefixIconTestId,
  prefixLabelTestId,
} from "./Prefix";
import { typographyStyles } from "../../../Typography";
import { styles } from "../../InputFieldWrapper.style";
import { tokens } from "../../../utils/design";
import * as IconComponent from "../../../Icon/Icon";

const iconSpy = jest.spyOn(IconComponent, "Icon");

const mockLabel = "$";

function setupLabel({
  disabled = false,
  focused = false,
  hasMiniLabel = false,
  inputInvalid = false,
  label = mockLabel,
  styleOverride,
}: Partial<PrefixLabelProps>) {
  return render(
    <PrefixLabel
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
}: Partial<PrefixIconProps>) {
  return render(
    <PrefixIcon
      disabled={disabled}
      focused={focused}
      hasMiniLabel={hasMiniLabel}
      inputInvalid={inputInvalid}
      icon={icon}
    />,
  );
}

describe("Prefix", () => {
  it("renders a prefix label when specified", () => {
    const { getByText } = setupLabel({});
    expect(getByText(mockLabel)).toBeDefined();
  });

  it("renders a prefix icon when specified", () => {
    const { getByTestId } = setupIcon({});
    expect(getByTestId("invoice")).toBeDefined();
  });

  describe("updates the styles when focused", () => {
    it("for the label", () => {
      const tree = setupLabel({
        focused: true,
      });
      const expectedStyle = { ...styles.fieldAffix, ...styles.inputFocused };
      const prefixLabel = tree.getByTestId(prefixLabelTestId);
      const flattenedStyle = prefixLabel.props.style.reduce(
        (style: TextStyle, additionalStyles: TextStyle) => ({
          ...style,
          ...additionalStyles,
        }),
        {},
      );

      expect(flattenedStyle).toEqual(expectedStyle);
    });

    it("for the icon", () => {
      const tree = setupIcon({
        focused: true,
      });
      const expectedStyle = { ...styles.fieldAffix, ...styles.inputFocused };
      const icon = tree.getByTestId(prefixIconTestId);
      const flattenedStyle = icon.props.style.reduce(
        (style: TextStyle, additionalStyles: TextStyle) => ({
          ...style,
          ...additionalStyles,
        }),
        {},
      );

      expect(flattenedStyle).toEqual(expectedStyle);
    });
  });

  describe("updates the styles when input is invalid", () => {
    it("for the label", () => {
      const tree = setupLabel({
        inputInvalid: true,
      });
      const expectedStyle = { ...styles.fieldAffix, ...styles.inputInvalid };
      const prefixLabel = tree.getByTestId(prefixLabelTestId);
      const flattenedStyle = prefixLabel.props.style.reduce(
        (style: TextStyle, additionalStyles: TextStyle) => ({
          ...style,
          ...additionalStyles,
        }),
        {},
      );

      expect(flattenedStyle).toEqual(expectedStyle);
    });

    it("for the icon", () => {
      const tree = setupIcon({
        inputInvalid: true,
      });
      const expectedStyle = { ...styles.fieldAffix, ...styles.inputInvalid };
      const prefixIcon = tree.getByTestId(prefixIconTestId);
      const flattenedStyle = prefixIcon.props.style.reduce(
        (style: TextStyle, additionalStyles: TextStyle) => ({
          ...style,
          ...additionalStyles,
        }),
        {},
      );

      expect(flattenedStyle).toEqual(expectedStyle);
    });
  });

  it("updates the position of the label when a value is entered", () => {
    const tree = setupLabel({
      hasMiniLabel: true,
    });
    const prefixLabel = tree.getByTestId(prefixLabelTestId);
    const labelWrapper = prefixLabel.children[0] as ReactTestInstance;
    const expectedStyle = [styles.prefixLabel, styles.fieldAffixMiniLabel];
    expect(labelWrapper.props.style).toEqual(expectedStyle);
  });

  describe("when disabled", () => {
    it("updates the label", () => {
      const tree = setupLabel({
        disabled: true,
      });
      const prefixLabel = tree.getByText(mockLabel);
      const expectedStyle = [
        typographyStyles.baseRegularRegular,
        typographyStyles.disabled,
        typographyStyles.startAlign,
        typographyStyles.defaultSize,
        typographyStyles.baseLetterSpacing,
      ];
      expect(prefixLabel.props.style).toEqual(expectedStyle);
    });

    it("updates the icon", () => {
      setupIcon({
        disabled: true,
      });
      expect(iconSpy).toHaveBeenCalledWith(
        {
          customColor: tokens["color-disabled"],
          name: "invoice",
        },
        {},
      );
    });
  });

  describe("Custom Label Style", () => {
    it("uses default styling when style override not used", () => {
      const { getByText } = setupLabel({});
      const prefix = getByText(mockLabel);
      const expectedStyle = [
        typographyStyles.baseRegularRegular,
        typographyStyles.base,
        typographyStyles.startAlign,
        typographyStyles.defaultSize,
        typographyStyles.baseLetterSpacing,
      ];
      expect(prefix.props.style).toEqual(expectedStyle);
    });

    it("uses style override for label when provided", () => {
      const styleOverride = {
        fontSize: 50,
        color: "purple",
      };
      const { getByText } = setupLabel({ styleOverride });
      const prefix = getByText(mockLabel);
      const flattenedStyle = prefix.props.style.reduce(
        (style: TextStyle, additionalStyles: TextStyle) => ({
          ...style,
          ...additionalStyles,
        }),
        {},
      );

      const expectedStyle = {
        ...styleOverride,
        ...typographyStyles.baseRegularRegular,
        lineHeight: typographyStyles.defaultSize.lineHeight,
      };

      expect(flattenedStyle).toEqual(expectedStyle);
    });
  });
});
