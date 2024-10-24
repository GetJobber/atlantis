import React from "react";
import { Button } from "@jobber/components/Button";
import { Tooltip } from "@jobber/components/Tooltip";
import { Flex } from "@jobber/components/Flex";
import { Text } from "@jobber/components/Text";
import { Content } from "@jobber/components/Content";
import { showToast } from "@jobber/components/Toast";
import styles from "./StorybookColorSwatches.module.css";

interface StorybookColorSwatchesProps {
  readonly colors: string[];
  readonly description?: string;
}

export function StorybookColorSwatches({ colors }: StorybookColorSwatchesProps) {
  return (
    <Content>
      {colors.map((color: string) => (
        <Color key={color} color={color} />
      ))}
    </Content>
  );
}

interface ColorProps {
  readonly color: string;
  readonly description?: string;
}

function Color({ color, description }: ColorProps) {

  const style = {
    backgroundColor: `var(${color})`,
  };

  return (
    <Flex gap="small" align="center" template={["shrink", "shrink"]}>
      <div key={color} style={style} className={styles.swatch}>
      </div>
      <Content spacing="small">
        { description && (<Text>{description}</Text>) }
        <Flex gap="smaller" align="center" template={["shrink", "shrink"]}>
          <pre className={styles.pre}>{color}</pre>
          <Tooltip message="Copy">
            <Button size="small" variation="subtle" type="tertiary" icon="copy" onClick={handleClick} ariaLabel="Copy" />
          </Tooltip>
        </Flex>
      </Content>
    </Flex>
  );

  function handleClick() {
    navigator.clipboard.writeText(`var(${color})`);
    showToast({
      message: `Color ${color} copied to clipboard`,
    });
  }
}
