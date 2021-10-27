import React, {
  MutableRefObject,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import classnames from "classnames";
import { Tab as HeadlessTab } from "@headlessui/react";
import styles from "./Tabs.css";
import { Typography } from "../Typography";

interface TabsProps {
  readonly children: ReactElement | ReactElement[];
}

export function Tabs({ children }: TabsProps) {
  const [overflowRight, setOverflowRight] = useState(false);
  const [overflowLeft, setOverflowLeft] = useState(false);
  const tabRow = useRef() as MutableRefObject<HTMLDivElement>;

  const overflowClassNames = classnames(styles.overflow, {
    [styles.overflowRight]: overflowRight,
    [styles.overflowLeft]: overflowLeft,
  });

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
    <HeadlessTab.Group as="div" className={styles.tabs}>
      <div className={overflowClassNames}>
        <HeadlessTab.List className={styles.tabRow} ref={tabRow}>
          {React.Children.map(children, tab => (
            <HeadlessTab
              className={({ selected }) =>
                classnames(styles.tab, { [styles.selected]: selected })
              }
            >
              {({ selected }) => (
                <InternalTab label={tab.props.label} selected={selected} />
              )}
            </HeadlessTab>
          ))}
        </HeadlessTab.List>
      </div>
      <HeadlessTab.Panels className={styles.tabContent}>
        {React.Children.map(children, tab => (
          <HeadlessTab.Panel>{tab.props.children}</HeadlessTab.Panel>
        ))}
      </HeadlessTab.Panels>
    </HeadlessTab.Group>
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
}

export function InternalTab({ label, selected }: InternalTabProps) {
  const color = selected ? "green" : "heading";
  return (
    <Typography element="span" size="base" textColor={color}>
      {label}
    </Typography>
  );
}
