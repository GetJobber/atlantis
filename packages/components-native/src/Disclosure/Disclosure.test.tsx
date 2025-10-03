import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import type { ReactTestInstance } from "react-test-renderer";
import { Disclosure } from ".";
import { Text } from "../Text";

jest.mock("react-native-svg", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-native-svg"),
    Path: "Path",
    default: "SVGMock",
  };
});

function fireLayoutEvent(disclosureContent: ReactTestInstance) {
  fireEvent(disclosureContent, "onLayout", {
    nativeEvent: {
      layout: {
        height: 100,
      },
    },
  });
}

describe("Disclosure", () => {
  const defaultProps = {
    header: <Text>This is the header</Text>,
    content: <Text>This is the content</Text>,
    onToggle: jest.fn(),
  };

  it("renders a Disclosure with a header and a content when open is true", () => {
    render(
      <Disclosure
        header={<Text>This is the header</Text>}
        content={<Text>This is the content</Text>}
        open={true}
        isEmpty={false}
        onToggle={() => {
          return;
        }}
      />,
    );

    expect(screen.getByText("This is the header")).toBeTruthy();

    const content = screen.getByTestId("content");
    fireLayoutEvent(content);

    expect(screen.getByText("This is the content")).toBeTruthy();
    expect(screen.getByTestId("arrowUp")).toBeTruthy();
  });

  it("renders a Disclosure with a header and with a content of size 0 when open is false", () => {
    render(
      <Disclosure
        header={<Text>This is the header</Text>}
        content={<Text>This is the content</Text>}
        open={false}
        isEmpty={false}
        onToggle={() => {
          return;
        }}
      />,
    );

    expect(screen.getByText("This is the header")).toBeTruthy();

    const content = screen.getByTestId("content");
    fireLayoutEvent(content);

    expect(screen.getByText("This is the content")).toBeTruthy();
    expect(screen.getByTestId("arrowUp")).toBeTruthy();
  });

  it("should not render the caret when the Disclosure is empty", () => {
    render(
      <Disclosure
        header={<Text>This is the header</Text>}
        content={<Text>This is the content</Text>}
        open={false}
        isEmpty={true}
        onToggle={() => {
          return;
        }}
      />,
    );

    expect(screen.getByText("This is the header")).toBeTruthy();
    expect(screen.queryByTestId("arrowUp")).toBeNull();
  });

  it("calls onToggle when header is pressed", () => {
    const onToggleMock = jest.fn();
    const { getByText } = render(
      <Disclosure
        {...defaultProps}
        onToggle={onToggleMock}
        open={false}
        isEmpty={false}
      />,
    );

    const headerText = getByText("This is the header");

    fireEvent.press(headerText);

    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onToggle when header is pressed and isEmpty is true", () => {
    const onToggleMock = jest.fn();
    const { getByText } = render(
      <Disclosure
        {...defaultProps}
        onToggle={onToggleMock}
        open={false}
        isEmpty={true}
      />,
    );

    const headerText = getByText("This is the header");

    fireEvent.press(headerText);

    expect(onToggleMock).not.toHaveBeenCalled();
  });
});
