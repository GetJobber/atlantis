import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { useHorizontalStyles } from "./ContentHorizontal.style";
import { useVerticalStyles } from "./ContentVertical.style";
import { useSpaceAroundStyles } from "./ContentSpaceAround.style";

export type Spacing =
  | "none"
  | "base"
  | "small"
  | "smaller"
  | "smallest"
  | "large";

export interface ContentProps {
  /**
   * The child or children that will be given spacing.
   */
  readonly children: ReactNode;

  /**
   * The amount of spacing that content will give.
   */
  readonly spacing?: Spacing;

  /**
   * The amount of spacing that will be applied between children.
   */
  readonly childSpacing?: Spacing;

  readonly direction?: "horizontal" | "vertical";

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   */
  readonly UNSAFE_style?: {
    container?: ViewStyle;
    childWrapper?: ViewStyle;
  };
}

export function Content({
  children,
  spacing = "base",
  childSpacing = "base",
  direction = "vertical",
  UNSAFE_style,
}: ContentProps): JSX.Element {
  const horizontalStyles = useHorizontalStyles();
  const verticalStyles = useVerticalStyles();
  const spaceAroundStyles = useSpaceAroundStyles();

  const styles = direction === "horizontal" ? horizontalStyles : verticalStyles;
  const styleName = `${spacing}Space` as const;
  const containerStyle = spaceAroundStyles[styleName];

  return (
    <View style={[styles.wrapper, containerStyle, UNSAFE_style?.container]}>
      {renderChildren()}
    </View>
  );

  function renderChildren() {
    const childArray = React.Children.toArray(children);
    if (childArray.length === 1) return children;

    const spaceName = `${childSpacing}ChildSpace` as const;
    const childContainerStyle = styles[spaceName];

    return childArray.map((child, index) => {
      const childStyle = index !== 0 ? [childContainerStyle] : [];

      return (
        <View
          key={index}
          style={[
            styles.childWrapper,
            ...childStyle,
            UNSAFE_style?.childWrapper,
          ]}
        >
          {child}
        </View>
      );
    });
  }
}
