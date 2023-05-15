import React from "react";
import { render } from "@testing-library/react-native";
import { View } from "react-native";
import { ReactTestInstance } from "react-test-renderer";
import { Content, ContentProps } from "./Content";
import { spaceStyles } from "./ContentSpaceAround.style";
import { verticalStyles } from "./ContentVertical.style";
import { horizontalStyles } from "./ContentHorizontal.style";
import { Text } from "../Text";

function getContentComponent(parentView: ReactTestInstance) {
  return (parentView?.children[0] as ReactTestInstance)
    ?.children[0] as ReactTestInstance;
}

function getContentChildren(contentView: ReactTestInstance) {
  return (contentView.children[0] as ReactTestInstance)
    ?.children as ReactTestInstance[];
}

const text = "🌚 I am the text 🌞";

function setupContent(
  props?: Pick<ContentProps, "spacing" | "childSpacing" | "direction">,
) {
  const container = render(
    <View accessibilityLabel="contentView">
      <Content
        spacing={props?.spacing}
        childSpacing={props?.childSpacing}
        direction={props?.direction}
      >
        <Text>{text}</Text>
        <Text>{text}</Text>
      </Content>
    </View>,
  );

  const parentView = container.getByLabelText("contentView");
  const contentView = getContentComponent(parentView);
  const contentChildren = getContentChildren(contentView);
  return { ...container, parentView, contentView, contentChildren };
}

describe("Space around", () => {
  it("should have a base padding around the component", () => {
    const { contentView } = setupContent();
    expect(contentView.props.style).toContainEqual(spaceStyles.baseSpace);
  });

  it("should have a small padding around the component", () => {
    const { contentView } = setupContent({ spacing: "small" });
    expect(contentView.props.style).toContainEqual(spaceStyles.smallSpace);
  });

  it("should have a large padding around the component", () => {
    const { contentView } = setupContent({ spacing: "large" });
    expect(contentView.props.style).toContainEqual(spaceStyles.largeSpace);
  });

  it("should have a no padding around the component", () => {
    const { contentView } = setupContent({ spacing: "none" });
    expect(contentView.props.style).toContainEqual(spaceStyles.noneSpace);
  });

  it("should have a smaller padding around the component", () => {
    const { contentView } = setupContent({ spacing: "smaller" });
    expect(contentView.props.style).toContainEqual(spaceStyles.smallerSpace);
  });

  it("should have the smallest padding around the component", () => {
    const { contentView } = setupContent({ spacing: "smallest" });
    expect(contentView.props.style).toContainEqual(spaceStyles.smallestSpace);
  });
});

describe("Vertical", () => {
  it("should have the vertical wrapper style", () => {
    const { contentView } = setupContent();
    expect(contentView.props.style).toContainEqual(verticalStyles.wrapper);
  });

  describe("Child space between", () => {
    it("should have a base top padding on every child but the first", () => {
      const { contentChildren } = setupContent({
        direction: "vertical",
        childSpacing: "base",
      });

      expect(contentChildren[0].props.style).toEqual([
        verticalStyles.childWrapper,
      ]);
      expect(contentChildren[1].props.style).toContainEqual(
        verticalStyles.baseChildSpace,
      );
    });

    it("should have a small top padding on every child but the first", () => {
      const { contentChildren } = setupContent({
        direction: "vertical",
        childSpacing: "small",
      });

      expect(contentChildren[0].props.style).toEqual([
        verticalStyles.childWrapper,
      ]);
      expect(contentChildren[1].props.style).toContainEqual(
        verticalStyles.smallChildSpace,
      );
    });

    it("should have a large top padding on every child but the first", () => {
      const { contentChildren } = setupContent({
        direction: "vertical",
        childSpacing: "large",
      });

      expect(contentChildren[0].props.style).toEqual([
        verticalStyles.childWrapper,
      ]);
      expect(contentChildren[1].props.style).toContainEqual(
        verticalStyles.largeChildSpace,
      );
    });

    it("should have no top padding on every child but the first", () => {
      const { contentChildren } = setupContent({
        direction: "vertical",
        childSpacing: "none",
      });

      expect(contentChildren[0].props.style).toEqual([
        verticalStyles.childWrapper,
      ]);
      expect(contentChildren[1].props.style).toContainEqual(
        verticalStyles.noneChildSpace,
      );
    });

    it("should have a smaller top padding on every child but the first", () => {
      const { contentChildren } = setupContent({
        direction: "vertical",
        childSpacing: "smaller",
      });

      expect(contentChildren[0].props.style).toEqual([
        verticalStyles.childWrapper,
      ]);
      expect(contentChildren[1].props.style).toContainEqual(
        verticalStyles.smallerChildSpace,
      );
    });

    it("should have the smallest top padding on every child but the first", () => {
      const { contentChildren } = setupContent({
        direction: "vertical",
        childSpacing: "smallest",
      });

      expect(contentChildren[0].props.style).toEqual([
        verticalStyles.childWrapper,
      ]);
      expect(contentChildren[1].props.style).toContainEqual(
        verticalStyles.smallestChildSpace,
      );
    });
  });
});

