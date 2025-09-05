# FeatureSwitch

# Feature Switch

Use the FeatureSwitch to give users control over a settings-level feature. The
FeatureSwitch should tell the user what the feature is, allow them to turn it on
and off, and optionally allow them to edit any options applicable to the
feature.

## Design & usage guidelines

The FeatureSwitch is intended to be used in settings for features that apply to
a system-wide experience. An example of this might be automated messaging
settings, where the user needs to both decide whether or not to use a type of
message, what the message template might be, and when the message should be
sent.

If the user is making a per-use-case on/off decision, such as enabling automatic
payments for a single invoice, use the [Switch](/components/Switch) component.

## Web Component Code

```tsx
FeatureSwitch  Web React import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import classnames from "classnames";
import styles from "./FeatureSwitch.module.css";
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

```

## Props

### Web Props

| Prop                                                               | Type                          | Required | Default           | Description                                                              |
| ------------------------------------------------------------------ | ----------------------------- | -------- | ----------------- | ------------------------------------------------------------------------ |
| `description`                                                      | `string`                      | ❌       | `_none_`          | Feature description. This supports basic markdown node types such as     |
| `_italic_`, `**bold**`, and `[link name](url)`                     |
| `disabled`                                                         | `boolean`                     | ❌       | `[object Object]` | Determines if the switch is disabled                                     |
| `enabled`                                                          | `boolean`                     | ❌       | `false`           | Defines if the feature should be ON or OFF by default.                   |
| `externalLink`                                                     | `boolean`                     | ❌       | `[object Object]` | Defines if the links in the description should open in a new tab.        |
| `title`                                                            | `string`                      | ❌       | `_none_`          | Feature title.                                                           |
| `hasSaveIndicator`                                                 | `boolean`                     | ❌       | `[object Object]` | Determines if a save indicator should show up when the `enabled` prop    |
| changes. This means, it would only work for controlled components. |
| `onSwitch`                                                         | `(newValue: boolean) => void` | ❌       | `_none_`          | Callback when interacting with the switch.                               |
| @param newValue                                                    |
| `onEdit`                                                           | `() => void`                  | ❌       | `_none_`          | Callback when clicking with the edit button. This also determines if the |
| edit button should show up in the UI.                              |

## Categories

- Selections

## Web Test Code

```typescript
FeatureSwitch  Web React Test Testing Jest import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { FeatureSwitch } from ".";

it("renders a full FeatureSwitch", () => {
  const { container } = render(
    <FeatureSwitch
      enabled={true}
      title="Quote follow-up"
      externalLink={true}
      description="Send a [notification](www.fakeurl.com) to your _client_ following up on an **outstanding quote**."
      hasSaveIndicator={true}
      onSwitch={() => {
        console.log("You clicked the switch");
      }}
      onEdit={() => {
        console.log("You clicked edit");
      }}
    >
      Dis dem content yo
    </FeatureSwitch>,
  );
  expect(container).toMatchSnapshot();
});

it("renders a subdued FeatureSwitch content", () => {
  const { container } = render(
    <FeatureSwitch
      enabled={false}
      description="Send a notification to your client following up on an outstanding quote."
    >
      Dis dem content yo
    </FeatureSwitch>,
  );
  expect(container).toMatchSnapshot();
});

test("it should not show description if absent", () => {
  const { container } = render(
    <FeatureSwitch enabled={false}>Dis dem content yo</FeatureSwitch>,
  );
  expect(container).toMatchSnapshot();
});

test("it should not show switch if onSwitch is absent", () => {
  const { container } = render(
    <FeatureSwitch
      enabled={false}
      description="Send a notification to your client following up on an outstanding quote."
    >
      Dis dem content yo
    </FeatureSwitch>,
  );
  expect(container).toMatchSnapshot();
});

test("it should call the switch handler with the new value", () => {
  const switchHandler = jest.fn();
  const content = "Send a thing?";
  const newValue = true;
  const { getByLabelText } = render(
    <FeatureSwitch onSwitch={switchHandler} description={content} />,
  );
  fireEvent.click(getByLabelText(content));
  expect(switchHandler).toHaveBeenCalledWith(newValue);
});

test("it should call the edit handler", () => {
  const editHandler = jest.fn();
  const content = "Send a thing?";
  const { getByText } = render(
    <FeatureSwitch onEdit={editHandler} description={content} />,
  );
  fireEvent.click(getByText("Edit"));
  expect(editHandler).toHaveBeenCalledTimes(1);
});

```

## Component Path

`/components/FeatureSwitch`

---

_Generated on 2025-08-21T17:35:16.360Z_
