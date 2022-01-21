import { useEffect, useRef, useState } from "react";

export function useInView<T extends Element>() {
  const ref = useRef<T>(null); // eslint-disable-line no-null/no-null
  const [isInView, setIsInView] = useState(false);
  const hasIntersectionObserver = !!window.IntersectionObserver;

  if (hasIntersectionObserver) {
    const observer = new IntersectionObserver(entries => {
      setIsInView(entries[0].isIntersecting);
    });

    useEffect(() => {
      ref.current && observer.observe(ref.current);

      return () => {
        if (!ref.current) return;
        observer.unobserve(ref.current);
      };
    });
  } else {
    console.warn("IntersectionObserver is not supported");
  }

  return { ref, isInView };
}
