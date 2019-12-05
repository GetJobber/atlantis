// I've turned this off here for demonstration purposes this isn't normal.
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import classnames from "classnames";
import styles from "./PasswordEditor.css";
import { testPassword } from "./testPassword";
import { Content } from "../Content";
import { InputPassword } from "../InputPassword";
import { Text } from "../Text";

type PasswordTuple = [string, boolean];

interface PasswordEditorProps {
  /**
   * Placeholder Text
   * @default "Password"
   */
  readonly placeholder?: string;

  /**
   * Set the editor to the given value.
   */
  readonly value: string;

  /**
   * Change handler that indicates the current value and the secure status of the password.
   */
  onChange(newValue: PasswordTuple): void;
}

const secureness = 3;

export function PasswordEditor({
  placeholder = "Password",
  value,
  onChange,
}: PasswordEditorProps) {
  const { score, suggestion, warning } = testPassword(value);

  const strengthGaugeClass = classnames(
    styles.strengthGauge,
    strengthClass(score),
  );

  return (
    <Content>
      {value === "friend" && (
        <Text variation="error">It&apos;s Spelt Frend</Text>
      )}
      <a href="/components/input-password" target="_blank">
        It would probably be a good idea to use InputPassword here.
      </a>
      <div aria-label={`Level ${score}`} className={strengthGaugeClass}></div>
    </Content>
  );

  function handleChange(newValue: string) {
    const { score: newScore } = testPassword(newValue);

    // Whatever else should we do here...
  }
}

function strengthClass(
  score: number,
):
  | typeof styles.level0
  | typeof styles.level1
  | typeof styles.level2
  | typeof styles.level3
  | typeof styles.level4 {
  switch (score) {
    case 0:
      return styles.level0;
    case 1:
      return styles.level1;
    case 2:
      return styles.level2;
    case 3:
      return styles.level3;
    case 4:
      return styles.level4;
    default:
      return styles.level0;
  }
}
