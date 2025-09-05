import React from "react";
import { useInView } from "@jobber/hooks";
import classNames from "classnames";
import { CONTAINER_TEST_ID } from "./DataListOverflowFade.const";
import styles from "./DataListOverflowFade.module.css";

interface DataListOverflowFadeProps {
  readonly children: React.ReactNode;
}

export function DataListOverflowFade({ children }: DataListOverflowFadeProps) {
  const [leftRef, isLeftVisible] = useInView<HTMLSpanElement>();
  const [rightRef, isRightVisible] = useInView<HTMLSpanElement>();

  return (
    <div
      data-testid={CONTAINER_TEST_ID}
      className={classNames(styles.fadeContainer, {
        [styles.overflowLeft]: !isLeftVisible,
        [styles.overflowRight]: !isRightVisible,
      })}
    >
      <div className={styles.overflowGrid}>
        <span ref={leftRef} className={styles.overflowTrigger} />

        <div className={styles.overflowItems}>{children}</div>

        <span ref={rightRef} className={styles.overflowTrigger} />
      </div>
    </div>
  );
}
