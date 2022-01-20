import { useEffect, useRef, useState } from "react";

export function useInView<T extends Element>() {
  const ref = useRef<T>(null); // eslint-disable-line no-null/no-null
  const [isInView, setIsInView] = useState(false);

  const observer = new IntersectionObserver(entries => {
    setIsInView(entries[0].isIntersecting);
  });

  useEffect(() => {
    if (!ref.current) return;
    observer.observe(ref.current);

    return () => {
      if (!ref.current) return;
      observer.unobserve(ref.current);
    };
  });

  return { ref, isInView };
}
