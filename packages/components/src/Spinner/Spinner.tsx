import React, { ReactNode } from "react";
import classnames from "classnames";
import styles from "./Spinner.css";
import { BaseSpinner, BaseSpinnerProps } from "./BaseSpinner";

interface SpinnerProps extends BaseSpinnerProps {
  /**
   * Specifies the size of the spinner
   *
   * @default true
   */
  readonly loading?: boolean;

  /**
   * The content to wrap with the loading spinner
   */
  readonly children?: ReactNode | ReactNode[];
}

export function Spinner({
  loading = true,
  size,
  inline,
  children,
}: SpinnerProps) {
  const wrapper = classnames(styles.wrapper, {
    [styles.inline]: inline,
  });
  const overlay = classnames({
    [styles.overlay]: !inline,
  });

  return loading ? (
    <div className={wrapper}>
      <div aria-hidden="true" aria-busy="true" aria-live="polite">
        {children}
      </div>
      <div className={overlay}>
        <BaseSpinner inline={inline} size={size} />
      </div>
    </div>
  ) : (
    <>{children}</>
  );
}
