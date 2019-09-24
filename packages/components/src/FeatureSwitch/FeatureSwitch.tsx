import React, { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import classnames from "classnames";
import styles from "./FeatureSwitch.css";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Content } from "../Content";
import { Switch } from "../Switch";
import { Button } from "../Button";
import { Emphasis } from "../Emphasis";

interface FeatureSwitchProps {
  readonly children?: ReactNode | ReactNode[];

  /**
   * Feature description.
   */
  readonly description: string;

  /**
   * Defines if the feature should be ON or OFF by default.
   */
  readonly enabled?: boolean;

  /**
   * Feature title.
   */
  readonly title?: string;

  /**
   * Determines if a save indicator should show up when toggling the switch.
   *
   * @default false
   */
  readonly hasSaveIndicator?: boolean;

  /**
   * Callback when interacting with the switch.
   *
   * @param newValue
   */
  onSwitch?(newValue: boolean): void;

  /**
   * Callback when clicking with the edit button. This also determines if the
   * edit button should show up in the UI.
   */
  onEdit?(): void;
}

export function FeatureSwitch({
  children,
  description,
  enabled,
  onEdit,
  onSwitch,
  hasSaveIndicator = false,
  title,
}: FeatureSwitchProps) {
  const [savedIndicator, setSavedIndicator] = useState(false);
  const featureContentClassnames = classnames(
    styles.featureContent,
    styles.content,
    enabled && styles.enabled,
  );

  return (
    <Content>
      <div className={styles.container}>
        <div className={styles.content}>
          <Content>
            {title && <Heading level={4}>{title}</Heading>}
            <Text>{description}</Text>
          </Content>
        </div>
        <div className={styles.action}>
          <Switch
            value={enabled}
            onChange={handleSwitch}
            ariaLabel={description}
          />
          <AnimatePresence>
            {hasSaveIndicator && savedIndicator && (
              <motion.div
                className={styles.savedIndicator}
                initial={{ y: -4, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -4, opacity: 0 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  duration: 0.2,
                  damping: 20,
                  stiffness: 300,
                }}
                onAnimationComplete={handleAnimationComplete}
              >
                <Text variation="success">
                  <Emphasis variation="italic">Saved</Emphasis>
                </Text>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {(children || onEdit) && (
        <div className={styles.container}>
          {children && (
            <div className={featureContentClassnames}>{children}</div>
          )}
          {onEdit && (
            <div className={styles.action}>
              <Button label="Edit" type="tertiary" onClick={onEdit} />
            </div>
          )}
        </div>
      )}
    </Content>
  );

  function handleSwitch(newValue: boolean) {
    onSwitch && onSwitch(newValue);
    setSavedIndicator(true);
  }

  function handleAnimationComplete() {
    setSavedIndicator(false);
  }
}
