import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
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
   * Specifies the index of the active tab.
   * If provided, the component will be controlled and the active tab will be determined by this prop.
   * If not provided, the component will manage its own state internally.
   */
  readonly activeTab?: number;

  /**
   * Callback that fires when the active tab changes
   * @param newTabIndex
   */
  onTabChange?(newTabIndex: number): void;
}

export function Tabs({
  children,
  defaultTab = 0,
  activeTab: controlledActiveTab,
  onTabChange,
}: TabsProps) {
  const activeTabInitialValue =
    defaultTab < React.Children.count(children) ? defaultTab : 0;
  const [internalActiveTab, setInternalActiveTab] = useState(
    activeTabInitialValue,
  );
  const activeTab =
    controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;
  const { overflowRight, overflowLeft, tabRow } = useTabsOverflow();
  const overflowClassNames = classnames(styles.overflow, {
    [styles.overflowRight]: overflowRight,
    [styles.overflowLeft]: overflowLeft,
  });

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activateTab = (index: number) => {
    return () => {
      if (controlledActiveTab === undefined) {
        setInternalActiveTab(index);
      }

      if (onTabChange) {
        onTabChange(index);
      }
    };
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const currentIndex = tabRefs.current.findIndex(
      tab => tab === document.activeElement,
    );

    if (currentIndex === -1) return;

    const focusAndActivateTab = (index: number) => {
      tabRefs.current[index]?.focus();
      activateTab(index)();
    };

    if (event.key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % tabRefs.current.length;
      focusAndActivateTab(nextIndex);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      const prevIndex =
        (currentIndex - 1 + tabRefs.current.length) % tabRefs.current.length;
      focusAndActivateTab(prevIndex);
    }
  };

  const activeTabProps = (React.Children.toArray(children) as ReactElement[])[
    activeTab
  ]?.props;

  useEffect(() => {
    if (activeTab > React.Children.count(children) - 1) {
      setInternalActiveTab(activeTabInitialValue);
    }
  }, [React.Children.count(children)]);

  return (
    <div className={styles.tabs}>
      <div className={overflowClassNames}>
        <ul
          role="tablist"
          className={styles.tabRow}
          ref={tabRow}
          onKeyDown={handleKeyDown}
        >
          {React.Children.map(children, (tab, index) => (
            <InternalTab
              label={tab.props.label}
              selected={activeTab === index}
              activateTab={activateTab(index)}
              onClick={tab.props.onClick}
              ref={el => (tabRefs.current[index] = el)}
              tabIndex={activeTab === index ? 0 : -1}
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
  readonly label: string | ReactNode;
  readonly children: ReactNode | ReactNode[];

  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export function Tab({ label }: TabProps) {
  return <>{label}</>;
}

interface InternalTabProps {
  readonly label: string | ReactNode;
  readonly selected: boolean;
  activateTab(): void;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  readonly tabIndex: number;
}

const InternalTab = React.forwardRef<HTMLButtonElement, InternalTabProps>(
  ({ label, selected, activateTab, onClick, tabIndex }, ref) => {
    const className = classnames(styles.tab, { [styles.selected]: selected });

    return (
      <li role="presentation">
        <button
          type="button"
          role="tab"
          className={className}
          onClick={event => {
            activateTab();

            if (onClick) {
              onClick(event);
            }
          }}
          ref={ref}
          tabIndex={tabIndex}
        >
          {typeof label === "string" ? (
            <Typography element="span" size="large" fontWeight="semiBold">
              {label}
            </Typography>
          ) : (
            label
          )}
        </button>
      </li>
    );
  },
);

InternalTab.displayName = "InternalTab";

export { InternalTab };
