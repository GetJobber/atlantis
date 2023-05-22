import React from "react";
import { render } from "@testing-library/react-native";
import { View, ViewStyle } from "react-native";
import { ReactTestInstance } from "react-test-renderer";
import { JobberStyle } from "@jobber/design/foundation";
import { Grid } from "./Grid";
import { GridProps, Spacing } from "./types";
import { columnStyles } from "./Grid.styles";
import { Text } from "../Text";
import { Icon } from "../Icon";

function getContentComponent(parentView: ReactTestInstance) {
  return (parentView?.children[0] as ReactTestInstance)
    ?.children[0] as ReactTestInstance;
}

function getGridCol(gridRow: ReactTestInstance) {
  return gridRow.children as ReactTestInstance[];
}
function setUp(props?: GridProps) {
  const container = render(
    <View accessibilityLabel="contentView">
      <Grid align={props?.align} template={props?.template} gap={props?.gap}>
        <Icon name={"email"} />
        <Text>Hi onLookers!</Text>
        <Text>You look Great Today!</Text>
        <Text>Thanks for coming to my Ted Talk :D</Text>
      </Grid>
    </View>,
  );
  const contentView = getContentComponent(
    container.getByLabelText("contentView"),
  );
  const gridRow = container.getAllByTestId("ATL-Grid-Row");
  const gridCol = getGridCol(gridRow[0]);
  return { ...container, contentView, gridRow, gridCol };
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
      const { contentView, gridCol } = setUp({
        template: ["grow", "grow", "shrink"],
        gap: a,
      });
      expect(gridCol[1].props.style).toContainEqual({
        paddingLeft: expected,
      });
      expect(contentView.props.childSpacing).toEqual(a);
    },
  );
});

describe("Vertical alignment", () => {
  it("should align children to center by default if align is not specified", () => {
    const { gridRow } = setUp({
      template: ["grow", "grow", "shrink"],
      gap: "large",
    });

    expect(gridRow[0].props.style).toContainEqual({ alignItems: "center" });
  });

  const alignTestCases: [ViewStyle["alignItems"]][] = [
    ["flex-start"],
    ["flex-end"],
    ["center"],
    ["baseline"],
    ["stretch"],
  ];
  it.each(alignTestCases)("should align children to %s", a => {
    const { gridRow } = setUp({
      template: ["grow", "grow", "shrink"],
      align: a,
    });

    expect(gridRow[0].props.style).toContainEqual({
      alignItems: a,
    });
  });
});

describe("Layout", () => {
  it("should by default display a 1 row grid with equal spacing between each children", () => {
    const { gridCol, gridRow } = setUp({});

    expect(gridCol[0].props.style).toContainEqual(columnStyles.grow);
    expect(gridCol[1].props.style).toContainEqual(columnStyles.grow);
    expect(gridCol[2].props.style).toContainEqual(columnStyles.grow);
    expect(gridCol[3].props.style).toContainEqual(columnStyles.grow);
    expect(gridRow.length).toEqual(1);
  });

  it("should follow the template to decide whether to grow or shrink", () => {
    const { gridCol } = setUp({
      template: ["grow", "grow", "shrink"],
    });

    expect(gridCol[0].props.style).toContainEqual(columnStyles.grow);
    expect(gridCol[1].props.style).toContainEqual(columnStyles.grow);
    expect(gridCol[2].props.style).toContainEqual(columnStyles.shrink);
  });

  it("should create a grid with 2 rows", () => {
    const { gridRow } = setUp({
      template: ["grow", "grow", "shrink"],
    });

    expect(gridRow.length).toEqual(2);
  });

  it("should inject extra children on the last row of a multiRow grid if needed", () => {
    const { gridRow } = setUp({
      template: ["grow", "grow", "shrink"],
    });
    const gridCol2 = getGridCol(gridRow[1]);
    expect(gridRow.length > 1).toBeTruthy();
    expect(gridCol2.length).toEqual(3);
  });
});