describe("Horizontal", () => {
  it("should have the horizontal wrapper style", () => {
    const { contentView } = setupContent({ direction: "horizontal" });
    expect(contentView.props.style).toContainEqual(horizontalStyles.wrapper);
  });

  describe("Child space between", () => {
    it("should have a base left padding on every child but the first", () => {
      const { contentChildren } = setupContent({
        direction: "horizontal",
        childSpacing: "base",
      });

      expect(contentChildren[0].props.style).toEqual([
        horizontalStyles.childWrapper,
      ]);
      expect(contentChildren[1].props.style).toContainEqual(
        horizontalStyles.baseChildSpace,
      );
    });

    it("should have a small left padding on every child but the first", () => {
      const { contentChildren } = setupContent({
        direction: "horizontal",
        childSpacing: "small",
      });

      expect(contentChildren[0].props.style).toEqual([
        horizontalStyles.childWrapper,
      ]);
      expect(contentChildren[1].props.style).toContainEqual(
        horizontalStyles.smallChildSpace,
      );
    });

    it("should have a large left padding on every child but the first", () => {
      const { contentChildren } = setupContent({
        direction: "horizontal",
        childSpacing: "large",
      });

      expect(contentChildren[0].props.style).toEqual([
        horizontalStyles.childWrapper,
      ]);
      expect(contentChildren[1].props.style).toContainEqual(
        horizontalStyles.largeChildSpace,
      );
    });

    it("should have no left padding on every child but the first", () => {
      const { contentChildren } = setupContent({
        direction: "horizontal",
        childSpacing: "none",
      });

      expect(contentChildren[0].props.style).toEqual([
        horizontalStyles.childWrapper,
      ]);
      expect(contentChildren[1].props.style).toContainEqual(
        horizontalStyles.noneChildSpace,
      );
    });

    it("should have a smaller left padding on every child but the first", () => {
      const { contentChildren } = setupContent({
        direction: "horizontal",
        childSpacing: "smaller",
      });

      expect(contentChildren[0].props.style).toEqual([
        horizontalStyles.childWrapper,
      ]);
      expect(contentChildren[1].props.style).toContainEqual(
        horizontalStyles.smallerChildSpace,
      );
    });
    it("should have the smallest left padding on every child but the first", () => {
      const { contentChildren } = setupContent({
        direction: "horizontal",
        childSpacing: "smallest",
      });

      expect(contentChildren[0].props.style).toEqual([
        horizontalStyles.childWrapper,
      ]);
      expect(contentChildren[1].props.style).toContainEqual(
        horizontalStyles.smallestChildSpace,
      );
    });
  });
});
