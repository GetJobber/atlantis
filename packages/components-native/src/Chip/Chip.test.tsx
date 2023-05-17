import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { JobberStyle } from "@jobber/design/foundation";
import { Chip } from "./Chip";

it("renders an active Chip", () => {
  const { getByText, getByLabelText } = render(
    <Chip
      label="Foo"
      onPress={jest.fn()}
      accessibilityLabel={"Foo chip"}
      isActive
    />,
  );
  expect(getByText("Foo")).toBeDefined();
  expect(getByLabelText("Foo chip").props.style).toContainEqual({
    backgroundColor: JobberStyle["color-surface--reverse"],
  });
});

it("renders an active Chip without onPress as disabled", () => {
  const { getByTestId } = render(
    <Chip label="Foo" accessibilityLabel={"Foo chip"} isActive />,
  );
  expect(
    getByTestId("chipTest").props.accessibilityState.disabled,
  ).toBeTruthy();
});

it("renders an inactive Chip with a default backgroundColor", () => {
  const { getByTestId } = render(
    <Chip label="Foo" onPress={jest.fn()} isActive={false} />,
  );
  expect(getByTestId("chipTest").props.style).not.toContainEqual({
    backgroundColor: JobberStyle["color-surface--reverse"],
  });
  expect(getByTestId("chipTest").props.style).toContainEqual({
    backgroundColor: JobberStyle["color-surface--background"],
  });
});

it("renders an inactive Chip with a surface backgroundColor", () => {
  const { getByTestId } = render(
    <Chip
      label="Foo"
      onPress={jest.fn()}
      isActive={false}
      inactiveBackgroundColor={"surface"}
    />,
  );
  expect(getByTestId("chipTest").props.style).toContainEqual({
    backgroundColor: JobberStyle["color-surface"],
  });
});

it("renders an active Chip with icon", () => {
  const { getByTestId } = render(
    <Chip onPress={jest.fn()} icon="invoice" isActive />,
  );
  expect(getByTestId("invoice")).toBeDefined();
});

it("renders an inactive Chip with icon", () => {
  const { getByTestId } = render(
    <Chip onPress={jest.fn()} icon="invoice" isActive={false} />,
  );
  expect(getByTestId("invoice")).toBeDefined();
});

it("renders a Chip with the dismiss icon", () => {
  const { getByTestId } = render(
    <Chip label="Foo" onPress={jest.fn()} isActive isDismissible={true} />,
  );
  expect(getByTestId("remove")).toBeDefined();
});

it("should call the handler with the new value", () => {
  const pressHandler = jest.fn();
  const accessibilityLabel = "test chip";
  const { getByLabelText } = render(
    <Chip
      onPress={pressHandler}
      label={"foo"}
      accessibilityLabel={accessibilityLabel}
      isActive
    />,
  );

  fireEvent.press(getByLabelText(accessibilityLabel));
  expect(pressHandler).toHaveBeenCalled();
});

describe("accessibilityLabel", () => {
  it("uses accessibilityLabel if specified", () => {
    const pressHandler = jest.fn();
    const { getByLabelText } = render(
      <Chip
        onPress={pressHandler}
        label="label"
        accessibilityLabel="accessibilityLabel"
        isActive
      />,
    );

    expect(getByLabelText("accessibilityLabel")).toBeTruthy();
  });

  it("uses label if unspecified", () => {
    const pressHandler = jest.fn();
    const { getByLabelText } = render(
      <Chip onPress={pressHandler} label="label" isActive />,
    );

    expect(getByLabelText("label")).toBeTruthy();
  });
});

describe("accent", () => {
  it("uses accent color when present and chip is Active", () => {
    const { getByTestId } = render(
      <Chip
        label="Foo"
        onPress={jest.fn()}
        accessibilityLabel={"Foo chip"}
        isActive={true}
        accent={"client"}
      />,
    );
    expect(getByTestId("chipTest").props.style).toContainEqual({
      backgroundColor: JobberStyle["color-client"],
    });
  });
});
