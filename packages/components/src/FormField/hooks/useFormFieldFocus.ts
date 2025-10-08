import { useEffect, useState } from "react";

interface UseFormFieldFocus {
  focused: boolean;
}

interface UseFormFieldFocusProps {
  wrapperRef?: React.RefObject<HTMLDivElement | null>;
}

const PORTAL_FOCUS_ATTRIBUTE_NAME = "data-atl-maintain-portal-focus";

export const formFieldFocusAttribute = {
  [PORTAL_FOCUS_ATTRIBUTE_NAME]: "true",
};

export function useFormFieldFocus(
  props: UseFormFieldFocusProps,
): UseFormFieldFocus {
  const [focused, setFocused] = useState(false);

  function handleFocusIn() {
    setFocused(true);
  }

  function handleFocusOut() {
    setTimeout(() => {
      const focusedElementWithinWrapper = props.wrapperRef?.current?.contains(
        document?.activeElement,
      );
      const focusException = document?.activeElement?.closest(
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
  }, []);

  return {
    focused,
  };
}
