import classNames from "classnames";
import type { PropsWithChildren } from "react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./DataListStickyHeader.module.css";
import { DATA_LIST_STICKY_HEADER_TEST_ID } from "../../DataList.const";

export function DataListStickyHeader({ children }: PropsWithChildren<object>) {
  const [isStuck, setIsStuck] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleObserver = useCallback(
    ([e]: IntersectionObserverEntry[]) => setIsStuck(e.intersectionRatio < 1),
    [setIsStuck],
  );

  useEffect(() => {
    if (!window.IntersectionObserver) return;

    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
    ref.current && observer.observe(ref.current);

    return () => {
      ref.current && observer.unobserve(ref.current);
    };
  }, [handleObserver, ref.current]);

  return (
    <div
      data-testid={DATA_LIST_STICKY_HEADER_TEST_ID}
      ref={ref}
      className={classNames(styles.header, { [styles.stuck]: isStuck })}
    >
      {children}
    </div>
  );
}
