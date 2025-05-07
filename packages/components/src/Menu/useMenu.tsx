import React, {
  MouseEvent,
  ReactElement,
  useId,
  useRef,
  useState,
} from "react";
import { useWindowDimensions } from "@jobber/hooks/useWindowDimensions";
import classNames from "classnames";
import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
import { usePopper } from "react-popper";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { useFocusTrap } from "@jobber/hooks/useFocusTrap";
import styles from "./Menu.module.css";
import { Button } from "../Button";

// eslint-disable-next-line max-statements
export const useMenu = ({ activator }: { activator?: ReactElement }) => {
  const [SMALL_SCREEN_BREAKPOINT, setSMALL_SCREEN_BREAKPOINT] = useState(490);
  const [MENU_OFFSET, setMENU_OFFSET] = useState(6);

  const [variation, setVariation] = useState({
    overlayStartStop: { opacity: 0 },
    startOrStop: (placement: string | undefined) => {
      let y = 10;

      if (placement?.includes("bottom")) y *= -1;
      if (window.innerWidth < SMALL_SCREEN_BREAKPOINT) y = 150;

      return { opacity: 0, y };
    },
    done: { opacity: 1, y: 0 },
  });

  function handleKeyboardShortcut(event: KeyboardEvent) {
    const { key } = event;
    if (!visible) return;

    event.preventDefault();
    event.stopPropagation();
    key === "Escape" && hide();
  }
  const [visible, setVisible] = useState(false);
  const popperRef = useRef<HTMLDivElement>(null);

  const { width } = useWindowDimensions();

  const buttonID = useId();
  const menuID = useId();

  const fullWidth = activator?.props?.fullWidth || false;

  const wrapperClasses = classNames(styles.wrapper, {
    [styles.fullWidth]: fullWidth,
  });

  useOnKeyDown(handleKeyboardShortcut, ["Escape"]);

  // useRefocusOnActivator must come before useFocusTrap for them both to work
  useRefocusOnActivator(visible);
  const menuRef = useFocusTrap<HTMLDivElement>(visible);

  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const {
    styles: popperStyles,
    attributes,
    state,
  } = usePopper(popperRef.current, popperElement, {
    placement: "bottom-start",
    strategy: "fixed",
    modifiers: [
      {
        name: "flip",
        options: {
          flipVariations: true,
        },
      },
      {
        name: "offset",
        options: {
          offset: [0, MENU_OFFSET],
        },
      },
    ],
  });
  const positionAttributes =
    width >= SMALL_SCREEN_BREAKPOINT
      ? {
          ...attributes.popper,
          style: popperStyles.popper,
        }
      : {};

  if (!activator) {
    activator = (
      <Button
        fullWidth={true}
        label="More Actions"
        icon="more"
        type="secondary"
      />
    );
  }

  function toggle(callbackPassthrough?: (event?: MouseEvent) => void) {
    return (event: MouseEvent) => {
      setVisible(!visible);
      callbackPassthrough && callbackPassthrough(event);
    };
  }

  function hide() {
    setVisible(false);
  }

  function handleParentClick(event: MouseEvent<HTMLDivElement>) {
    // Since the menu is being rendered within the same parent as the activator,
    // we need to stop the click event from bubbling up. If the Menu component
    // gets added within a parent that has a click handler, any click on the
    // menu will trigger the parent's click handler.
    event.stopPropagation();
  }

  return {
    activator,
    buttonID,
    positionAttributes,
    menuID,
    wrapperClasses,
    handleParentClick,
    toggle,
    hide,
    visible,
    variation,
    setVariation,
    SMALL_SCREEN_BREAKPOINT,
    setSMALL_SCREEN_BREAKPOINT,
    MENU_OFFSET,
    setMENU_OFFSET,
    menuRef,
    setPopperElement,
    popperRef,
    popperStyles,
    attributes,
    state,
    fullWidth,
  };
};
