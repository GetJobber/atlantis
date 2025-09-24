import type { MouseEvent, ReactElement, RefObject } from "react";
import React, { useId, useRef, useState } from "react";
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
  MenuComposableProps,
  MenuContentComposableProps,
  MenuHeaderComposableProps,
  MenuItemComposableProps,
  MenuLegacyProps,
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
                        className={classnames(
                          styles.section,
                          styles.sectionBorder,
                        )}
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

function MenuComposable({ children, onOpenChange }: MenuComposableProps) {
  return (
    <AriaMenuTrigger
      onOpenChange={isOpen => {
        onOpenChange?.(isOpen);
      }}
    >
      {children}
    </AriaMenuTrigger>
  );
}

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

function MenuContentComposable({
  children,
  UNSAFE_style,
  UNSAFE_className,
}: MenuContentComposableProps) {
  const isMobile = isMobileDevice();

  return (
    <>
      <AriaPopover
        placement="bottom start"
        className={classnames(styles.ariaPopover, styles.menu)}
      >
        <AriaMenu className={UNSAFE_className} style={UNSAFE_style}>
          {children}
        </AriaMenu>
      </AriaPopover>
      {isMobile && <MenuMobileUnderlay />}
    </>
  );
}

function MenuMobileUnderlay() {
  return <div className={styles.overlay} />;
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
      className={classnames(styles.section, UNSAFE_className)}
      style={UNSAFE_style}
    >
      {children}
    </AriaMenuSection>
  );
}

function MenuHeaderComposable({
  children,
  UNSAFE_style,
  UNSAFE_className,
}: MenuHeaderComposableProps) {
  return (
    <AriaHeader
      className={classnames(styles.sectionHeader, UNSAFE_className)}
      style={UNSAFE_style}
    >
      {children}
    </AriaHeader>
  );
}

const MenuItemComposable = React.forwardRef<
  React.ElementRef<typeof AriaMenuItem>,
  MenuItemComposableProps
>(function MenuItemComposable(
  {
    onClick,
    children,
    UNSAFE_style,
    UNSAFE_className,
    textValue,
    href,
    target,
    ...rest
  }: MenuItemComposableProps,
  ref,
) {
  return (
    <AriaMenuItem
      ref={ref}
      className={classnames(styles.action, UNSAFE_className)}
      style={UNSAFE_style}
      textValue={textValue}
      href={href}
      target={target}
      // Forward only the TanStack Router onClick when this item is a link.
      // This allows SPA navigation without exposing arbitrary props.
      onClick={
        href
          ? ((): ((event: unknown) => void) | undefined => {
              const maybeClick = (rest as Record<string, unknown>)?.onClick;

              return typeof maybeClick === "function"
                ? (maybeClick as (event: unknown) => void)
                : undefined;
            })()
          : undefined
      }
      onAction={
        !href
          ? () => {
              // Only call the zero-arg onClick for non-link items.
              onClick?.();
            }
          : undefined
      }
    >
      {children}
    </AriaMenuItem>
  );
});

Menu.Section = MenuSectionComposable;
Menu.Header = MenuHeaderComposable;
Menu.Item = MenuItemComposable;
Menu.Trigger = MenuTriggerComposable;
Menu.Content = MenuContentComposable;
Menu.Separator = MenuSeparatorComposable;
