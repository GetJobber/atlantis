import React, { PropsWithChildren, RefObject } from "react";
import classnames from "classnames";
import { Breakpoints, useResizeObserver } from "@jobber/hooks/";
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
}

interface IndeterminateLoaderProps extends BaseLoaderProps {
  determinate: false;
}

interface DeterminateLoaderProps extends BaseLoaderProps {
  determinate: true;

  /**
   * The determinate loading progress
   * @default 0
   */
  currentValue: number;

  /**
   * The determinate loading value when loading is completed
   * @default 100
   */
  maxValue?: number;
}

export function Loader(props: PropsWithChildren<LoaderProps>) {
  const { loading = false, children } = props;

  return loading ? <InternalLoadingWrapper {...props} /> : <>{children}</>;
}

function InternalLoadingWrapper(props: PropsWithChildren<LoaderProps>) {
  const { inline = false, determinate = false, children } = props;

  let currentValue, maxValue;
  if (props.determinate) {
    currentValue = props.currentValue || 0;
    maxValue = props.maxValue || 100;
  }

  const [ref, { width = 0 }] = useResizeObserver();
  const classname = classnames(styles.loader, {
    [styles.overlay]: !inline,
    [styles.determinate]: determinate,
  });
  return (
    <div ref={ref as RefObject<HTMLDivElement>}>
      <div
        aria-busy="true"
        aria-live="polite"
        aria-hidden="true"
        className={classname}
      >
        {children}
        <div className={styles.loadingIndicator}>
          <LoaderIndicator
            determinate={determinate}
            currentValue={currentValue}
            maxValue={maxValue}
            size={width <= Breakpoints.base ? "small" : "base"}
          />
        </div>
      </div>
    </div>
  );
}
