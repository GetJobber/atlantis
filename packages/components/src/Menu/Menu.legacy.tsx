import type { MouseEvent, ReactElement } from "react";
import React, { useId, useMemo, useRef, useState } from "react";
import classnames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import {
  useIsMounted,
  useRefocusOnActivator,
  useWindowDimensions,
} from "@jobber/hooks";
import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
} from "@floating-ui/react";
import styles from "./Menu.module.css";
import type {
  ActionProps,
  MenuLegacyProps,
  SectionHeaderProps,
} from "./Menu.types";
import {
  MENU_ANIMATION_CONFIG,
  MENU_MAX_HEIGHT_PERCENTAGE,
  MENU_OFFSET,
  OVERLAY_ANIMATION_CONFIG,
  SMALL_SCREEN_BREAKPOINT,
  Y_TRANSLATION_DESKTOP,
  Y_TRANSLATION_MOBILE,
} from "./constants";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { Icon } from "../Icon";
import { formFieldFocusAttribute } from "../FormField/hooks/useFormFieldFocus";
import { calculateMaxHeight } from "../utils/maxHeight";

const animationVariation = {
  overlayStartStop: { opacity: 0 },
  startOrStop: (placement: string | undefined) => {
    let y = Y_TRANSLATION_DESKTOP;

    if (placement?.includes("bottom")) y *= -1;
    if (isMobileDevice()) y = Y_TRANSLATION_MOBILE;

    return { opacity: 0, y };
  },
  done: { opacity: 1, y: 0 },
};

function isMobileDevice(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.innerWidth <= SMALL_SCREEN_BREAKPOINT;
}

