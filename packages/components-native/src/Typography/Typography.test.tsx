import React from "react";
import { render } from "@testing-library/react-native";
import { I18nManager } from "react-native";
import { Typography } from "./Typography";

it("renders text with no additional props", () => {
  const typography = render(<Typography>Test Text</Typography>);
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with regular style", () => {
  const typography = render(
    <Typography fontStyle="regular">Test Text</Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with bold style", () => {
  const typography = render(
    <Typography fontWeight="bold">Test Text</Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with italic style", () => {
  const typography = render(
    <Typography fontStyle="italic">Test Text</Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with bold weight and italic style", () => {
  const typography = render(
    <Typography fontStyle="italic" fontWeight="bold">
      Test Text
    </Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with bold style and display as fontFamily", () => {
  const typography = render(
    <Typography fontFamily="display" fontWeight="bold">
      Test Text
    </Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with extraBold weight and display as fontFamily", () => {
  const typography = render(
    <Typography fontFamily="display" fontWeight="extraBold">
      Test Text
    </Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with black style and display as fontFamily", () => {
  const typography = render(
    <Typography fontFamily="display" fontWeight="black">
      Test Text
    </Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with uppercase transform", () => {
  const typography = render(
    <Typography transform="uppercase">Test Text</Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with lowercase transform", () => {
  const typography = render(
    <Typography transform="lowercase">Test Text</Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with white color", () => {
  const typography = render(<Typography color="white">Test Text</Typography>);
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with green color", () => {
  const typography = render(<Typography color="green">Test Text</Typography>);
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with default color", () => {
  const typography = render(<Typography color="default">Test Text</Typography>);
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with center align", () => {
  const typography = render(<Typography align="center">Test Text</Typography>);
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text respecting the text direction", () => {
  I18nManager.isRTL = true;

  const typography = render(<Typography>Test Text</Typography>);
  expect(typography.toJSON()).toMatchSnapshot();
  I18nManager.isRTL = false;
});

it("renders text with small size", () => {
  const typography = render(<Typography size="small">Test Text</Typography>);
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with large size", () => {
  const typography = render(<Typography size="large">Test Text</Typography>);
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with default size", () => {
  const typography = render(<Typography size="default">Test Text</Typography>);
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with multiple properties", () => {
  const typography = render(
    <Typography fontWeight="bold" size="large" color="white">
      Test Text
    </Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with line height override", () => {
  const typography = render(
    <Typography lineHeight="jumbo">Test Text</Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with letter spacing", () => {
  const typography = render(
    <Typography letterSpacing="loose">Test Text</Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with reverseTheme true with reversible color", () => {
  const typography = render(
    <Typography reverseTheme={true} color="success">
      Test Text
    </Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with reverseTheme false with reversible color", () => {
  const typography = render(
    <Typography reverseTheme={false} color="success">
      Test Text
    </Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with adjustsFontSizeToFit set to true", () => {
  const typography = render(
    <Typography adjustsFontSizeToFit={true} maxLines="single">
      Test Text that happens to be longer than the rest of the text. This just
      keeps going on and on. maxLines being set will make this work its magic
    </Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text accessibilityRole", () => {
  const typography = render(
    <Typography accessibilityRole="text">Test Text</Typography>,
  );
  expect(typography.getByRole("text")).toBeDefined();
});

it("renders header accessibilityRole", () => {
  const typography = render(
    <Typography accessibilityRole="header">Test Text</Typography>,
  );
  expect(typography.getByRole("header")).toBeDefined();
});

it("renders text using the maxLines is also passed", () => {
  const typography = render(
    <Typography maxLines="small">
      Test Text that happens to be longer than the rest of the text. This just
      keeps going on and on. maxLines being set will make this work its magic
    </Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text with strikethough styling", () => {
  const typography = render(
    <Typography strikeThrough={true}>Test Text</Typography>,
  );
  expect(typography.toJSON()).toMatchSnapshot();
});

it("renders text that is inaccessible", () => {
  const typography = render(
    <Typography hideFromScreenReader={true}>Test Text</Typography>,
  );

  expect(typography.root.props).toEqual(
    expect.objectContaining({
      accessible: false,
      accessibilityRole: "none",
      importantForAccessibility: "no-hide-descendants",
    }),
  );
});
