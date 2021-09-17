import React, { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import classnames from "classnames";
import styles from "./FeatureSwitch.css";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Content } from "../Content";
import { Switch } from "../Switch";
import { Button } from "../Button";
import { Emphasis } from "../Emphasis";
import { Markdown } from "../Markdown";

interface FeatureSwitchProps {
  readonly children?: ReactNode | ReactNode[];

  /**
   * Feature description. This supports basic markdown node types such as
   * `_italic_`, `**bold**`, and `[link name](url)`
   */
  readonly description?: string;

  /**
   * Determines if the switch is disabled
   *
   * @default false
   */
  readonly disabled?: boolean;

  /**
   * Defines if the feature should be ON or OFF by default.
   *
   * @default false
   */
  readonly enabled?: boolean;

  /**
   * Defines if the links in the description should open in a new tab.
   *
   * @default false
   */
  readonly externalLink?: boolean;

  /**
   * Feature title.
   */
  readonly title?: string;

  /**
   * Determines if a save indicator should show up when the `enabled` prop
   * changes. This means, it would only work for controlled components.
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
  disabled = false,
  enabled,
  externalLink = false,
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
  shouldShowSavedIndicator();

  return (
    <Content>
      <div className={styles.container}>
        <div className={styles.content}>
          <Content>
            {title && <Heading level={4}>{title}</Heading>}
            {description && (
              <Text>
                <Markdown
                  content={description}
                  basicUsage={true}
                  externalLink={externalLink}
                />
              </Text>
            )}
          </Content>
        </div>
        {onSwitch && (
          <div className={styles.action}>
            <Switch
              value={enabled}
              onChange={onSwitch}
              ariaLabel={description}
              disabled={disabled}
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
        )}
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

  function shouldShowSavedIndicator() {
    // Check if the component is mounted
    const [didMount, setDidMount] = useState(false);
    useEffect(() => setDidMount(true), []);
    useEffect(() => {
      didMount && hasSaveIndicator && setSavedIndicator(true);
    }, [enabled]);
  }

  function handleAnimationComplete() {
    setSavedIndicator(false);
  }
}
