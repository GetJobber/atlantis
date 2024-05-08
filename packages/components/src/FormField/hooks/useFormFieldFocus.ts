import { useEffect, useRef, useState } from "react";
import { useActiveElement } from "./useActiveElement";

interface UseFormFieldFocus {
  focused: boolean;
}

interface UseFormFieldFocusProps {
  wrapperRef?: React.RefObject<HTMLDivElement>;
}

const PORTAL_FOCUS_ATTRIBUTE_NAME = "data-atl-maintain-portal-focus";

export const formFieldFocusAttribute = {
  [PORTAL_FOCUS_ATTRIBUTE_NAME]: "true",
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
        `[${PORTAL_FOCUS_ATTRIBUTE_NAME}='true']`,
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
