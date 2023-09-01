import { RefObject, useEffect, useRef, useState } from "react";

export function useInView<T extends Element>(): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!window.IntersectionObserver) return;

    const observer = new IntersectionObserver(entries => {
      setIsInView(entries[0].isIntersecting);
    });

    ref.current && observer.observe(ref.current);

    return () => {
      if (!ref.current) return;
      observer.unobserve(ref.current);
    };
  });

  return [ref, isInView];
}
