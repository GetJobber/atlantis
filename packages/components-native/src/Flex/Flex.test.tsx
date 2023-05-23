import React from "react";
import { render } from "@testing-library/react-native";
import { View, ViewStyle } from "react-native";
import { ReactTestInstance } from "react-test-renderer";
import { JobberStyle } from "@jobber/design/foundation";
import { Flex } from "./Flex";
import { FlexProps, Spacing } from "./types";
import { columnStyles } from "./Flex.styles";
import { Text } from "../Text";
import { Icon } from "../Icon";

function getContentComponent(parentView: ReactTestInstance) {
  return (parentView?.children[0] as ReactTestInstance)
    ?.children[0] as ReactTestInstance;
}

function getFlexCol(flexRow: ReactTestInstance) {
  return flexRow.children as ReactTestInstance[];
}
function setUp(props?: FlexProps) {
  const container = render(
    <View accessibilityLabel="contentView">
      <Flex align={props?.align} template={props?.template} gap={props?.gap}>
        <Icon name={"email"} />
        <Text>Hi onLookers!</Text>
        <Text>You look Great Today!</Text>
        <Text>Thanks for coming to my Ted Talk :D</Text>
      </Flex>
    </View>,
  );
  const contentView = getContentComponent(
    container.getByLabelText("contentView"),
  );
  const flexRow = container.getAllByTestId("ATL-Flex-Row");
  const flexCol = getFlexCol(flexRow[0]);
  return { ...container, contentView, flexRow, flexCol };
}

describe("Gap", () => {
  const gapTestCases: [Spacing, number][] = [
    ["none", 0],
    ["smallest", JobberStyle["space-smallest"]],
    ["smaller", JobberStyle["space-smaller"]],
    ["small", JobberStyle["space-small"]],
    ["base", JobberStyle["space-base"]],
    ["large", JobberStyle["space-large"]],
  ];
  it.each(gapTestCases)(
    "Should have a gap of %s around the children components",
    (a, expected) => {
      const { contentView, flexCol } = setUp({
        template: ["grow", "grow", "shrink"],
        gap: a,
      });
      expect(flexCol[1].props.style).toContainEqual({
        paddingLeft: expected,
      });
      expect(contentView.props.childSpacing).toEqual(a);
    },
  );
});

describe("Vertical alignment", () => {
  it("should align children to center by default if align is not specified", () => {
    const { flexRow } = setUp({
      template: ["grow", "grow", "shrink"],
      gap: "large",
    });

    expect(flexRow[0].props.style).toContainEqual({ alignItems: "center" });
  });

  const alignTestCases: [ViewStyle["alignItems"]][] = [
    ["flex-start"],
    ["flex-end"],
    ["center"],
    ["baseline"],
    ["stretch"],
  ];
  it.each(alignTestCases)("should align children to %s", a => {
    const { flexRow } = setUp({
      template: ["grow", "grow", "shrink"],
      align: a,
    });

    expect(flexRow[0].props.style).toContainEqual({
      alignItems: a,
    });
  });
});

describe("Layout", () => {
  it("should by default display a 1 row flex grid with equal spacing between each children", () => {
    const { flexCol, flexRow } = setUp({});

    expect(flexCol[0].props.style).toContainEqual(columnStyles.grow);
    expect(flexCol[1].props.style).toContainEqual(columnStyles.grow);
    expect(flexCol[2].props.style).toContainEqual(columnStyles.grow);
    expect(flexCol[3].props.style).toContainEqual(columnStyles.grow);
    expect(flexRow.length).toEqual(1);
  });

  it("should follow the template to decide whether to grow or shrink", () => {
    const { flexCol } = setUp({
      template: ["grow", "grow", "shrink"],
    });

    expect(flexCol[0].props.style).toContainEqual(columnStyles.grow);
    expect(flexCol[1].props.style).toContainEqual(columnStyles.grow);
    expect(flexCol[2].props.style).toContainEqual(columnStyles.shrink);
  });

  it("should create a flex grid with 2 rows", () => {
    const { flexRow } = setUp({
      template: ["grow", "grow", "shrink"],
    });

    expect(flexRow.length).toEqual(2);
  });

  it("should inject extra children on the last row of a multiRow flex grid if needed", () => {
    const { flexRow } = setUp({
      template: ["grow", "grow", "shrink"],
    });
    const flexCol2 = getFlexCol(flexRow[1]);
    expect(flexRow.length > 1).toBeTruthy();
    expect(flexCol2.length).toEqual(3);
  });
});
