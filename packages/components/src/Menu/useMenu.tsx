import { useFocusTrap } from "@jobber/hooks/useFocusTrap";
import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { useWindowDimensions } from "@jobber/hooks/useWindowDimensions";
import { useId, useRef, useState } from "react";

export const useMenu = () => {
  const [visible, setVisible] = useState(false);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const shadowRef = useRef<HTMLSpanElement>(null);

  const { width } = useWindowDimensions();
  const buttonID = useId();
  const menuID = useId();
  useOnKeyDown(
    event => handleKeyboardShortcut(event, visible, () => setVisible(false)),
    ["Escape"],
  );

  // useRefocusOnActivator must come before useFocusTrap for them both to work
  useRefocusOnActivator(visible);
  const menuRef = useFocusTrap<HTMLDivElement>(visible);

  function toggle(callbackPassthrough?: (event?: React.MouseEvent) => void) {
    return (event: React.MouseEvent) => {
      setVisible(!visible);
      callbackPassthrough && callbackPassthrough(event);
    };
  }

  function hide() {
    setVisible(false);
  }

  return {
    visible,
    setVisible,
    popperElement,
    setPopperElement,
    shadowRef,
    width,
    toggle,
    hide,
    menuID,
    buttonID,
    menuRef,
  };
};

export function MenuVariation(smallScreenBreakpoint: number) {
  return {
    overlayStartStop: { opacity: 0 },
    startOrStop: (placement: string | undefined) => {
      let y = 10;

      if (placement?.includes("bottom")) y *= -1;
      if (window.innerWidth < smallScreenBreakpoint) y = 150;

      return { opacity: 0, y };
    },
    done: { opacity: 1, y: 0 },
  };
}

export function handleKeyboardShortcut(
  event: KeyboardEvent,
  visible: boolean,
  hide: () => void,
) {
  const { key } = event;
  if (!visible) return;

  event.preventDefault();
  event.stopPropagation();
  key === "Escape" && hide();
}
