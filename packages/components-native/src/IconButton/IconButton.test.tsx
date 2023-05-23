import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { IconButton } from "./IconButton";
import { Text } from "../Text";

describe("IconButton", () => {
  it("renders an IconButton", () => {
    const pressHandler = jest.fn();
    const { getByTestId } = render(
      <IconButton
        onPress={pressHandler}
        name="job"
        accessibilityLabel="Job Button"
        testID="JobButton"
      />,
    );

    expect(getByTestId("JobButton")).toBeDefined();
  });

  it("should call the onPress", () => {
    const pressHandler = jest.fn();
    const { getByLabelText } = render(
      <IconButton
        onPress={pressHandler}
        name="job"
        accessibilityLabel={"Job Button"}
      />,
    );
    fireEvent.press(getByLabelText("Job Button"));
    expect(pressHandler).toHaveBeenCalled();
  });

  it("should render badge component", () => {
    const pressHandler = jest.fn();
    const badge = <Text>Hi</Text>;
    const { getByText } = render(
      <IconButton
        onPress={pressHandler}
        name="job"
        badge={badge}
        accessibilityLabel={"Job Button"}
      />,
    );
    expect(getByText("Hi")).toBeDefined();
  });

  it("should render IconButton with custom color", () => {
    const pressHandler = jest.fn();
    const { getByLabelText } = render(
      <IconButton
        onPress={pressHandler}
        name="job"
        customColor="#f33323"
        accessibilityLabel={"Job Button"}
      />,
    );
    const iconBtnColorProp = getByLabelText("Job Button").findByProps({
      customColor: "#f33323",
    }).props.customColor;

    expect(iconBtnColorProp).toEqual("#f33323");
  });

  it("should expose testID", () => {
    const pressHandler = jest.fn();
    const testID = "JobButton";
    const { getByTestId } = render(
      <IconButton
        onPress={pressHandler}
        name="job"
        accessibilityLabel={"Job Button"}
        testID={testID}
      />,
    );
    fireEvent.press(getByTestId(testID));
    expect(pressHandler).toHaveBeenCalled();
  });
});