// eslint-disable-next-line max-statements
export function MenuLegacy({
  activator,
  items,
  UNSAFE_className,
  UNSAFE_style,
}: MenuLegacyProps) {
  const [visible, setVisible] = useState(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<Array<HTMLElement | null>>([]);

  const { width } = useWindowDimensions();

  const buttonID = useId();
  const menuID = useId();

  const fullWidth = activator?.props?.fullWidth || false;

  const wrapperClasses = classnames(styles.wrapper, {
    [styles.fullWidth]: fullWidth,
  });

  // Ensure focus returns to the activator when closed
  useRefocusOnActivator(visible);

  const isLargeScreen = width >= SMALL_SCREEN_BREAKPOINT;
  const middleware = useMemo(() => {
    if (isLargeScreen) {
      return [
        offset(MENU_OFFSET),
        flip({ fallbackPlacements: ["bottom-end", "top-start", "top-end"] }),
        size({
          apply({ availableHeight, elements }) {
            // The inner element is the scrollable menu that requires the max height
            const menuElement = elements.floating.querySelector(
              '[role="menu"]',
            ) as HTMLElement;

            if (menuElement) {
              const viewportHeight = window.innerHeight;
              const maxHeightVh =
                (viewportHeight * MENU_MAX_HEIGHT_PERCENTAGE) / 100;

              const maxHeight = calculateMaxHeight(availableHeight, {
                maxHeight: maxHeightVh,
              });

              Object.assign(menuElement.style, {
                maxHeight: `${maxHeight}px`,
              });
            }
          },
        }),
      ];
    }

    return [];
  }, [isLargeScreen]);

  const { refs, floatingStyles, context } = useFloating({
    open: visible,
    onOpenChange: (isOpen: boolean) => {
      setVisible(isOpen);
    },
    placement: "bottom-start",
    strategy: "fixed",
    middleware,
    elements: {
      reference: referenceElement,
    },
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [dismiss, listNavigation],
  );

  const positionAttributes = isLargeScreen
    ? {
        style: floatingStyles,
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

  let itemIndexCounter = 0;

  const renderedSections = items?.map((item, key: number) => (
    <div key={key} className={styles.legacySection}>
      {item.header && (
        <SectionHeader
          className={UNSAFE_className?.header}
          style={UNSAFE_style?.header}
          text={item.header}
        />
      )}
      {item.actions.map(action => {
        const currentIndex = itemIndexCounter++;

        return (
          <Action
            className={UNSAFE_className?.action}
            style={UNSAFE_style?.action}
            getItemProps={getItemProps}
            key={action.label}
            sectionLabel={item.header}
            setItemNode={node => {
              listRef.current[currentIndex] = node;
            }}
            tabIndex={activeIndex === currentIndex ? 0 : -1}
            {...action}
          />
        );
      })}
    </div>
  ));

  return (
    <div className={wrapperClasses} onClick={handleParentClick}>
      <div ref={setReferenceElement} {...getReferenceProps()}>
        {React.cloneElement(activator, {
          onClick: toggle(activator.props.onClick),
          id: buttonID,
          ariaControls: menuID,
          ariaExpanded: visible,
          ariaHaspopup: true,
        })}
      </div>
      <MenuPortal>
        <AnimatePresence>
          {visible && (
            <>
              <motion.div
                animate="done"
                className={styles.overlay}
                exit="overlayStartStop"
                initial="overlayStartStop"
                onClick={toggle()}
                transition={{
                  ...OVERLAY_ANIMATION_CONFIG,
                }}
                variants={animationVariation}
              />
              <div
                ref={refs.setFloating}
                className={styles.floatingContainer}
                {...getFloatingProps({
                  onKeyDown: event => {
                    if (event.key === "Tab") {
                      event.preventDefault();
                    }
                  },
                })}
                {...positionAttributes}
                {...formFieldFocusAttribute}
              >
                {items.length > 0 && (
                  <motion.div
                    animate="done"
                    aria-labelledby={buttonID}
                    className={classnames(styles.menu, UNSAFE_className?.menu)}
                    custom={context?.placement}
                    data-elevation="elevated"
                    exit="startOrStop"
                    id={menuID}
                    initial="startOrStop"
                    onClick={hide}
                    role="menu"
                    style={UNSAFE_style?.menu}
                    transition={{ ...MENU_ANIMATION_CONFIG }}
                    variants={animationVariation}
                  >
                    {renderedSections}
                  </motion.div>
                )}
              </div>
            </>
          )}
        </AnimatePresence>
      </MenuPortal>
    </div>
  );

  function toggle(callbackPassthrough?: (event?: MouseEvent) => void) {
    return (event?: MouseEvent) => {
      setVisible(!visible);
      callbackPassthrough && callbackPassthrough(event);
    };
  }

  function hide() {
    setVisible(false);
    setActiveIndex(null);
  }

  function handleParentClick(event: MouseEvent<HTMLDivElement>) {
    // Since the menu is being rendered within the same parent as the activator,
    // we need to stop the click event from bubbling up. If the Menu component
    // gets added within a parent that has a click handler, any click on the
    // menu will trigger the parent's click handler.
    event.stopPropagation();
  }
}

function SectionHeader({ text, style, className }: SectionHeaderProps) {
  return (
    <div
      aria-hidden={true}
      className={classnames(styles.sectionHeader, className)}
      style={style}
    >
      <DefaultHeaderContent>{text}</DefaultHeaderContent>
    </div>
  );
}

function Action(
  props: ActionProps & {
    readonly tabIndex: number;
    readonly setItemNode: (node: HTMLButtonElement | null) => void;
    readonly getItemProps: (
      userProps?: Record<string, unknown>,
    ) => Record<string, unknown>;
  },
) {
  const {
    label,
    sectionLabel,
    icon,
    iconColor,
    destructive,
    style,
    className,
    onClick,
    tabIndex,
    setItemNode,
    getItemProps,
  } = props;

  const buttonClasses = classnames(styles.action, styles.legacyAction, {
    [styles.destructive]: destructive,
  });

  return (
    <button
      className={classnames(buttonClasses, className)}
      key={label}
      style={style}
      type="button"
      {...getItemProps({
        ref: setItemNode,
        role: "menuitem",
        onClick,
        tabIndex,
      })}
    >
      <DefaultItemContent
        destructive={destructive}
        icon={icon}
        iconColor={iconColor}
        label={label}
        sectionLabel={sectionLabel}
      />
    </button>
  );
}

function DefaultItemContent({
  label,
  icon,
  iconColor,
  destructive,
  sectionLabel,
}: {
  readonly label?: string;
  readonly icon?: React.ComponentProps<typeof Icon>["name"];
  readonly iconColor?: React.ComponentProps<typeof Icon>["color"];
  readonly destructive?: boolean;
  readonly sectionLabel?: string;
}) {
  return (
    <>
      {icon && (
        <div>
          <Icon color={destructive ? "destructive" : iconColor} name={icon} />
        </div>
      )}
      <Typography
        element="span"
        fontWeight="semiBold"
        textColor={destructive ? "destructive" : "text"}
      >
        {sectionLabel && (
          <span className={styles.screenReaderOnly}>{sectionLabel}</span>
        )}
        {label}
      </Typography>
    </>
  );
}

function DefaultHeaderContent({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <Typography
      element="h6"
      fontWeight="regular"
      size="base"
      textCase="none"
      textColor="textSecondary"
    >
      {children}
    </Typography>
  );
}

function MenuPortal({ children }: { readonly children: ReactElement }) {
  const mounted = useIsMounted();

  if (!mounted?.current) {
    return null;
  }

  return <FloatingPortal>{children}</FloatingPortal>;
}
