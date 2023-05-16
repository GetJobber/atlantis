import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { ActionItemContainer } from "./ActionItemContainer";
import { Text } from "../../Text";

describe("ActionItemContainer", () => {
  const testID = "actionItemContainer";
  const text = "some text";

  it("should render a pressable header", () => {
    const handlePress = jest.fn();

    const { getByTestId } = render(
      <ActionItemContainer onPress={handlePress} testID={testID}>
        <Text>{text}</Text>
      </ActionItemContainer>,
    );

    const container = getByTestId(testID);
    expect(container.props.accessibilityRole).toBe("button");

    fireEvent.press(container);
    expect(handlePress).toHaveBeenCalled();
  });

  it("should render an un-pressable header", () => {
    const { getByTestId } = render(
      <ActionItemContainer testID={testID}>
        <Text>{text}</Text>
      </ActionItemContainer>,
    );

    const container = getByTestId(testID);
    expect(container.props.accessibilityRole).not.toBe("button");
    expect(container.props.onPress).toBeUndefined();
  });
});
