import type {
  CSSProperties,
  MouseEvent,
  ReactElement,
  ReactNode,
  RefObject,
} from "react";
import React, {
  createContext,
  useContext,
  useId,
  useRef,
  useState,
} from "react";
import classnames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { useWindowDimensions } from "@jobber/hooks/useWindowDimensions";
import type { IconColorNames, IconNames } from "@jobber/design";
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
import { useFocusTrap } from "@jobber/hooks/useFocusTrap";
import { useIsMounted } from "@jobber/hooks/useIsMounted";
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

export interface MenuProps {
  /**
   * Custom menu activator. If this is not provided a default [… More] will be used.
   */
  readonly activator?: ReactElement;
  /**
   * Collection of action items.
   */
  readonly items?: SectionProps[];

  /**
   * Composable children-based API. When provided, this takes precedence over `items`.
   */
  readonly children?: ReactNode;

  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    menu?: string;
    header?: string;
    action?: string;
  };

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    menu?: CSSProperties;
    header?: CSSProperties;
    action?: CSSProperties;
  };
}

export interface SectionProps {
  /**
   * Defines the section header to further explain the group of actions.
   */
  header?: string;

  /**
   * List of actions.
   */
  actions: ActionProps[];
}

export function useIsMobileDevice(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.screen.width <= SMALL_SCREEN_BREAKPOINT;
}

// eslint-disable-next-line max-statements
export function Menu({
  activator,
  items,
  children,
  UNSAFE_className,
  UNSAFE_style,
}: MenuProps) {
  // Separate React Aria-only path for composable API
  if (children) {
    return <MenuComposable>{children}</MenuComposable>;
  }

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
  const menuRef = children ? undefined : useFocusTrap<HTMLDivElement>(visible);

  const { refs, floatingStyles, context } = useFloating({
    open: visible,
    onOpenChange: setVisible,
    placement: "bottom-start",
    strategy: "fixed",
    middleware: [
      offset(MENU_OFFSET),
      flip({ fallbackPlacements: ["bottom-end", "top-start", "top-end"] }),
      size({
        apply({
          availableHeight,
          elements,
        }: {
          availableHeight: number;
          elements: { floating: HTMLElement };
        }) {
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
              />
              <div
                ref={refs.setFloating}
                className={styles.floatingContainer}
                {...getFloatingProps()}
                {...positionAttributes}
                {...formFieldFocusAttribute}
              >
                {items && items.length > 0 && (
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

interface MenuComposableProps {
  readonly children: ReactNode;
  readonly UNSAFE_className?: {
    menu?: string;
  };
  readonly UNSAFE_style?: {
    menu?: CSSProperties;
  };
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

function MenuComposable({ children }: MenuComposableProps) {
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

interface MenuMobileUnderlayProps {
  readonly animation: "unmounted" | "hidden" | "visible";
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

interface SectionHeaderProps {
  readonly text: string;
  readonly UNSAFE_style?: CSSProperties;
  readonly UNSAFE_className?: string;
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

export interface ActionProps {
  /**
   * Action label
   */
  readonly label: string;

  /**
   * Parent Section Label
   */
  readonly sectionLabel?: string;

  /**
   * Visual cue for the action label
   */
  readonly icon?: IconNames;

  /**
   * Color for the icon. Defaults to "icon".
   */
  readonly iconColor?: IconColorNames;

  /**
   * Visual style for the action button
   */
  readonly destructive?: boolean;

  /**
   * Inline style overrides for the action button
   */
  readonly UNSAFE_style?: CSSProperties;

  /**
   * Style class overrides for the action button
   */
  readonly UNSAFE_className?: string;

  /**
   * Callback when an action gets clicked
   */
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
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

interface MenuSectionComposableProps {
  readonly children: ReactNode;
}

function MenuSectionComposable({ children }: MenuSectionComposableProps) {
  return (
    <AriaMenuSection className={styles.section}>{children}</AriaMenuSection>
  );
}

interface MenuHeaderComposableProps {
  readonly children: ReactNode;
}

function MenuHeaderComposable({ children }: MenuHeaderComposableProps) {
  return (
    <>
      <AriaHeader className={styles.sectionHeader}>{children}</AriaHeader>
      {/* <AriaSeparator /> */}
    </>
  );
}

interface MenuItemComposableProps {
  /*
   * Callback when an item gets clicked, or activated with Space or Enter
   */
  readonly onClick?: () => void;

  /**
   * Menu item content
   */
  readonly children: ReactNode;
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

interface MenuContentComposableProps {
  readonly children: ReactNode;
  readonly placement?: string | null;
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

interface MenuTriggerComposableProps extends React.PropsWithChildren {
  /**
   * Accessible name for the trigger. If trigger content is not plain text, this must be provided.
   */
  readonly ariaLabel?: string;
}

function MenuTriggerComposable({
  ariaLabel,
  children,
}: MenuTriggerComposableProps) {
  return (
    <AriaPressable aria-label={ariaLabel}>
      <div role="button" style={{ display: "inline-flex" }}>
        {children}
      </div>
    </AriaPressable>
  );
}
