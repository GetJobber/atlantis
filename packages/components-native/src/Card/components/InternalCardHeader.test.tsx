import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { InternalCardHeader } from "./InternalCardHeader";

it("should render a pressable header", () => {
  const handlePress = jest.fn();
  const screen = render(
    <InternalCardHeader collapsable onPress={handlePress} testID="cardHeader">
      🍩
    </InternalCardHeader>,
  );

  const header = screen.getByTestId("cardHeader");
  expect(header).toBeDefined();
  expect(header.props.accessibilityRole).toBe("button");

  fireEvent.press(header);
  expect(handlePress).toHaveBeenCalled();
});

it("should render an un-pressable header", () => {
  const screen = render(
    <InternalCardHeader collapsable testID="cardHeader">
      🌞
    </InternalCardHeader>,
  );

  const header = screen.getByTestId("cardHeader");
  expect(header).toBeDefined();
  expect(header.props.onPress).toBeUndefined();
});
