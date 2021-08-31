import React, {
  MutableRefObject,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import classnames from "classnames";
import styles from "./Tabs.css";
import { Typography } from "../Typography";

interface TabsProps {
  readonly children: ReactElement | ReactElement[];
}

export function Tabs({ children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [overflowRight, setOverflowRight] = useState(false);
  const [overflowLeft, setOverflowLeft] = useState(false);
  const tabRow = useRef() as MutableRefObject<HTMLDivElement>;

  const overflowClassNames = classnames(styles.overflow, {
    [styles.overflowRight]: overflowRight,
    [styles.overflowLeft]: overflowLeft,
  });

  const activateTab = (index: number) => {
    return () => {
      setActiveTab(index);
    };
  };

  const handleOverflowing = () => {
    if (tabRow.current) {
      const scrollWidth = tabRow.current.scrollWidth;
      const clientWidth = tabRow.current.clientWidth;
      const maxScroll = scrollWidth - clientWidth;
      const scrollPos = tabRow.current.scrollLeft;

      if (scrollWidth > clientWidth) {
        setOverflowRight(scrollPos >= 0 && scrollPos != maxScroll);
        setOverflowLeft(scrollPos > 0 && scrollPos < scrollWidth);
      }
    }
  };

  useEffect(() => {
    handleOverflowing();
    tabRow.current &&
      tabRow.current.addEventListener("scroll", handleOverflowing);

    return () => {
      window.removeEventListener("scroll", handleOverflowing);
    };
  });

  return (
    <div className={styles.tabs}>
      <div className={overflowClassNames}>
        <div className={styles.tabRow} ref={tabRow}>
          {React.Children.map(children, (tab, index) => (
            <InternalTab
              label={tab.props.label}
              selected={activeTab === index}
              activateTab={activateTab(index)}
              onClick={tab.props.onClick}
            />
          ))}
        </div>
      </div>
      <div className={styles.tabContent}>
        {
          (React.Children.toArray(children) as ReactElement[])[activeTab].props
            .children
        }
      </div>
    </div>
  );
}

interface TabProps {
  readonly label: string;
  readonly children: ReactNode | ReactNode[];
  onClick?(event: React.MouseEvent<HTMLElement>): void;
}

export function Tab({ label }: TabProps) {
  return <>{label}</>;
}

interface InternalTabProps {
  readonly label: string;
  readonly selected: boolean;
  activateTab(): void;
  onClick?(event: React.MouseEvent<HTMLElement>): void;
}

export function InternalTab({
  label,
  selected,
  activateTab,
  onClick = () => {
    return;
  },
}: InternalTabProps) {
  const className = classnames(styles.tab, { [styles.selected]: selected });
  const color = selected ? "green" : undefined;
  return (
    <button
      type="button"
      role="tab"
      className={className}
      onClick={event => {
        activateTab();
        onClick(event);
      }}
    >
      <Typography element="span" size="base" textColor={color}>
        {label}
      </Typography>
    </button>
  );
}
