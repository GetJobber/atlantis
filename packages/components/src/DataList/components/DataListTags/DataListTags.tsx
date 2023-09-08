import React, { useEffect, useRef, useState } from "react";
import styles from "./DataListTags.css";
import { InlineLabel } from "../../../InlineLabel";
import { Text } from "../../../Text";

interface DataListTagsProps {
  readonly items: string[];
}

export function DataListTags({ items }: DataListTagsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleIndex, setVisibleIndex] = useState<boolean[]>([]);
  const visibleItems = visibleIndex.filter(Boolean).length;

  useEffect(() => {
    if (!window.IntersectionObserver) return;

    const observer = new IntersectionObserver(handleIntersection, {
      root: ref.current,
      threshold: buildIntersectionThreshold(items),
    });

    const elements = ref.current?.querySelectorAll("[data-tag-element]");
    elements?.forEach(element => observer.observe(element));

    return () => {
      elements?.forEach(element => observer.unobserve(element));
    };
  }, [items]);

  return (
    <div className={styles.tags} ref={ref}>
      {items.filter(Boolean).map((tag, index) => (
        <div key={tag} data-tag-element={index}>
          <InlineLabel>{tag}</InlineLabel>
        </div>
      ))}

      {Boolean(visibleItems) && (
        <div className={styles.tagCount}>
          <Text>+{visibleItems}</Text>
        </div>
      )}
    </div>
  );

  function handleIntersection(
    ...[entries]: Parameters<IntersectionObserverCallback>
  ) {
    entries.forEach(entry => {
      const index = entry.target.getAttribute("data-tag-element");
      const indexNumber = Number(index);
      if (!index || isNaN(indexNumber)) return;

      setVisibleIndex(prevState => {
        const newState = [...prevState];
        newState[indexNumber] = entry.intersectionRatio !== 1;
        return newState;
      });
    });
  }
}

function buildIntersectionThreshold(items: DataListTagsProps["items"]) {
  const thresholds = [];
  const totalItems = items.length;

  for (let i = 1.0; i <= totalItems; i++) {
    const ratio = i / totalItems;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}
