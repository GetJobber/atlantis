import { RefObject, useCallback, useEffect, useRef, useState } from "react";

export function useInView<T extends Element>(): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  const handleIntersection: IntersectionObserverCallback = useCallback(
    entries => setIsInView(entries[0].isIntersecting),
    [setIsInView],
  );

  useEffect(() => {
    if (!window.IntersectionObserver) return;

    const observer = new IntersectionObserver(handleIntersection);
    ref.current && observer.observe(ref.current);

    return () => {
      ref.current && observer.unobserve(ref.current);
    };
  }, [handleIntersection]);

  return [ref, isInView];
}
