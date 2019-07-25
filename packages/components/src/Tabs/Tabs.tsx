import React, { ReactElement, ReactNode, useState } from "react";
import classnames from "classnames";
import { Typography } from "../Typography";
import styles from "./Tabs.css";

interface TabsProps {
  readonly children: ReactElement | ReactElement[];
}

export function Tabs({ children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const activateTab = (index: number) => {
    return () => {
      setActiveTab(index);
    };
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.tabRow}>
        {React.Children.map(children, (Tab, index) => (
          <InternalTab
            label={Tab.props.label}
            selected={activeTab === index}
            onClick={activateTab(index)}
          />
        ))}
      </div>
      <div className={styles.tabContent}>
        {React.Children.toArray(children)[activeTab].props.children}
      </div>
    </div>
  );
}

interface TabProps {
  readonly label: string;
  readonly children: ReactNode | ReactNode[];
}

export function Tab({ label }: TabProps) {
  return <>{label}</>;
}

interface InternalTabProps {
  readonly label: string;
  readonly selected: boolean;
  onClick(): void;
}

export function InternalTab({ label, selected, onClick }: InternalTabProps) {
  const className = classnames(styles.tab, { [styles.selected]: selected });
  const color = selected ? "green" : undefined;

  return (
    <button type="button" role="tab" className={className} onClick={onClick}>
      <Typography element="span" size="base" textColor={color}>
        {label}
      </Typography>
    </button>
  );
}
