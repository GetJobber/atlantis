import type { MouseEvent, ReactElement } from "react";
import React, {
  createContext,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
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
  MenuItemIconComposableProps,
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
    <MenuComposable
      onOpenChange={props.onOpenChange}
      open={props.open}
      defaultOpen={props.defaultOpen}
    >
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
          text={item.header}
          UNSAFE_style={UNSAFE_style?.header}
          UNSAFE_className={UNSAFE_className?.header}
        />
      )}
      {item.actions.map(action => {
        const currentIndex = itemIndexCounter++;

        return (
          <Action
            UNSAFE_style={UNSAFE_style?.action}
            UNSAFE_className={UNSAFE_className?.action}
            sectionLabel={item.header}
            key={action.label}
            tabIndex={activeIndex === currentIndex ? 0 : -1}
            setItemNode={node => {
              listRef.current[currentIndex] = node;
            }}
            getItemProps={getItemProps}
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
                    transition={{ ...MENU_ANIMATION_CONFIG }}
                    style={UNSAFE_style?.menu}
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
    return (event: MouseEvent) => {
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
    UNSAFE_style,
    UNSAFE_className,
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
      className={classnames(buttonClasses, UNSAFE_className)}
      style={UNSAFE_style}
      key={label}
      type="button"
      {...getItemProps({
        ref: setItemNode,
        role: "menuitem",
        onClick,
        tabIndex,
      })}
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

function DefaultHeaderContent({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <Typography
      element="h6"
      size="base"
      textColor="textSecondary"
      fontWeight="regular"
      textCase="none"
    >
      {children}
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

function MenuComposable({
  children,
  onOpenChange,
  open,
  defaultOpen,
}: MenuComposableProps) {
  const isInitiallyOpen = Boolean(open ?? defaultOpen);
  const [animation, setAnimation] = useState<AnimationState>(
    isInitiallyOpen ? "visible" : "unmounted",
  );
  const derivedAnimation = getDerivedAnimation(open, animation);

  return (
    <MenuAnimationContext.Provider
      value={{ state: derivedAnimation, setState: setAnimation }}
    >
      <AriaMenuTrigger
        isOpen={open}
        defaultOpen={defaultOpen}
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

function getDerivedAnimation(
  open: boolean | undefined,
  animation: AnimationState,
): AnimationState {
  const isControlled = open !== undefined;

  if (!isControlled) return animation;
  if (open) return "visible";

  // When controlled and closing, allow local state to progress to "unmounted"
  // so the Popover can be removed from the DOM once exit completes.
  return animation === "unmounted" ? "unmounted" : "hidden";
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
              // However, during exit animation, we should always animate to prevent race conditions in certain environments
              animate={
                placement
                  ? animation
                  : animation === "hidden"
                  ? "hidden"
                  : false
              }
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

function MenuItemIconComposable(props: MenuItemIconComposableProps) {
  const { destructive } = useMenuItemContext();

  return (
    <div data-menu-slot="icon">
      <Icon {...props} color={destructive ? "destructive" : props.color} />
    </div>
  );
}

function MenuItemLabelComposable(props: { readonly children: string }) {
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

function MenuHeaderLabel(props: { readonly children: React.ReactNode }) {
  return <DefaultHeaderContent>{props.children}</DefaultHeaderContent>;
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
