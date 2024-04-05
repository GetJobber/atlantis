import { useEffect, useRef, useState } from "react";

interface UseFormFieldFocus {
  focused: boolean;
  inputWrapperRef: React.RefObject<HTMLDivElement>;
}

export function useFormFieldFocus(): UseFormFieldFocus {
  const [focused, setFocused] = useState(false);

  const inputWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleFocusIn() {
      setFocused(true);
    }

    function handleFocusOut() {
      setTimeout(() => {
        const focusedElementWithinWrapper = inputWrapperRef.current?.contains(
          document.activeElement,
        );

        if (!focusedElementWithinWrapper) {
          setFocused(false);
        }
      }, 1);
    }
    inputWrapperRef.current?.addEventListener("focusin", handleFocusIn);
    inputWrapperRef.current?.addEventListener("focusout", handleFocusOut);

    return () => {
      inputWrapperRef.current?.removeEventListener("focusin", handleFocusIn);
      inputWrapperRef.current?.removeEventListener("focusout", handleFocusOut);
    };
  }, [inputWrapperRef.current]);

  return {
    focused,
    inputWrapperRef,
  };
}
