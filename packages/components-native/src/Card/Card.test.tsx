import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Card } from "./Card";
import { Text } from "../Text";

const cardHeaderTestID = "cardHeader";
const cardFooterTestID = "cardFooter";

it("renders with only a header title", () => {
  const title = "Foobar";
  const { getByTestId, getByText, queryAllByRole } = render(
    <Card header={{ title }} />,
  );

  expect(getByText(title)).toBeDefined();
  expect(getByTestId(cardHeaderTestID)).toBeDefined();
  expect(queryAllByRole("button")).toEqual([]);
});

it("renders with an icon action", () => {
  const iconName = "plus2";
  const { getByTestId } = render(
    <Card
      header={{
        title: "Foobar",
        actionItem: { iconName },
        onPress: jest.fn(),
      }}
    />,
  );

  expect(getByTestId(iconName)).toBeDefined();
});

it("renders with a button action", () => {
  const label = "Edit";
  const { getByText } = render(
    <Card
      header={{
        title: "Foobar",
        actionItem: { label },
        onPress: jest.fn(),
      }}
    />,
  );

  expect(getByText(label)).toBeDefined();
});

it("renders without a header and footer", () => {
  const content = "I am the content";
  const { getByText, queryByTestId } = render(
    <Card>
      <Text>{content}</Text>
    </Card>,
  );

  expect(getByText(content)).toBeDefined();
  expect(queryByTestId(cardHeaderTestID)).toBeNull();
  expect(queryByTestId(cardFooterTestID)).toBeNull();
});

it("should call the onPress when pressing the header", () => {
  const pressHandler = jest.fn();

  const { getByText } = render(
    <Card
      header={{
        title: "Header",
        actionItem: { iconName: "plus2" },
        onPress: pressHandler,
      }}
    />,
  );

  fireEvent.press(getByText("Header"));
  expect(pressHandler).toHaveBeenCalled();
});

it("should call the onPress when pressing the action button", () => {
  const pressHandler = jest.fn();

  const { getByText } = render(
    <Card
      header={{
        title: "Header",
        actionItem: { label: "Edit" },
        onPress: pressHandler,
      }}
    />,
  );

  fireEvent.press(getByText("Edit"));
  expect(pressHandler).toHaveBeenCalled();
});

it("renders with a footer", () => {
  const title = "View All";
  const { getByText, getByTestId, queryByTestId } = render(
    <Card footer={{ title: title, onPress: jest.fn() }} />,
  );

  expect(getByText(title)).toBeDefined();
  expect(getByTestId(cardFooterTestID)).toBeDefined();
  expect(queryByTestId(cardHeaderTestID)).toBeNull();
});

it("should call the onPress when pressing the footer", () => {
  const headerPressHandler = jest.fn();
  const footerPressHandler = jest.fn();

  const { getByText } = render(
    <Card
      header={{
        title: "Header",
        actionItem: { iconName: "plus2" },
        onPress: headerPressHandler,
      }}
      footer={{
        title: "View All",
        onPress: footerPressHandler,
      }}
    />,
  );

  fireEvent.press(getByText("View All"));
  expect(footerPressHandler).toHaveBeenCalled();
});
