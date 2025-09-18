import type {
  CSSProperties,
  MouseEvent,
  ReactElement,
  ReactNode,
  RefObject,
} from "react";
import React, { useId, useRef, useState } from "react";
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
const REACT_ARIA_MOBILE_BREAKPOINT = 700;
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

// Note: For composable path we animate only the inner content and use RAC's isExiting to keep it mounted.

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

  // Unfortunately there's no way to tell RAC to use a different breakpoint
  // so we're using the same one as the one they use
  // To properly reference their value we need to also pull in react-spectrum
  return window.screen.width <= REACT_ARIA_MOBILE_BREAKPOINT;
}

// eslint-disable-next-line max-statements
export function Menu({
  activator,
  items,
  children,
  UNSAFE_className,
  UNSAFE_style,
}: MenuProps) {
  // React Aria-only path for composable API
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

const MotionPopover = motion.create(AriaPopover);

function MenuComposable({ children }: MenuComposableProps) {
  // Use positional arguments to determine the trigger and content
  // Avoids parsing/iterating over the children
  const [trigger, menu] = React.Children.toArray(children);

  type AnimationState = "unmounted" | "hidden" | "visible";
  const [animation, setAnimation] = useState<AnimationState>("unmounted");
  const [overlayAnimation, setOverlayAnimation] =
    useState<AnimationState>("unmounted");

  return (
    <div className={styles.wrapper}>
      <AriaMenuTrigger
        onOpenChange={isOpen => {
          setAnimation(isOpen ? "visible" : "hidden");
          setOverlayAnimation(isOpen ? "visible" : "hidden");
        }}
      >
        {trigger}
        {/* placement comes from the renderProp, but it needs to get used on the element itself */}
        {/* somewhat of an impossible problem */}
        {/* the only solution is to have the animation NOT be on this element */}
        {/* furthermore, we must ignore the "null" placement case that happens on first render */}
        {/* or we accept that the Menu animation is in reverse when Menu is above */}
        {/* minor, but annoying we can't build the experience we want */}
        <MotionPopover
          isExiting={animation === "hidden"}
          key="menu-content"
          variants={{
            hidden: { opacity: 0, y: -10 },
            visible: { y: 0, opacity: 1 },
          }}
          initial="hidden"
          animate={animation}
          transition={{
            ease: "easeOut",
            duration: MENU_ANIMATION_DURATION,
          }}
          onAnimationComplete={animationState => {
            setAnimation(a =>
              animationState === "hidden" && a === "hidden" ? "unmounted" : a,
            );
          }}
        >
          {menu}
        </MotionPopover>
        <MenuMobileUnderlay
          animation={animation}
          onAnimationComplete={() => {}}
        />
      </AriaMenuTrigger>
    </div>
  );
}

interface MenuMobileUnderlayProps {
  readonly animation: "unmounted" | "hidden" | "visible";
  readonly onAnimationComplete: (
    state: "unmounted" | "hidden" | "visible",
  ) => void;
}

function MenuMobileUnderlay({
  animation,
  onAnimationComplete,
}: MenuMobileUnderlayProps) {
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
        ease: "easeOut",
        // weird behavior around the Tray. if its animation finished first, this one will
        // get frozen at whatever state it was in when the Tray animation finished
        // the Menu animation is broken on mobile anyway so maybe not a big deal
        duration: MENU_ANIMATION_DURATION,
      }}
      className={styles.overlay}
      animate={animation}
      onAnimationComplete={onAnimationComplete}
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
  readonly onClick?: () => void;
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
}

function MenuContentComposable({ children }: MenuContentComposableProps) {
  return <AriaMenu className={styles.menu}>{children}</AriaMenu>;
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
