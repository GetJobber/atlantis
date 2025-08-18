import type { CSSProperties, ReactElement } from "react";
import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Path } from "react-native-svg";
import type { ReactTestInstance } from "react-test-renderer";
import type { ButtonType, ButtonVariation } from ".";
import { Button } from ".";
import type { ButtonSize } from "./types";
import { baseButtonHeight, smallButtonHeight } from "./Button.style";
import { tokens } from "../utils/design";

function getIconAndTextColorFromRender({
  type = "primary",
  variation = "work",
}: {
  type?: ButtonType;
  variation?: ButtonVariation;
}) {
  const pressHandler = jest.fn();
  const text = "🌚 I am the text 🌚";
  const iconName = "cog";

  const { getByTestId, getByRole } = render(
    <Button
      onPress={pressHandler}
      label={text}
      icon={iconName}
      type={type}
      variation={variation}
    />,
  );

  const iconColor = getByTestId(iconName).findByType(Path).props.fill;
  const textColor = getByRole("text").props.style.find(
    (style: CSSProperties) => style.color,
  ).color;

  return { iconColor, textColor };
}

function renderButton(element: ReactElement) {
  const instance = render(element);

  const button = instance.getByLabelText(element.props.label);
  expect(button).toBeDefined();
  expect(instance.getByText(element.props.label)).toBeDefined();

  const buttonStyleEl = button.children[0] as ReactTestInstance;
  const buttonStyle = buttonStyleEl.props.style.flat().reduce(
    (mergedStyles: CSSProperties, additionalStyles: CSSProperties) => ({
      ...mergedStyles,
      ...additionalStyles,
    }),
    {},
  );

  return { ...instance, button, buttonStyle };
}

