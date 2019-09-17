import React, { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Content } from "../Content";
import { Switch } from "../Switch";
import { Button } from "../Button";
import { Emphasis } from "../Emphasis";
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
                  type: "spring",
                  duration: 0.2,
                  damping: 20,
                  stiffness: 300,
                }}
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
          {children && <div className={styles.content}>{children}</div>}
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

    setTimeout(() => {
      setSavedIndicator(true);

      setTimeout(() => {
        setSavedIndicator(false);
      }, 2000);
    }, 200);
  }
}
