import { useEffect, useRef, useState } from "react";

interface UseFormFieldFocus {
  focused: boolean;
  wrapperRef: React.RefObject<HTMLDivElement>;
}

export function useFormFieldFocus(): UseFormFieldFocus {
  const [focused, setFocused] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleFocusIn() {
      setFocused(true);
    }

    function handleFocusOut() {
      setTimeout(() => {
        const focusedElementWithinWrapper = wrapperRef.current?.contains(
          document.activeElement,
        );

        if (!focusedElementWithinWrapper) {
          setFocused(false);
        }
      }, 1);
    }
    wrapperRef.current?.addEventListener("focusin", handleFocusIn);
    wrapperRef.current?.addEventListener("focusout", handleFocusOut);

    return () => {
      wrapperRef.current?.removeEventListener("focusin", handleFocusIn);
      wrapperRef.current?.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  return {
    focused,
    wrapperRef,
  };
}
