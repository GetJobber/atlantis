import type { MouseEvent, ReactElement, RefObject } from "react";
import React, {
  createContext,
  useContext,
  useId,
  useRef,
  useState,
} from "react";
import classnames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import {
  useFocusTrap,
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
} from "@floating-ui/react";
import {
  Header as AriaHeader,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuSection as AriaMenuSection,
  MenuTrigger as AriaMenuTrigger,
  Popover as AriaPopover,
  Pressable as AriaPressable,
} from "react-aria-components";
import styles from "./Menu.module.css";
import type {
  ActionProps,
  MenuComposableProps,
  MenuContentComposableProps,
  MenuHeaderComposableProps,
  MenuItemComposableProps,
  MenuLegacyProps,
  MenuMobileUnderlayProps,
  MenuSectionComposableProps,
  MenuTriggerComposableProps,
  SectionHeaderProps,
} from "./Menu.types";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { Icon } from "../Icon";
import { formFieldFocusAttribute } from "../FormField/hooks/useFormFieldFocus";
import { calculateMaxHeight } from "../utils/maxHeight";

const SMALL_SCREEN_BREAKPOINT = 490;
const MENU_OFFSET = 6;
const MENU_MAX_HEIGHT_PERCENTAGE = 72;
const MENU_ANIMATION_DURATION = 0.3;

const variation = {
  overlayStartStop: { opacity: 0 },
  startOrStop: (placement: string | undefined) => {
    let y = 10;

    if (placement?.includes("bottom")) y *= -1;
    if (window.innerWidth < SMALL_SCREEN_BREAKPOINT) y = 150;

    return { opacity: 0, y };
  },
  done: { opacity: 1, y: 0 },
};

export function useIsMobileDevice(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.screen.width <= SMALL_SCREEN_BREAKPOINT;
}

function isLegacy(
  props: MenuLegacyProps | MenuComposableProps,
): props is MenuLegacyProps {
  return "items" in props;
}

// Overload declarations (no bodies)
export function Menu(props: MenuLegacyProps): ReactElement;
export function Menu(props: MenuComposableProps): ReactElement;