describe("Button", () => {
  it("renders the default primary button", () => {
    const { button, buttonStyle } = renderButton(
      <Button label={"Foo"} onPress={jest.fn()} />,
    );

    expect(button.props.accessibilityRole).toBe("button");
    expect(buttonStyle).toMatchObject({
      backgroundColor: tokens["color-interactive"],
      borderColor: tokens["color-interactive"],
    });
  });

  it.each<[ButtonVariation, Record<string, string>]>([
    ["work", { bgColor: tokens["color-interactive"] }],
    [
      "cancel",
      {
        bgColor: tokens["color-white"],
        borderColor: tokens["color-border"],
      },
    ],
    ["destructive", { bgColor: tokens["color-destructive"] }],
    ["learning", { bgColor: tokens["color-interactive--subtle"] }],
  ])("renders a %s Button", (variation, { bgColor, borderColor }) => {
    const { buttonStyle } = renderButton(
      <Button label={variation} variation={variation} onPress={jest.fn()} />,
    );

    expect(buttonStyle).toMatchObject({
      backgroundColor: bgColor,
      borderColor: borderColor || bgColor,
    });
  });

  it.each<[ButtonType, Record<string, string>]>([
    ["primary", { bgColor: tokens["color-interactive"] }],
    [
      "secondary",
      {
        bgColor: tokens["color-white"],
        borderColor: tokens["color-border"],
      },
    ],
    [
      "tertiary",
      { bgColor: tokens["color-surface"], borderColor: "transparent" },
    ],
  ])("renders a %s Button", (type, { bgColor, borderColor }) => {
    const { buttonStyle } = renderButton(
      <Button label={type} type={type} onPress={jest.fn()} />,
    );

    expect(buttonStyle).toMatchObject({
      backgroundColor: bgColor,
      borderColor: borderColor || bgColor,
    });
  });

  it.each<[ButtonSize, Record<string, number>]>([
    [
      "small",
      {
        minHeight: smallButtonHeight,
      },
    ],
    [
      "base",
      {
        minHeight: baseButtonHeight,
      },
    ],
  ])("renders a %s Button", (size, { minHeight }) => {
    const { buttonStyle } = renderButton(
      <Button label="Button Size" size={size} />,
    );

    expect(buttonStyle).toMatchObject({
      minHeight,
    });
  });

  it("renders a disabled Button", () => {
    const { button, buttonStyle } = renderButton(
      <Button label="Can't touch this" disabled={true} onPress={jest.fn()} />,
    );

    expect(button.props.accessibilityState).toHaveProperty("disabled", true);
    expect(buttonStyle).toMatchObject({
      backgroundColor: tokens["color-disabled--secondary"],
      borderColor: tokens["color-disabled--secondary"],
    });
  });

  it("renders a non-fullWidth Button", () => {
    const expectedValue = { alignSelf: "stretch" };
    const { button, rerender } = renderButton(
      <Button label="Thicc" onPress={jest.fn()} />,
    );

    expect(button.props.style).toContainEqual(expectedValue);

    rerender(<Button label="Thicc" fullWidth={false} onPress={jest.fn()} />);

    expect(button.props.style).not.toContainEqual(expectedValue);
  });

  it("should call the onPress handler", () => {
    const pressHandler = jest.fn();
    const text = "🌚 I am the text 🌚";
    const a11yLabel = "A button";
    const { getByLabelText } = render(
      <Button
        onPress={pressHandler}
        label={text}
        accessibilityLabel={a11yLabel}
      />,
    );

    fireEvent.press(getByLabelText(a11yLabel));
    expect(pressHandler).toHaveBeenCalled();
  });

  describe("accessibilityLabel", () => {
    it("uses accessibilityLabel if specified", () => {
      const pressHandler = jest.fn();
      const text = "🌚 I am the text 🌚";
      const a11yLabel = "A button";
      const { getByLabelText } = render(
        <Button
          onPress={pressHandler}
          label={text}
          accessibilityLabel={a11yLabel}
        />,
      );

      expect(getByLabelText(a11yLabel)).toBeTruthy();
    });

    it("uses label if unspecified", () => {
      const pressHandler = jest.fn();
      const text = "🌚 I am the text 🌚";
      const { getByLabelText } = render(
        <Button onPress={pressHandler} label={text} />,
      );

      expect(getByLabelText(text)).toBeTruthy();
    });
  });

  describe("if an icon is passed in", () => {
    it("renders an icon Button with same color as the Button text", () => {
      const { iconColor, textColor } = getIconAndTextColorFromRender({});

      expect(iconColor).toBe(tokens["color-white"]);
      expect(textColor).toBe(iconColor);
    });

    it("renders the learning variation and secondary type with icon and label with the same color", () => {
      const { iconColor, textColor } = getIconAndTextColorFromRender({
        variation: "learning",
        type: "secondary",
      });
      expect(iconColor).toBe(tokens["color-interactive--subtle"]);
      expect(textColor).toBe(iconColor);
    });

    it("renders the destructive variation and secondary type with icon and label with the same color", () => {
      const { iconColor, textColor } = getIconAndTextColorFromRender({
        variation: "destructive",
        type: "secondary",
      });
      expect(iconColor).toBe(tokens["color-destructive"]);
      expect(textColor).toBe(iconColor);
    });

    it("renders the cancel variation and tertiary type with icon and label with the same color", () => {
      const { iconColor, textColor } = getIconAndTextColorFromRender({
        variation: "cancel",
        type: "tertiary",
      });
      expect(iconColor).toBe(tokens["color-interactive--subtle"]);
      expect(textColor).toBe(iconColor);
    });

    it("renders an icon Button if only an icon is passed", () => {
      const pressHandler = jest.fn();
      const icon = "cog";
      const accessibilityLabel = "cog";

      const { getByLabelText } = render(
        <Button
          onPress={pressHandler}
          icon={icon}
          accessibilityLabel={accessibilityLabel}
        />,
      );

      expect(getByLabelText(icon)).toBeDefined();
    });
  });

  describe("Loading", () => {
    const label = "I am loading";
    it("does render a loading state", () => {
      const { getByTestId, getByRole } = render(
        <Button label={label} onPress={jest.fn} loading={true} />,
      );

      expect(getByTestId("loadingImage")).toBeDefined();
      expect(getByRole("button", { busy: true })).toBeDefined();
    });

    it("doesn't render a loading state", () => {
      const { queryByTestId, queryByRole, rerender } = render(
        <Button label={label} onPress={jest.fn} loading={false} />,
      );

      expect(queryByTestId("loadingImage")).toBeNull();
      expect(queryByRole("button", { busy: true })).toBeNull();

      rerender(<Button label="I am loading" onPress={jest.fn} />);

      expect(queryByTestId("loadingImage")).toBeNull();
      expect(queryByRole("button", { busy: true })).toBeNull();
    });

    it("should not allow press events", () => {
      const handlePress = jest.fn();
      const setup = (loading?: boolean) => (
        <Button label={label} onPress={handlePress} loading={loading} />
      );
      const { getByLabelText, rerender } = render(setup(true));

      fireEvent.press(getByLabelText(label));
      expect(handlePress).not.toHaveBeenCalled();

      // Sanity check that it's not a false positive
      rerender(setup());
      fireEvent.press(getByLabelText(label));
      expect(handlePress).toHaveBeenCalledTimes(1);
    });
  });

  describe("UNSAFE_style", () => {
    it("should apply the container style override", () => {
      const containerStyle = {
        backgroundColor: "red",
        borderColor: tokens["color-base-red--500"],
      };

      const { buttonStyle } = renderButton(
        <Button
          label="Override"
          onPress={jest.fn()}
          UNSAFE_style={{ container: containerStyle }}
        />,
      );

      expect(buttonStyle).toMatchObject(containerStyle);
    });

    it("should apply the contentContainer style override to labels", () => {
      const contentContainerStyle = { padding: 10 };

      const { getByTestId } = renderButton(
        <Button
          label="Override"
          onPress={jest.fn()}
          UNSAFE_style={{ contentContainer: contentContainerStyle }}
        />,
      );

      const contentContainer = getByTestId("contentContainer");
      expect(contentContainer.props.style).toContainEqual(
        contentContainerStyle,
      );
    });

    it("should apply the contentContainer style override to icons", () => {
      const contentContainerStyle = { padding: 10 };

      const { getByTestId } = renderButton(
        <Button
          label="Cog"
          icon="cog"
          onPress={jest.fn()}
          UNSAFE_style={{ contentContainer: contentContainerStyle }}
        />,
      );

      const contentContainer = getByTestId("contentContainer");
      expect(contentContainer.props.style).toContainEqual(
        contentContainerStyle,
      );
    });

    it("should apply the iconContainer style override", () => {
      const iconContainerStyle = { margin: 5 };

      const { getByTestId } = renderButton(
        <Button
          label="Cog"
          icon="cog"
          onPress={jest.fn()}
          UNSAFE_style={{ iconContainer: iconContainerStyle }}
        />,
      );

      const iconContainer = getByTestId("iconContainer");
      expect(iconContainer.props.style).toContainEqual(iconContainerStyle);
    });

    it("should apply the actionLabelContainer style override", () => {
      const actionLabelContainerStyle = { margin: 5 };

      const { getByTestId } = renderButton(
        <Button
          label="Override"
          onPress={jest.fn()}
          UNSAFE_style={{ actionLabelContainer: actionLabelContainerStyle }}
        />,
      );

      const actionLabelContainer = getByTestId("actionLabelContainer");
      expect(actionLabelContainer.props.style).toContainEqual(
        actionLabelContainerStyle,
      );
    });
  });
});
