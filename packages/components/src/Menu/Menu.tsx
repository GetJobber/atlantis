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
  Separator as AriaSeparator,
} from "react-aria-components";
import styles from "./Menu.module.css";
import type {
  ActionProps,
  AnimationState,
  MenuComposableProps,
  MenuContentComposableProps,
  MenuHeaderComposableProps,
  MenuItemComposableProps,
  MenuLegacyProps,
  MenuMobileUnderlayProps,
  MenuSectionComposableProps,
  MenuSeparatorComposableProps,
  MenuTriggerComposableProps,
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
import type { IconProps } from "../Icon";
import { Icon } from "../Icon";
import { formFieldFocusAttribute } from "../FormField/hooks/useFormFieldFocus";
import { calculateMaxHeight } from "../utils/maxHeight";

const composeOverlayVariation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const variation = {
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

function isLegacy(
  props: MenuLegacyProps | MenuComposableProps,
): props is MenuLegacyProps {
  return "items" in props;
}

const MotionMenu = motion.create(AriaMenu);

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
                  ...OVERLAY_ANIMATION_CONFIG,
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
                      ...MENU_ANIMATION_CONFIG,
                    }}
                    style={UNSAFE_style?.menu}
                  >
                    {items?.map((item, key: number) => (
                      <div
                        key={key}
                        className={classnames(styles.legacySection)}
                      >
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
  const buttonClasses = classnames(styles.action, styles.legacyAction, {
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
      <DefaultItemContent
        label={label}
        icon={icon}
        iconColor={iconColor}
        destructive={destructive}
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

function DefaultHeaderContent({ label }: { readonly label?: string }) {
  return (
    <Typography
      element="h6"
      size="base"
      textColor="textSecondary"
      fontWeight="regular"
      textCase="none"
    >
      {label}
    </Typography>
  );
}

function MenuPortal({ children }: { readonly children: React.ReactElement }) {
  const mounted = useIsMounted();

  if (!mounted?.current) {
    return null;
  }

  return <FloatingPortal>{children}</FloatingPortal>;
}

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
  const [animation, setAnimation] = useState<AnimationState>("unmounted");

  return (
    <MenuAnimationContext.Provider
      value={{ state: animation, setState: setAnimation }}
    >
      <AriaMenuTrigger
        onOpenChange={isOpen => {
          setAnimation(isOpen ? "visible" : "hidden");
          onOpenChange?.(isOpen);
        }}
      >
        {children}
      </AriaMenuTrigger>
    </MenuAnimationContext.Provider>
  );
}

const MenuTriggerComposable = React.forwardRef<
  HTMLDivElement,
  MenuTriggerComposableProps
>(function MenuTriggerComposable({ ariaLabel, children }, ref) {
  return (
    <AriaPressable aria-label={ariaLabel}>
      <div role="button" className={styles.triggerWrapper} ref={ref}>
        {children}
      </div>
    </AriaPressable>
  );
});

function MenuContentComposable({
  children,
  UNSAFE_style,
  UNSAFE_className,
}: MenuContentComposableProps) {
  const { state: animation, setState } = useMenuAnimation();
  const isMobile = isMobileDevice();

  return (
    <>
      {/* Keep Popover mounted while exiting, but do not animate it. */}
      <AriaPopover
        isExiting={animation === "hidden"}
        placement="bottom start"
        offset={MENU_OFFSET}
      >
        {({ placement }) => {
          const directionModifier = placement?.includes("bottom") ? -1 : 1;
          const variants = isMobile
            ? {
                hidden: { opacity: 0, y: Y_TRANSLATION_MOBILE },
                visible: { opacity: 1, y: 0 },
              }
            : {
                hidden: {
                  opacity: 0,
                  y: Y_TRANSLATION_DESKTOP * directionModifier,
                },
                visible: { opacity: 1, y: 0 },
              };

          return (
            <MotionMenu
              key={`menu-content-${placement ?? "pending"}`}
              className={classnames(
                styles.menu,
                styles.ariaMenu,
                UNSAFE_className,
              )}
              style={UNSAFE_style}
              variants={variants}
              initial="hidden"
              // placement is null on first render cycle, so we need to wait for it to be defined
              animate={placement ? animation : false}
              transition={{ ...MENU_ANIMATION_CONFIG }}
              onAnimationComplete={animationState => {
                setState(prev =>
                  animationState === "hidden" && prev === "hidden"
                    ? "unmounted"
                    : prev,
                );
              }}
            >
              {children}
            </MotionMenu>
          );
        }}
      </AriaPopover>
      {isMobile && <MenuMobileUnderlay animation={animation} />}
    </>
  );
}

function MenuMobileUnderlay({ animation }: MenuMobileUnderlayProps) {
  if (animation === "unmounted") return null;

  return (
    <motion.div
      key="menu-mobile-underlay"
      variants={composeOverlayVariation}
      initial="hidden"
      transition={{
        ...OVERLAY_ANIMATION_CONFIG,
      }}
      className={styles.overlay}
      animate={animation}
    />
  );
}

function MenuSeparatorComposable({
  UNSAFE_style,
  UNSAFE_className,
}: MenuSeparatorComposableProps) {
  return (
    <AriaSeparator
      className={classnames(styles.separator, UNSAFE_className)}
      style={UNSAFE_style}
      data-testid="ATL-Menu-Separator"
    />
  );
}

function MenuSectionComposable({
  children,
  UNSAFE_style,
  UNSAFE_className,
  ariaLabel,
}: MenuSectionComposableProps) {
  return (
    <AriaMenuSection
      aria-label={ariaLabel}
      className={classnames(styles.ariaSection, UNSAFE_className)}
      style={UNSAFE_style}
    >
      {children}
    </AriaMenuSection>
  );
}

function MenuHeaderComposable(props: MenuHeaderComposableProps) {
  const { UNSAFE_style, UNSAFE_className } = props;

  return (
    <AriaHeader
      className={classnames(
        styles.sectionHeader,
        styles.ariaSectionHeader,
        UNSAFE_className,
      )}
      style={UNSAFE_style}
    >
      {props.children}
    </AriaHeader>
  );
}

const MenuItemComposable = React.forwardRef<
  React.ElementRef<typeof AriaMenuItem>,
  MenuItemComposableProps
>(function MenuItemComposable(props: MenuItemComposableProps, ref) {
  const { UNSAFE_style, UNSAFE_className } = props;

  const className = classnames(
    styles.action,
    styles.ariaItem,
    UNSAFE_className,
  );

  if (props.href) {
    const { href, target, rel, onClick } = props;

    return (
      <AriaMenuItem
        ref={ref}
        className={className}
        style={UNSAFE_style}
        textValue={props.textValue}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick as ((e: React.MouseEvent) => void) | undefined}
      >
        <MenuItemContext.Provider value={{ destructive: props.destructive }}>
          {props.children}
        </MenuItemContext.Provider>
      </AriaMenuItem>
    );
  }

  return (
    <AriaMenuItem
      ref={ref}
      className={className}
      style={UNSAFE_style}
      textValue={props.textValue}
      onAction={() => {
        // Zero-arg activation for non-link items
        props.onClick?.();
      }}
    >
      <MenuItemContext.Provider value={{ destructive: props.destructive }}>
        {props.children}
      </MenuItemContext.Provider>
    </AriaMenuItem>
  );
});

const MenuItemContext = createContext<{ destructive?: boolean } | null>(null);

function useMenuItemContext(): { destructive?: boolean } {
  const ctx = useContext(MenuItemContext);

  return ctx ?? {};
}

interface MenuItemIconComposableProps extends IconProps {}

function MenuItemIconComposable(props: MenuItemIconComposableProps) {
  const { destructive } = useMenuItemContext();

  return (
    <div data-menu-slot="icon">
      <Icon {...props} color={destructive ? "destructive" : props.color} />
    </div>
  );
}

interface MenuItemLabelComposableProps {
  readonly children: string;
}

function MenuItemLabelComposable(props: MenuItemLabelComposableProps) {
  const { destructive } = useMenuItemContext();

  return (
    <div data-menu-slot="label">
      <Typography
        element="span"
        fontWeight="semiBold"
        textColor={destructive ? "destructive" : "text"}
      >
        {props.children}
      </Typography>
    </div>
  );
}

function MenuHeaderLabel(props: { readonly children: string }) {
  return <DefaultHeaderContent label={props.children} />;
}

Menu.Section = MenuSectionComposable;
Menu.Header = MenuHeaderComposable;
Menu.Item = MenuItemComposable;
Menu.Trigger = MenuTriggerComposable;
Menu.Content = MenuContentComposable;
Menu.Separator = MenuSeparatorComposable;
Menu.ItemIcon = MenuItemIconComposable;
Menu.ItemLabel = MenuItemLabelComposable;
Menu.HeaderLabel = MenuHeaderLabel;
