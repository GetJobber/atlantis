import { useEffect, useRef, useState } from "react";
import { useActiveElement } from "./useActiveElement";

interface UseFormFieldFocus {
  focused: boolean;
}

interface UseFormFieldFocusProps {
  wrapperRef?: React.RefObject<HTMLDivElement>;
}

const FOCUS_DATA_ATTRIBUTE = "data-atl-maintain-portal-focus";

export const focusAttribute = {
  [FOCUS_DATA_ATTRIBUTE]: "true",
};

export function useFormFieldFocus(
  props: UseFormFieldFocusProps,
): UseFormFieldFocus {
  const [focused, setFocused] = useState(false);
  const activeElement = useActiveElement();
  const activeElementRef = useRef(activeElement);

  useEffect(() => {
    activeElementRef.current = activeElement;
  }, [activeElement]);

  function handleFocusIn() {
    setFocused(true);
  }

  function handleFocusOut() {
    setTimeout(() => {
      const focusedElementWithinWrapper = props.wrapperRef?.current?.contains(
        document.activeElement,
      );
      const focusException = activeElementRef.current?.closest(
        `[${FOCUS_DATA_ATTRIBUTE}='true']`,
      );

      if (!focusedElementWithinWrapper && !focusException) {
        setFocused(false);
      }
    }, 1);
  }

  useEffect(() => {
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
