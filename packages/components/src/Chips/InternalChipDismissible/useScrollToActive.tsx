import { useEffect, useRef } from "react";

export function useScrollToActive(index: number) {
  const ref = useRef<HTMLDivElement>(null); // eslint-disable-line no-null/no-null

  useEffect(() => {
    ref.current?.children[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [index]);

  return ref;
}
