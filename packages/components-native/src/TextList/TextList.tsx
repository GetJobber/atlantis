import React from "react";
import { View } from "react-native";
import { useStyles } from "./TextList.style";
import type { Spacing } from "../Content";
import { Content } from "../Content";
import type { TextLevel } from "../Text";
import { Text } from "../Text";

const BULLET_SYMBOL = `\u2022`;

interface TextListProps {
  /**
   * Text to display.
   */
  readonly items?: string[];

  /**
   * Change the appearance of the text
   */
  readonly emphasis?: "strong";

  /**
   * Visual hierarchy of the text.
   * @default "text"
   */
  readonly level?: TextLevel;

  /**
   * The amount of spacing that content will give.
   * @default "none"
   */
  readonly spacing?: Spacing;

  /**
   * The amount of spacing that will be applied between the list items.
   * @default "none"
   */
  readonly childSpacing?: Spacing;
}

export function TextList({
  items,
  childSpacing = "none",
  emphasis,
  level = "text",
  spacing = "none",
}: TextListProps): JSX.Element {
  const styles = useStyles();

  return (
    <>
      {items && (
        <View style={styles.details}>
          <Content spacing={spacing} childSpacing={childSpacing}>
            {items.map((item, index) => (
              <View style={styles.detail} key={index}>
                <Text level={level} emphasis={emphasis}>
                  {BULLET_SYMBOL}
                </Text>
                <View style={styles.detailText}>
                  <Text level={level} emphasis={emphasis}>
                    {item}
                  </Text>
                </View>
              </View>
            ))}
          </Content>
        </View>
      )}
    </>
  );
}
