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

  /**
   * Specifies the tab that should be active on mount
   * @default 0
   */
  readonly activeTabOnMount?: number;

  /**
   * Callback that fires when the active tab changes
   * @param newTabIndex
   * @param prevTabIndex
   */
  onTabChange?(newTabIndex: number, prevTabIndex: number): void;
}

export function Tabs({
  children,
  activeTabOnMount = 0,
  onTabChange,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(activeTabOnMount);
  const [overflowRight, setOverflowRight] = useState(false);
  const [overflowLeft, setOverflowLeft] = useState(false);
  const tabRow = useRef() as MutableRefObject<HTMLUListElement>;

  const overflowClassNames = classnames(styles.overflow, {
    [styles.overflowRight]: overflowRight,
    [styles.overflowLeft]: overflowLeft,
  });

  const activateTab = (index: number) => {
    return () => {
      setActiveTab(index);

      if (onTabChange) {
        onTabChange(index, activeTab);
      }
    };
  };

  const activeTabProps = (React.Children.toArray(children) as ReactElement[])[
    activeTab
  ].props;

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
        <ul role="tablist" className={styles.tabRow} ref={tabRow}>
          <li role="presentation">
            {React.Children.map(children, (tab, index) => (
              <InternalTab
                label={tab.props.label}
                selected={activeTab === index}
                activateTab={activateTab(index)}
                onClick={tab.props.onClick}
              />
            ))}
          </li>
        </ul>
      </div>
      <section
        role="tabpanel"
        className={styles.tabContent}
        aria-label={activeTabProps.label}
      >
        {activeTabProps.children}
      </section>
    </div>
  );
}

interface TabProps {
  readonly label: string;
  readonly children: ReactNode | ReactNode[];
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export function Tab({ label }: TabProps) {
  return <>{label}</>;
}

interface InternalTabProps {
  readonly label: string;
  readonly selected: boolean;
  activateTab(): void;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
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
  const color = selected ? "green" : "heading";

  return (
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
      <Typography element="span" size="base" textColor={color}>
        {label}
      </Typography>
    </button>
  );
}
