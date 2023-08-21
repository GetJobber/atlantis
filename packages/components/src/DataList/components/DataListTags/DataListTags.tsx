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

    const tagElements = ref.current?.querySelectorAll("[data-tag-element");
    tagElements?.forEach(tag => observer.observe(tag));

    return () => {
      tagElements?.forEach(tag => observer.unobserve(tag));
    };
  }, []);

  return (
    <div className={styles.tags} ref={ref}>
      {items.filter(Boolean).map((tag, index) => (
        <div key={index} data-tag-element={index}>
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
      if (!index || isNaN(Number(index))) return;

      setVisibleIndex(arr => {
        const newArr = [...arr];
        newArr[Number(index)] = entry.intersectionRatio < 0.5;
        return newArr;
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
