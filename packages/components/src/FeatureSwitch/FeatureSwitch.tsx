import React, { ReactNode } from "react";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Content } from "../Content";
import { Switch } from "../Switch";
import { Button } from "../Button";
import styles from "./FeatureSwitch.css";

interface FeatureSwitchProps {
  readonly children?: ReactNode | ReactNode[];
  readonly description: string;
  readonly enabled: boolean;
  readonly title: string;
  onSwitch?(newValue: boolean): void;
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
