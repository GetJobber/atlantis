import React, { CSSProperties, ReactElement, ReactNode, useState } from "react";
import classnames from "classnames";
import {
  Breakpoints,
  useResizeObserver,
} from "@jobber/hooks/useResizeObserver";
import styles from "./Disclosure.module.css";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

interface DisclosureProps {
  /**
   * Child content that is manged by this component.
   */
  readonly children: ReactNode | ReactNode[];

  /**
   * Title for the disclosure pane.
   * If ReactElement[] is provided, it must be wrapped in a container element (not a Fragment).
   */
  readonly title: string | ReactElement | ReactElement[];

  /**
   * This sets the default open state of the disclosure.
   * By default the disclosure is closed.
   * For use when the component is being used as an Uncontrolled Component.
   * @default false
   */
  readonly defaultOpen?: boolean;

  /**
   * Callback that is called when the disclosure is toggled.
   */
  readonly onToggle?: (newOpened: boolean) => void;

  /**
   * Used to make the disclosure a Controlled Component.
   */
  readonly open?: boolean;

  /**
   * **Use at your own risk:** Custom classNames for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    container?: string;
    summary?: string;
    summaryWrap?: string;
    title?: { textStyle?: string };
    icon?: {
      svg?: string;
      path?: string;
    };
    arrowIconWrapper?: string;
    content?: string;
  };

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    container?: CSSProperties;
    summary?: CSSProperties;
    summaryWrap?: CSSProperties;
    title?: { textStyle?: CSSProperties };
    icon?: {
      svg?: CSSProperties;
      path?: CSSProperties;
    };
    arrowIconWrapper?: CSSProperties;
    content?: CSSProperties;
  };
}

export function Disclosure({
  children,
  title,
  defaultOpen = false,
  onToggle,
  open,
  UNSAFE_className = {},
  UNSAFE_style = {},
}: DisclosureProps) {
  const [internalOpen, setInternalOpen] = useState(
    defaultOpen || open || false,
  );
  const isOpen = open !== undefined ? open : internalOpen;
  const [titleRef, { exactWidth }] = useResizeObserver<HTMLDivElement>();
  const isBelowBreakpoint = exactWidth && exactWidth < Breakpoints.small;
  const isTitleString = typeof title === "string";

  const containerClassNames = classnames(
    styles.details,
    UNSAFE_className.container,
  );

  const summaryClassNames = classnames(
    styles.summary,
    UNSAFE_className.summary,
  );

  const summaryWrapClassNames = classnames(
    styles.summaryWrap,
    { [styles.customSummaryWrap]: !isTitleString },
    UNSAFE_className.summaryWrap,
  );

  const arrowIconWrapperClassNames = classnames(
    styles.arrowIconWrapper,
    UNSAFE_className.arrowIconWrapper,
  );

  const contentClassNames = classnames(
    styles.content,
    UNSAFE_className.content,
  );

  return (
    <details
      open={isOpen}
      className={containerClassNames}
      style={UNSAFE_style.container}
    >
      <summary
        className={summaryClassNames}
        style={UNSAFE_style.summary}
        onClick={handleToggle}
      >
        <div
          className={summaryWrapClassNames}
          style={UNSAFE_style.summaryWrap}
          ref={titleRef}
        >
          <DisclosureTitle
            title={title}
            size={isBelowBreakpoint ? "base" : "large"}
            isTitleString={isTitleString}
            UNSAFE_className={UNSAFE_className.title}
            UNSAFE_style={UNSAFE_style.title}
          />
          <span
            className={arrowIconWrapperClassNames}
            style={UNSAFE_style.arrowIconWrapper}
          >
            <Icon
              name="arrowDown"
              color="interactive"
              UNSAFE_className={{
                svg: UNSAFE_className.icon?.svg,
                path: UNSAFE_className.icon?.path,
              }}
              UNSAFE_style={{
                svg: UNSAFE_style.icon?.svg,
                path: UNSAFE_style.icon?.path,
              }}
            />
          </span>
        </div>
      </summary>
      <span className={contentClassNames} style={UNSAFE_style.content}>
        {children}
      </span>
    </details>
  );

  function handleToggle(event: React.MouseEvent<HTMLDetailsElement>) {
    event.preventDefault();

    setInternalOpen(!isOpen);
    onToggle?.(!isOpen);
  }
}

interface DisclosureTitleProps {
  /**
   * Title for the disclosure pane.
   */
  readonly title: string | ReactNode | ReactNode[];
  /**
   * Size when the title is a string.
   */
  readonly size: "base" | "large";
  /**
   * Whether the title is a string.
   */
  readonly isTitleString: boolean;
  /**
   * Custom className for the DisclosureTitle.
   */
  readonly UNSAFE_className?: { textStyle?: string };
  /**
   * Custom style for the DisclosureTitle.
   */
  readonly UNSAFE_style?: { textStyle?: CSSProperties };
}

function DisclosureTitle({
  title,
  size,
  isTitleString,
  UNSAFE_className,
  UNSAFE_style,
}: DisclosureTitleProps) {
  if (!isTitleString) return <>{title}</>;

  return (
    <Typography
      element="h4"
      size={size}
      fontWeight="bold"
      textColor="heading"
      UNSAFE_className={UNSAFE_className}
      UNSAFE_style={UNSAFE_style}
    >
      {title}
    </Typography>
  );
}
