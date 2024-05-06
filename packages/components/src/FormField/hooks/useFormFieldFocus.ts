import { useEffect, useRef, useState } from "react";

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
        "[data-atl-maintain-portal-focus='true']",
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

const useActiveElement = () => {
  const [active, setActive] = useState(document.activeElement);

  const handleFocusIn = () => {
    setActive(document.activeElement);
  };

  useEffect(() => {
    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, []);

  return active;
};
