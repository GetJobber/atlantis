import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { AccessibilityInfo, View } from "react-native";
import { SelectDefaultPicker } from "./SelectDefaultPicker";
import { Text } from "../../../Text";

const A11yInfoSpy = jest.spyOn(AccessibilityInfo, "isScreenReaderEnabled");
const handleChange = jest.fn();

function MockPicker() {
  return React.createElement("MockPicker");
}
const MockPickerItem = () => <></>;
jest.mock("@react-native-picker/picker", () => ({ Picker: MockPicker }));
MockPicker.Item = MockPickerItem;

beforeEach(() => {
  A11yInfoSpy.mockImplementation(() => Promise.resolve(false));
});

afterEach(() => {
  jest.resetAllMocks();
});

const childText = "Click me";

function setup() {
  return render(
    <View testID="SelectDefaultPicker">
      <SelectDefaultPicker
        onChange={handleChange}
        options={[
          { value: "1", label: "First option" },
          { value: "2", label: "Second option" },
        ]}
      >
        <Text>{childText}</Text>
      </SelectDefaultPicker>
    </View>,
  );
}

describe("SelectDefaultPicker", () => {
  it("opens the picker", () => {
    const screen = setup();

    fireEvent.press(screen.getByText(childText));
    expect(
      screen.getByTestId("SelectDefaultPicker").findByType(MockPicker),
    ).toBeDefined();
  });

  it("closes the picker", () => {
    const screen = setup();

    fireEvent.press(screen.getByText(childText));
    fireEvent.press(screen.getByText("Done"));
    expect(
      screen.getByTestId("SelectDefaultPicker").findAllByType(MockPicker),
    ).toEqual([]);
  });

  it("fires the onChange", () => {
    const screen = setup();

    fireEvent.press(screen.getByText(childText));
    const menu = screen
      .getByTestId("SelectDefaultPicker")
      .findByType(MockPicker);

    expect(menu).toBeDefined();
    fireEvent(menu, "onValueChange", "2");
    expect(handleChange).toHaveBeenCalledWith("2");
  });
});
