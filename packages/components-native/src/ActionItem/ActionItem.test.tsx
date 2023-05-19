import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { ActionItem } from "./ActionItem";
import { Button } from "../Button";
import { Text } from "../Text";

describe("ActionItem", () => {
  const pressHandler = jest.fn();
  const defaultActionIcon = "arrowRight";

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should call onPress when ActionItem is pressed", () => {
    const text = "Get out of my swamp";
    const { getByText } = render(
      <ActionItem onPress={pressHandler}>
        <Text>{text}</Text>
      </ActionItem>,
    );

    fireEvent.press(getByText(text));
    expect(pressHandler).toHaveBeenCalled();
  });

  it("should should display title when provided", () => {
    const title = "Profitttt 💰";
    const { getByText } = render(<ActionItem title={title} />);

    expect(getByText(title)).toBeDefined();
  });

  it("should display icon when provided", () => {
    const iconName = "calendar";
    const { getByTestId } = render(
      <ActionItem onPress={pressHandler} icon={iconName} />,
    );

    expect(getByTestId(iconName)).toBeDefined();
  });

  describe("Action Icon", () => {
    it("should display default action icon when custom action icon is not provided", () => {
      const { getByTestId } = render(<ActionItem onPress={pressHandler} />);

      expect(getByTestId(defaultActionIcon)).toBeDefined();
    });

    it("should display custom action icon when provided", () => {
      const iconName = "calendar";
      const { getByTestId, queryByTestId } = render(
        <ActionItem onPress={pressHandler} actionIcon={iconName} />,
      );

      expect(getByTestId(iconName)).toBeDefined();
      expect(queryByTestId(defaultActionIcon)).toBeFalsy();
    });

    it("should not display action icon when onPress does not exist", () => {
      const { queryByTestId } = render(<ActionItem title="Some title" />);

      expect(queryByTestId(defaultActionIcon)).toBeFalsy();
    });

    it("should display arrowRight icon when edit name is used", () => {
      const iconName = "edit";
      const { getByTestId } = render(
        <ActionItem onPress={pressHandler} actionIcon={iconName} />,
      );

      expect(getByTestId(defaultActionIcon)).toBeDefined();
    });

    it("should display actual edit icon when editpencil name is used", () => {
      const iconName = "editpencil";
      const { getByTestId } = render(
        <ActionItem onPress={pressHandler} actionIcon={iconName} />,
      );

      expect(getByTestId("edit")).toBeDefined();
    });
  });

  describe("When child has onPress event", () => {
    const childPressHandler = jest.fn();
    beforeEach(() => {
      childPressHandler.mockClear();
    });

    it("should only call child onPress when child is pressed", () => {
      const buttonLabel = "I am button label";
      const text = "Some other text chillin";
      const { getByText } = render(
        <ActionItem onPress={pressHandler}>
          <Button label={buttonLabel} onPress={childPressHandler} />
          <Text>{text}</Text>
        </ActionItem>,
      );

      fireEvent.press(getByText(buttonLabel));
      expect(childPressHandler).toHaveBeenCalledTimes(1);
      expect(pressHandler).toHaveBeenCalledTimes(0);
    });

    it("should only call parent onPress when the rest of Parent is pressed", () => {
      const buttonLabel = "I am button label";
      const text = "Some other text chillin";
      const { getByText } = render(
        <ActionItem onPress={pressHandler}>
          <Button label={buttonLabel} onPress={childPressHandler} />
          <Text>{text}</Text>
        </ActionItem>,
      );

      fireEvent.press(getByText(text));
      expect(pressHandler).toHaveBeenCalledTimes(1);
      expect(childPressHandler).toHaveBeenCalledTimes(0);
    });
  });
});