// Single implementation
export function Menu(
  props: MenuLegacyProps | MenuComposableProps,
): ReactElement {
  if (isLegacy(props)) {
    return <MenuLegacy {...props} />;
  }

  return (
    <MenuComposable onOpenChange={props.onOpenChange}>
      {props.children}
    </MenuComposable>
  );
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

  const { width } = useWindowDimensions();

  const buttonID = useId();
  const menuID = useId();

  const fullWidth = activator?.props?.fullWidth || false;

  const wrapperClasses = classnames(styles.wrapper, {
    [styles.fullWidth]: fullWidth,
  });

  // useRefocusOnActivator must come before useFocusTrap for them both to work
  useRefocusOnActivator(visible);
  const menuRef = useFocusTrap<HTMLDivElement>(visible);

  const { refs, floatingStyles, context } = useFloating({
    open: visible,
    onOpenChange: (isOpen: boolean) => {
      setVisible(isOpen);
    },
    placement: "bottom-start",
    strategy: "fixed",
    middleware: [
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
    ],
    elements: {
      reference: referenceElement,
    },
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);
  const { getFloatingProps } = useInteractions([dismiss]);

  const positionAttributes =
    width >= SMALL_SCREEN_BREAKPOINT
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

  return (
    <div className={wrapperClasses} onClick={handleParentClick}>
      <div ref={setReferenceElement}>
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
                className={styles.overlay}
                onClick={toggle()}
                variants={variation}
                initial="overlayStartStop"
                animate="done"
                exit="overlayStartStop"
                transition={{
                  type: "tween",
                  duration: 0.15,
                }}
              />
              <div
                ref={refs.setFloating}
                className={styles.floatingContainer}
                {...getFloatingProps()}
                {...positionAttributes}
                {...formFieldFocusAttribute}
              >
                {items.length > 0 && (
                  <motion.div
                    className={classnames(styles.menu, UNSAFE_className?.menu)}
                    role="menu"
                    data-elevation={"elevated"}
                    aria-labelledby={buttonID}
                    id={menuID}
                    onClick={hide}
                    variants={variation}
                    initial="startOrStop"
                    animate="done"
                    exit="startOrStop"
                    custom={context?.placement}
                    ref={menuRef}
                    transition={{
                      type: "tween",
                      duration: 0.25,
                    }}
                    style={UNSAFE_style?.menu}
                  >
                    {items?.map((item, key: number) => (
                      <div key={key} className={styles.section}>
                        {item.header && (
                          <SectionHeader
                            text={item.header}
                            UNSAFE_style={UNSAFE_style?.header}
                            UNSAFE_className={UNSAFE_className?.header}
                          />
                        )}

                        {item.actions.map(action => (
                          <Action
                            UNSAFE_style={UNSAFE_style?.action}
                            UNSAFE_className={UNSAFE_className?.action}
                            sectionLabel={item.header}
                            key={action.label}
                            {...action}
                          />
                        ))}
                      </div>
                    ))}
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
}

type AnimationState = "unmounted" | "hidden" | "visible";
interface MenuAnimationContextValue {
  state: AnimationState;
  setState: React.Dispatch<React.SetStateAction<AnimationState>>;
}
const MenuAnimationContext = createContext<MenuAnimationContextValue | null>(
  null,
);

function useMenuAnimation(): MenuAnimationContextValue {
  const ctx = useContext(MenuAnimationContext);

  if (!ctx) {
    throw new Error("MenuAnimationContext used outside provider");
  }

  return ctx;
}

function MenuComposable({ children, onOpenChange }: MenuComposableProps) {
  // Use positional arguments to determine the trigger and content
  // Avoids parsing/iterating over the children
  const [trigger, menu] = React.Children.toArray(children);

  const [animation, setAnimation] = useState<AnimationState>("unmounted");

  return (
    <div className={styles.wrapper}>
      <MenuAnimationContext.Provider
        value={{ state: animation, setState: setAnimation }}
      >
        <AriaMenuTrigger
          onOpenChange={isOpen => {
            setAnimation(isOpen ? "visible" : "hidden");
            onOpenChange?.(isOpen);
          }}
        >
          {trigger}
          {/* Keep Popover mounted while exiting, but do not animate it. */}
          <AriaPopover isExiting={animation === "hidden"}>
            {({ placement }) => {
              if (React.isValidElement(menu)) {
                return React.cloneElement(
                  menu as ReactElement<MenuContentComposableProps>,
                  {
                    placement,
                  },
                );
              }

              return menu;
            }}
          </AriaPopover>
          <MenuMobileUnderlay animation={animation} />
        </AriaMenuTrigger>
      </MenuAnimationContext.Provider>
    </div>
  );
}

function MenuMobileUnderlay({ animation }: MenuMobileUnderlayProps) {
  const isMobile = useIsMobileDevice();

  if (!isMobile || animation === "unmounted") return null;

  return (
    <motion.div
      key="menu-mobile-underlay"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      initial="hidden"
      transition={{
        type: "tween",
        duration: MENU_ANIMATION_DURATION,
      }}
      className={styles.overlay}
      animate={animation}
    />
  );
}

function SectionHeader({
  text,
  UNSAFE_style,
  UNSAFE_className,
}: SectionHeaderProps) {
  return (
    <div
      className={classnames(styles.sectionHeader, UNSAFE_className)}
      aria-hidden={true}
      style={UNSAFE_style}
    >
      <Typography
        element="h6"
        size="base"
        textColor="textSecondary"
        fontWeight="regular"
        textCase="none"
      >
        {text}
      </Typography>
    </div>
  );
}

function Action({
  label,
  sectionLabel,
  icon,
  iconColor,
  destructive,
  UNSAFE_style,
  UNSAFE_className,
  onClick,
}: ActionProps) {
  const actionButtonRef = useRef() as RefObject<HTMLButtonElement>;
  const buttonClasses = classnames(styles.action, {
    [styles.destructive]: destructive,
  });

  return (
    <button
      role="menuitem"
      type="button"
      className={classnames(buttonClasses, UNSAFE_className)}
      key={label}
      onClick={onClick}
      ref={actionButtonRef}
      style={UNSAFE_style}
    >
      {icon && (
        <div>
          <Icon color={destructive ? "destructive" : iconColor} name={icon} />
        </div>
      )}
      <Typography element="span" fontWeight="semiBold" textColor="text">
        {sectionLabel && (
          <span className={styles.screenReaderOnly}>{sectionLabel}</span>
        )}
        {label}
      </Typography>
    </button>
  );
}

function MenuPortal({ children }: { readonly children: React.ReactElement }) {
  const mounted = useIsMounted();

  if (!mounted?.current) {
    return null;
  }

  return <FloatingPortal>{children}</FloatingPortal>;
}

function MenuSectionComposable({ children }: MenuSectionComposableProps) {
  return (
    <AriaMenuSection className={styles.section}>{children}</AriaMenuSection>
  );
}

function MenuHeaderComposable({ children }: MenuHeaderComposableProps) {
  return (
    <>
      <AriaHeader className={styles.sectionHeader}>{children}</AriaHeader>
      {/* <AriaSeparator /> */}
    </>
  );
}

function MenuItemComposable({ onClick, children }: MenuItemComposableProps) {
  return (
    <AriaMenuItem
      className={styles.action}
      onAction={() => {
        onClick?.();
      }}
    >
      {children}
    </AriaMenuItem>
  );
}

const MotionMenu = motion.create(AriaMenu);

function MenuContentComposable({
  children,
  placement,
}: MenuContentComposableProps) {
  const { state: animation, setState } = useMenuAnimation();
  const isMobile = useIsMobileDevice();

  const yTranslation = placement?.includes("bottom") ? -10 : 10;
  const variants = isMobile
    ? { hidden: { opacity: 0, y: 150 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: yTranslation },
        visible: { opacity: 1, y: 0 },
      };

  return (
    <MotionMenu
      key={`menu-content-${placement ?? "pending"}`}
      className={styles.menu}
      variants={variants}
      initial="hidden"
      // placement is null on first render cycle, so we need to wait for it to be defined
      animate={placement ? animation : false}
      transition={{ type: "tween", duration: MENU_ANIMATION_DURATION }}
      onAnimationComplete={animationState => {
        setState(prev =>
          animationState === "hidden" && prev === "hidden" ? "unmounted" : prev,
        );
      }}
    >
      {children}
    </MotionMenu>
  );
}

Menu.Section = MenuSectionComposable;
Menu.Header = MenuHeaderComposable;
Menu.Item = MenuItemComposable;
Menu.Trigger = MenuTriggerComposable;
Menu.Content = MenuContentComposable;

function MenuTriggerComposable({
  ariaLabel,
  children,
}: MenuTriggerComposableProps) {
  return (
    <AriaPressable aria-label={ariaLabel}>
      <div role="button" className={styles.triggerWrapper}>
        {children}
      </div>
    </AriaPressable>
  );
}
