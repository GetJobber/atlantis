import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from ".";

it("renders text with no additional props", () => {
  const text = render(<Text>Test Text</Text>);
  expect(text.toJSON()).toMatchSnapshot();
});

it("renders text with base variation", () => {
  const text = render(<Text variation="base">Test Text</Text>);
  expect(text.toJSON()).toMatchSnapshot();
});

it("renders text with success variation", () => {
  const text = render(<Text variation="success">Test Text</Text>);
  expect(text.toJSON()).toMatchSnapshot();
});

it("renders text with error variation", () => {
  const text = render(<Text variation="error">Test Text</Text>);
  expect(text.toJSON()).toMatchSnapshot();
});

it("renders text with warn variation", () => {
  const text = render(<Text variation="warn">Test Text</Text>);
  expect(text.toJSON()).toMatchSnapshot();
});

it("renders text with info variation", () => {
  const text = render(<Text variation="info">Test Text</Text>);
  expect(text.toJSON()).toMatchSnapshot();
});

it("renders text with subdued variation", () => {
  const text = render(<Text variation="subdued">Test Text</Text>);
  expect(text.toJSON()).toMatchSnapshot();
});

it("renders text with success variation reverseTheme true", () => {
  const text = render(
    <Text variation="success" reverseTheme={true}>
      Test Text
    </Text>,
  );
  expect(text.toJSON()).toMatchSnapshot();
});

it("renders text with error variation reverseTheme true", () => {
  const text = render(
    <Text variation="error" reverseTheme={true}>
      Test Text
    </Text>,
  );
  expect(text.toJSON()).toMatchSnapshot();
});

it("renders text supporting with no additional props", () => {
  const text = render(<Text level="textSupporting">Test Text</Text>);
  expect(text.toJSON()).toMatchSnapshot();
});

it("renders text supporting with variation success", () => {
  const text = render(
    <Text level="textSupporting" variation="success">
      Test Text
    </Text>,
  );
  expect(text.toJSON()).toMatchSnapshot();
});

it("renders text supporting with variation success reverseTheme true", () => {
  const text = render(
    <Text level="textSupporting" variation="success" reverseTheme={true}>
      Test Text
    </Text>,
  );
  expect(text.toJSON()).toMatchSnapshot();
});

it("renders text with right alignment", () => {
  const text = render(<Text align="end">Test Text</Text>);
  expect(text.toJSON()).toMatchSnapshot();
});

it("renders text with center alignment", () => {
  const text = render(<Text align="center">Test Text</Text>);
  expect(text.toJSON()).toMatchSnapshot();
});

it("renders text with left alignment", () => {
  const text = render(<Text align="start">Test Text</Text>);
  expect(text.toJSON()).toMatchSnapshot();
});

it("renders text that is scaled down with adjustsFontSize true", () => {
  const text = render(
    <Text maxLines="base" adjustsFontSizeToFit={true}>
      The quick brown fox jumped over the lazy dog. The quick brown fox jumped
      over the lazy dog. The quick brown fox jumped over the lazy dog. The quick
      brown fox jumped over the lazy dog. The quick brown fox jumped over the
      lazy dog. The quick brown fox jumped over the lazy dog
    </Text>,
  );
  expect(text.toJSON()).toMatchSnapshot();
});

it("renders text that is not scaled down with adjustsFontSize false", () => {
  const text = render(
    <Text maxLines="base" adjustsFontSizeToFit={false}>
      The quick brown fox jumped over the lazy dog. The quick brown fox jumped
      over the lazy dog. The quick brown fox jumped over the lazy dog. The quick
      brown fox jumped over the lazy dog. The quick brown fox jumped over the
      lazy dog. The quick brown fox jumped over the lazy dog
    </Text>,
  );
  expect(text.toJSON()).toMatchSnapshot();
});

it("renders text with accessibilityRole set as text", () => {
  const text = render(<Text>Test Text</Text>);
  expect(text.getByRole("text")).toBeDefined();
});

it("renders with strikethrough styling", () => {
  const text = render(<Text strikeThrough={true}>Test Text</Text>);
  expect(text.toJSON()).toMatchSnapshot();
});

it("renders text that is inaccessible", () => {
  const text = render(<Text hideFromScreenReader={true}>Test Text</Text>);
  expect(text.root.props).toEqual(
    expect.objectContaining({
      accessibilityRole: "none",
      accessible: false,
      importantForAccessibility: "no-hide-descendants",
    }),
  );
});
