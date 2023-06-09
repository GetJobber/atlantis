import React, { Children, PropsWithChildren } from "react";
import { View } from "react-native";
import chunk from "lodash/chunk";
import { columnStyles, gapStyles, styles } from "./Flex.styles";
import { FlexProps } from "./types";
import { Content } from "../Content";

export function Flex({
  template = [],
  align = "center",
  gap = "base",
  children,
}: PropsWithChildren<FlexProps>): JSX.Element {
  if (template.length === 1) {
    console.warn("Please use <Content /> component for a stacked layout");
  }

  const childrenArray = Children.toArray(children);
  const chunkedChildren = chunk(
    childrenArray,
    template.length || childrenArray.length,
  );

  return (
    <Content spacing="none" childSpacing={gap}>
      {chunkedChildren.map((childArray, rowIndex) => (
        <Row key={rowIndex} template={template} align={align} gap={gap}>
          {injectChild(childArray)}
        </Row>
      ))}
    </Content>
  );

  function injectChild(value: ReturnType<typeof Children.toArray>) {
    const hasMoreRows = chunkedChildren.length > 1;
    const childrenCount = value.length;
    const templateCount = template.length;

    if (hasMoreRows && childrenCount < templateCount) {
      const missingChildCount = templateCount - childrenCount;

      for (let index = 0; index < missingChildCount; index++) {
        value.push(<React.Fragment key={index} />);
      }
    }

    return value;
  }
}

function Row({
  template = [],
  align = "center",
  gap = "base",
  children,
}: PropsWithChildren<FlexProps>): JSX.Element {
  return (
    <View testID="ATL-Flex-Row" style={[styles.row, { alignItems: align }]}>
      {Children.map(children, (child, index) => (
        <View
          style={[
            columnStyles[template[index]] || columnStyles.grow,
            index > 0 && gap && gapStyles[gap],
          ]}
        >
          {child}
        </View>
      ))}
    </View>
  );
}
