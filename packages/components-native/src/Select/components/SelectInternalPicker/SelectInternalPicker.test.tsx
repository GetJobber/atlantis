import React, { ElementType } from "react";
import { cleanup, fireEvent, render } from "@testing-library/react-native";
import { View } from "react-native";
import { SelectInternalPicker } from ".";
import { SelectInternalPickerProps } from "../../types";
import { Text } from "../../../Text";

let Platform: { OS: "ios" | "android"; Version: string | number };
beforeEach(() => {
  Platform = require("react-native").Platform;
  Object.defineProperty(Platform, "Version", { get: () => undefined });
});

function MockPicker() {
  return React.createElement("MockPicker");
}
const MockPickerItem = () => <></>;
jest.mock("@react-native-picker/picker", () => ({ Picker: MockPicker }));
MockPicker.Item = MockPickerItem;

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

const RCTPicker = "RCTPicker" as ElementType;
const childText = "Click me";
const handleChange = jest.fn();

function setup(props?: Partial<SelectInternalPickerProps>) {
  return render(
    <View testID="SelectInternalPicker">
      <SelectInternalPicker
        onChange={handleChange}
        disabled={props?.disabled}
        options={[
          { value: "1", label: "First option" },
          { value: "2", label: "Second option" },
        ]}
      >
        <Text>{childText}</Text>
      </SelectInternalPicker>
    </View>,
  );
}

describe("SelectInternalPicker", () => {
  it("fires the onChange", () => {
    const screen = setup();
    fireEvent.press(screen.getByText(childText));
    const menu = screen
      .getByTestId("SelectInternalPicker")
      .findByType(MockPicker);

    expect(menu).toBeDefined();
    fireEvent(menu, "onChange", "1");
    expect(handleChange).toHaveBeenCalledWith("1");
  });

  describe("iOS 13 and below fallback", () => {
    it("renders the iOS 14 native menu picker", () => {
      Platform.OS = "ios";
      Object.defineProperty(Platform, "Version", { get: () => "14.1" });

      const screen = setup();

      const menu = screen
        .getByTestId("SelectInternalPicker")
        .findByType(RCTPicker);

      expect(menu).toBeDefined();
    });

    it.each<[typeof Platform.OS, typeof Platform.Version]>([
      ["ios", "13.1"],
      ["android", 100],
    ])("renders the menu picker on %s", (os, version) => {
      Platform.OS = os;
      Object.defineProperty(Platform, "Version", { get: () => version });
      const screen = setup();

      fireEvent.press(screen.getByText(childText));
      expect(
        screen.getByTestId("SelectInternalPicker").findByType(MockPicker),
      ).toBeDefined();
    });
  });

  describe("Disabled", () => {
    it("should not render the picker", () => {
      const screen = setup({ disabled: true });

      const menu = screen
        .getByTestId("SelectInternalPicker")
        .findAllByType(RCTPicker);

      expect(menu).toEqual([]);
    });
  });
});
