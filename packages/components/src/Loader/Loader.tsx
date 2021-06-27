import React, { ReactNode } from "react";
import classnames from "classnames";
import styles from "./Loader.css";
import { LoaderIndicator } from "./LoaderIndicator";

type LoaderProps = IndeterminateLoaderProps | DeterminateLoaderProps;

interface BaseLoaderProps {
  /**
   * Removes the overlay and has the component render in the flow of the layout
   * @default false
   */
  readonly inline?: boolean;

  /**
   * Shows a spinner when false, progress bar when true.
   * @default false
   */
  determinate?: boolean;

  /**
   * Show loading wrapper if underlying content is loading.
   * @default false
   */
  loading: boolean;

  /**
   * The content to be wrapped with loading element
   */
  children: ReactNode | ReactNode[];
}

interface IndeterminateLoaderProps extends BaseLoaderProps {
  determinate: false;
}

interface DeterminateLoaderProps extends BaseLoaderProps {
  determinate: true;

  /**
   * Loading progress
   * @default 0
   */
  currentValue: number;

  /**
   * The value when loading is completed
   * @default 100
   */
  maxValue?: number;
}

export function Loader(props: LoaderProps) {
  const {
    inline = false,
    determinate = false,
    children,
    loading = false,
  } = props;
  let currentValue, maxValue;
  if (props.determinate) {
    currentValue = props.currentValue || 0;
    maxValue = props.maxValue || 100;
  }
  const classname = classnames(styles.loader, {
    [styles.overlay]: !inline,
    [styles.determinate]: determinate,
  });

  return loading ? (
    <div className={classname}>
      {children}
      <div>
        <LoaderIndicator
          determinate={determinate}
          currentValue={currentValue}
          maxValue={maxValue}
        />
      </div>
    </div>
  ) : (
    <>{children}</>
  );
}
