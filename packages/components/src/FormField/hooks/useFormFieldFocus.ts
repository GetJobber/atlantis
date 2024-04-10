import { useEffect, useState } from "react";

interface UseFormFieldFocus {
  focused: boolean;
}

interface UseFormFieldFocusProps {
  wrapperRef?: React.RefObject<HTMLDivElement>;
}

export function useFormFieldFocus(
  props: UseFormFieldFocusProps,
): UseFormFieldFocus {
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    function handleFocusIn() {
      setFocused(true);
    }

    function handleFocusOut() {
      setTimeout(() => {
        const focusedElementWithinWrapper = props.wrapperRef?.current?.contains(
          document.activeElement,
        );

        if (!focusedElementWithinWrapper) {
          setFocused(false);
        }
      }, 1);
    }
    props.wrapperRef?.current?.addEventListener("focusin", handleFocusIn);
    props.wrapperRef?.current?.addEventListener("focusout", handleFocusOut);

    return () => {
      props.wrapperRef?.current?.removeEventListener("focusin", handleFocusIn);
      props.wrapperRef?.current?.removeEventListener(
        "focusout",
        handleFocusOut,
      );
    };
  }, [props.wrapperRef?.current]);

  return {
    focused,
  };
}
