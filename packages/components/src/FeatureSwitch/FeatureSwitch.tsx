import React, { ReactNode } from "react";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Content } from "../Content";
import { Switch } from "../Switch";
import { Button } from "../Button";
import styles from "./FeatureSwitch.css";

interface FeatureSwitchProps {
  readonly children?: ReactNode | ReactNode[];

  /**
   * Feature description.
   */
  readonly description: string;

  /**
   * Defines if the feature should be ON or OFF by default.
   */
  readonly enabled: boolean;

  /**
   * Feature title.
   */
  readonly title: string;

  /**
   * Callback when interacting with the switch.
   *
   * @param newValue
   */
  onSwitch?(newValue: boolean): void;

  /**
   * Callback when clicking with the edit button.
   */
  onEdit?(): void;
}

export function FeatureSwitch({
  children,
  description,
  enabled,
  onEdit,
  onSwitch,
  title,
}: FeatureSwitchProps) {
  return (
    <Content>
      <div className={styles.container}>
        <div className={styles.content}>
          <Content>
            <Heading level={4}>{title}</Heading>
            <Text>{description}</Text>
          </Content>
        </div>
        <div className={styles.action}>
          <Switch value={enabled} onChange={onSwitch} ariaLabel={description} />
        </div>
      </div>

      {children && (
        <div className={styles.container}>
          <div className={styles.content}>{children}</div>
          <div className={styles.action}>
            <Button label="Edit" type="tertiary" onClick={onEdit} />
          </div>
        </div>
      )}
    </Content>
  );
}
