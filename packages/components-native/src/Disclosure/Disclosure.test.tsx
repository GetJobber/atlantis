import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { ReactTestInstance } from "react-test-renderer";
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

it("renders a Collapsable item with a header and a content when open is true", () => {
  const disclosure = render(
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
  fireLayoutEvent(disclosure.getByTestId("content"));
  expect(disclosure).toMatchSnapshot();
});

it("renders a Collapsable item with a header and with a content of size 0 when closed is false", () => {
  const disclosure = render(
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
  fireLayoutEvent(disclosure.getByTestId("content"));
  expect(disclosure).toMatchSnapshot();
});

it("should not render the caret when the collapsable item is empty", () => {
  const disclosure = render(
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
  expect(disclosure).toMatchSnapshot();
});
