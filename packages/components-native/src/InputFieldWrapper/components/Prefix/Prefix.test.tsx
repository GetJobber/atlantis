import React from "react";
import { render } from "@testing-library/react-native";
import { TextStyle } from "react-native";
import {
  PrefixIcon,
  PrefixIconProps,
  PrefixLabel,
  PrefixLabelProps,
} from "./Prefix";
import { typographyStyles } from "../../../Typography";

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
      }).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("for the icon", () => {
      const tree = setupIcon({
        focused: true,
      }).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("updates the styles when input is invalid", () => {
    it("for the label", () => {
      const tree = setupLabel({
        inputInvalid: true,
      }).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("for the icon", () => {
      const tree = setupIcon({
        inputInvalid: true,
      }).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it("updates the position of the label when a value is entered", () => {
    const tree = setupLabel({
      hasMiniLabel: true,
    }).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("when disabled", () => {
    it("updates the label", () => {
      const tree = setupLabel({
        disabled: true,
      }).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("updates the icon", () => {
      const tree = setupIcon({
        disabled: true,
      }).toJSON();
      expect(tree).toMatchSnapshot();
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
