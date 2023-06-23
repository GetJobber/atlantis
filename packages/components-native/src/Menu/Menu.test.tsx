import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Host } from "react-native-portalize";
import { View } from "react-native";
import { tokens } from "@jobber/design/foundation";
import { Menu, MenuOptionProps, MenuProps } from ".";
import { messages } from "./messages";
import { Icon } from "../Icon";
import { Button } from "../Button";

const mockOnPress = jest.fn();
jest
  .spyOn(View.prototype, "measureInWindow")
  .mockImplementation(cb => cb(50, 50, 100, 100));

const setup = (props?: MenuProps) => {
  return render(
    <Host>
      <Menu
        menuOptions={props?.menuOptions}
        customActivator={props?.customActivator}
      />
    </Host>,
  );
};

describe("Menu", () => {
  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it("renders the default Activator", () => {
    const { getByTestId, getByLabelText } = setup({
      menuOptions: [{ label: "hi", icon: "add", onPress: mockOnPress }],
    });

    expect(getByTestId("more")).toBeDefined();
    expect(getByLabelText(messages.more.defaultMessage)).toBeDefined();
  });

  it("renders every menu option when menu is opened", () => {
    const menuOptions: MenuOptionProps[] = [
      { label: "option1", icon: "add", onPress: mockOnPress },
      { label: "option2", icon: "arrowDown", onPress: mockOnPress },
      { label: "option3", onPress: mockOnPress },
    ];
    const { getByLabelText } = setup({
      menuOptions,
    });

    fireEvent.press(getByLabelText(messages.more.defaultMessage));
    expect(getByLabelText(menuOptions[0].label)).toBeDefined();
    expect(getByLabelText(menuOptions[1].label)).toBeDefined();
    expect(getByLabelText(menuOptions[2].label)).toBeDefined();
  });

  describe("Custom Activator", () => {
    it("renders a custom Activator", () => {
      const { getByTestId } = setup({
        menuOptions: [{ label: "hi", onPress: mockOnPress }],
        customActivator: <Icon name="addNote" />,
      });

      expect(getByTestId("addNote")).toBeDefined();
    });

    it("renders menu when the custom activator is clicked", () => {
      const { getByLabelText, getByTestId, getAllByTestId } = setup({
        menuOptions: [
          { label: "hi", icon: "add", onPress: mockOnPress },
          { label: "option2", onPress: mockOnPress },
        ],
        customActivator: <Icon name="addNote" />,
      });

      fireEvent.press(getByTestId("addNote"));

      expect(getAllByTestId("ATL-MENU-OPTIONS")).toHaveLength(2);
      expect(getByTestId("add")).toBeDefined();
      expect(getByLabelText("hi")).toBeDefined();
    });

    describe("Pressable used as Custom Activator", () => {
      it("menu is open and custom activator's onPress is called", () => {
        const mockActivatorPress = jest.fn();
        const buttonLabel = "Test me!";
        const menuOptions: MenuOptionProps[] = [
          { label: "menuOption", icon: "add", onPress: mockOnPress },
        ];

        const { getByLabelText } = setup({
          menuOptions,
          customActivator: (
            <Button label={buttonLabel} onPress={mockActivatorPress} />
          ),
        });

        fireEvent.press(getByLabelText(buttonLabel));

        expect(mockActivatorPress).toHaveBeenCalledTimes(1);
        expect(getByLabelText(menuOptions[0].label)).toBeDefined();
      });
    });
  });

  describe("Menu Options", () => {
    it("fires the onPress of the menu option", () => {
      const { getByLabelText } = setup({
        menuOptions: [
          {
            label: "hi",
            icon: "add",
            onPress: mockOnPress,
            destructive: true,
          },
        ],
      });

      fireEvent.press(getByLabelText(messages.more.defaultMessage));
      fireEvent.press(getByLabelText("hi"));
      expect(mockOnPress).toHaveBeenCalled();
    });

    it("renders a menuOption with an icon with destructive styling", () => {
      const { getByLabelText, getByTestId } = setup({
        menuOptions: [
          { label: "hi", icon: "add", onPress: mockOnPress, destructive: true },
        ],
      });

      fireEvent.press(getByLabelText(messages.more.defaultMessage));
      expect(getByTestId("add").props.style).toContainEqual({
        display: "flex",
        fill: tokens["color-critical"],
        height: 24,
        verticalAlign: "middle",
        width: 24,
      });
    });

    it("closes the menu after clicking on a menu option", () => {
      const { getByLabelText, queryByLabelText } = setup({
        menuOptions: [
          {
            label: "hi",
            icon: "add",
            onPress: mockOnPress,
            destructive: true,
          },
        ],
      });

      fireEvent.press(getByLabelText(messages.more.defaultMessage));
      fireEvent.press(getByLabelText("hi"));
      expect(mockOnPress).toHaveBeenCalled();
      expect(queryByLabelText("hi")).toBeNull();
    });

    it("transforms the text", () => {
      const { getByLabelText, getByText } = setup({
        menuOptions: [
          {
            label: "hi",
            icon: "add",
            onPress: mockOnPress,
            textTransform: "capitalize",
          },
        ],
      });
      fireEvent.press(getByLabelText(messages.more.defaultMessage));
      expect(getByText("Hi")).toBeDefined();
    });

    it("does not transform the text when textTransform set to none", () => {
      const { getByLabelText, getByText } = setup({
        menuOptions: [
          {
            label: "hi",
            icon: "add",
            onPress: mockOnPress,
            textTransform: "none",
          },
        ],
      });
      fireEvent.press(getByLabelText(messages.more.defaultMessage));
      expect(getByText("hi")).toBeDefined();
    });
  });

  it("renders a menu when the default activator is clicked", () => {
    const { getByLabelText, getByTestId } = setup({
      menuOptions: [{ label: "hi", icon: "add", onPress: mockOnPress }],
    });

    fireEvent.press(getByLabelText(messages.more.defaultMessage));

    expect(getByTestId("ATL-MENU-OPTIONS")).toBeDefined();
    expect(getByTestId("add")).toBeDefined();
    expect(getByLabelText("hi")).toBeDefined();
  });
});
