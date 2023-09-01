import React, { ReactElement } from "react";
import classNames from "classnames";
import { useInView } from "@jobber/hooks/useInView";
import styles from "./DataListFilters.css";
import { useDataListContext } from "../../context/DataListContext";
import { getCompoundComponent } from "../../DataList.utils";

interface DataListFiltersProps {
  readonly children: ReactElement | ReactElement[];
}

// This component is meant to capture the props of the DataList.Filters
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DataListFilters(_: DataListFiltersProps) {
  return null;
}

/**
 * Renders the DataList.Filters component
 */
export function InternalDataListFilters() {
  const { children: parentChildren } = useDataListContext();
  const component = getCompoundComponent<DataListFiltersProps>(
    parentChildren,
    DataListFilters,
  );

  const [leftRef, isLeftVisible] = useInView<HTMLSpanElement>();
  const [rightRef, isRightVisible] = useInView<HTMLSpanElement>();

  if (!component) return null;

  const { children } = component.props;

  return (
    <div
      className={classNames(styles.filters, {
        [styles.overflowLeft]: !isLeftVisible,
        [styles.overflowRight]: !isRightVisible,
      })}
    >
      <div className={styles.filterActions}>
        <span ref={leftRef} className={styles.overflowTrigger} />

        {children}

        <span ref={rightRef} className={styles.overflowTrigger} />
      </div>
    </div>
  );
}
