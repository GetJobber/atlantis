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
import { useArrowKeyNavigation } from "./hooks/useArrowKeyNavigation";
import { Typography } from "../Typography";

interface TabsProps {
  readonly children:
    | ReactElement
    | Array<ReactElement | null | undefined | boolean>;

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
  const tabChildren = getActiveTabs(children);

  const activeTabInitialValue =
    defaultTab < tabChildren.length ? defaultTab : 0;
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

  const tabRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

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

  const handleKeyDown = useArrowKeyNavigation({
    elementsRef: tabRefs,
    onActivate: index => activateTab(index)(),
  });

  const activeTabProps = tabChildren[activeTab]?.props;

  useEffect(() => {
    if (activeTab > tabChildren.length - 1) {
      setInternalActiveTab(activeTabInitialValue);
    }
  }, [tabChildren.length]);

  return (
    <div className={styles.tabs}>
      <div className={overflowClassNames}>
        <ul
          role="tablist"
          className={styles.tabRow}
          ref={tabRow}
          onKeyDown={handleKeyDown}
        >
          {React.Children.map(children, child => {
            if (!isChildTab(child)) {
              return child;
            }

            const index = tabChildren.findIndex(
              tab => tab.props.label === child.props.label,
            );

            return (
              <InternalTab
                label={child.props.label}
                selected={activeTab === index}
                activateTab={activateTab(index)}
                onClick={child.props.onClick}
                ref={el => {
                  if (el) {
                    tabRefs.current.set(index, el);
                  } else {
                    tabRefs.current.delete(index);
                  }
                }}
                tabIndex={activeTab === index ? 0 : -1}
              />
            );
          })}
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
            onClick?.(event);
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

function getActiveTabs(children: TabsProps["children"]) {
  const activeTabChildren: ReactElement[] = [];

  React.Children.toArray(children).forEach(child => {
    if (isChildTab(child)) {
      activeTabChildren.push(child);
    }
  });

  return activeTabChildren;
}

function isChildTab(
  child: ReactNode,
): child is ReactElement<TabProps, typeof Tab> {
  return React.isValidElement(child) && child.type === Tab;
}

export { InternalTab };
