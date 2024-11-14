import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import classnames from "classnames";
import styles from "./Tabs.module.css";
import { useTabsOverflow } from "./hooks/useTabsOverflow";
import { Typography } from "../Typography";

interface TabsProps {
  readonly children: ReactElement | ReactElement[];

  /**
   * Specifies the index of the tab that should be active on mount
   *
   * @default 0
   */
  readonly defaultTab?: number;

  /**
   * Callback that fires when the active tab changes
   * @param newTabIndex
   */
  onTabChange?(newTabIndex: number): void;
}

export function Tabs({ children, defaultTab = 0, onTabChange }: TabsProps) {
  const activeTabInitialValue =
    defaultTab < React.Children.count(children) ? defaultTab : 0;
  const [activeTab, setActiveTab] = useState(activeTabInitialValue);
  const { overflowRight, overflowLeft, tabRow } = useTabsOverflow();
  const overflowClassNames = classnames(styles.overflow, {
    [styles.overflowRight]: overflowRight,
    [styles.overflowLeft]: overflowLeft,
  });

  const activateTab = (index: number) => {
    return () => {
      setActiveTab(index);

      if (onTabChange) {
        onTabChange(index);
      }
    };
  };

  const activeTabProps = (React.Children.toArray(children) as ReactElement[])[
    activeTab
  ]?.props;

  useEffect(() => {
    if (activeTab > React.Children.count(children) - 1) {
      setActiveTab(activeTabInitialValue);
    }
  }, [React.Children.count(children)]);

  return (
    <div className={styles.tabs}>
      <div className={overflowClassNames}>
        <ul role="tablist" className={styles.tabRow} ref={tabRow}>
          {React.Children.map(children, (tab, index) => (
            <InternalTab
              label={tab.props.label}
              selected={activeTab === index}
              activateTab={activateTab(index)}
              onClick={tab.props.onClick}
              customRenderItem={tab.props.customRenderItem}
            />
          ))}
        </ul>
      </div>
      <section
        role="tabpanel"
        className={styles.tabContent}
        aria-label={activeTabProps?.label}
      >
        {activeTabProps?.children}
      </section>
    </div>
  );
}

interface TabProps {
  readonly label: string;
  readonly children: ReactNode | ReactNode[];
  readonly customRenderItem?: (item: T) => React.ReactNode;

  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export function Tab({ label }: TabProps) {
  return <>{label}</>;
}

interface InternalTabProps {
  readonly label: string;
  readonly selected: boolean;
  readonly customRenderItem?: (item: T) => React.ReactNode;
  activateTab(): void;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export function InternalTab({
  label,
  selected,
  activateTab,
  customRenderItem,
  onClick = () => {
    return;
  },
}: InternalTabProps) {
  const className = classnames(styles.tab, { [styles.selected]: selected });

  console.log("***** customRenderItem", customRenderItem);

  return (
    <li role="presentation">
      <button
        type="button"
        role="tab"
        id={label}
        className={className}
        onClick={event => {
          activateTab();
          onClick(event);
        }}
      >
        {customRenderItem ? (
          customRenderItem
        ) : (
          <Typography element="span" size="large" fontWeight="semiBold">
            {label}
          </Typography>
        )}
      </button>
    </li>
  );
}
