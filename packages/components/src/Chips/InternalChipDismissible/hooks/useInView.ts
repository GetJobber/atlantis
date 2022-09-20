import { useEffect, useRef, useState } from "react";

export function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  if (window.IntersectionObserver) {
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
  }

  return { ref, isInView };
}
