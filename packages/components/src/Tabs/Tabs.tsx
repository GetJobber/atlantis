import React, { ReactElement, cloneElement, useState } from "react";
import classnames from "classnames";
import { Text } from "../Text";
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
            text={Tab.props.text}
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
  readonly text: string;
  readonly children: string;
}

export function Tab({ text }: TabProps) {
  return <div>{text}</div>;
}

interface InternalTabProps {
  readonly text: string;
  readonly selected: boolean;
  onClick(): void;
}

export function InternalTab({ text, selected, onClick }: InternalTabProps) {
  const className = classnames(styles.tab, { [styles.selected]: selected });
  const variation = selected ? "success" : undefined;

  return (
    <button type="button" role="tab" className={className} onClick={onClick}>
      {/* Should I use Typography here instead? */}
      <Text variation={variation}>{text}</Text>
    </button>
  );
}
