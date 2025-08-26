import React, { useId, useState } from "react";
import type { CSSProperties, KeyboardEvent, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import type { Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { useFocusTrap } from "@jobber/hooks/useFocusTrap";
import classNames from "classnames";
import { useInView } from "@jobber/hooks/useInView";
import { useIsMounted } from "@jobber/hooks/useIsMounted";
import { tokens } from "@jobber/design";
import { SideDrawerActions } from "./SideDrawerActions";
import type { RegisteredComponents } from "./SideDrawerContext";
import { SideDrawerContext } from "./SideDrawerContext";
import { SideDrawerTitle } from "./SideDrawerTitle";
import { SideDrawerToolbar } from "./SideDrawerToolbar";
import styles from "./SideDrawer.module.css";
import { SideDrawerBackButton } from "./SideDrawerBackButton";
import { SideDrawerFooter } from "./SideDrawerFooter";
import { Button } from "../Button";
import { Flex } from "../Flex";

interface SideDrawerProps extends PropsWithChildren {
  /**
   * Whether or not the drawer is open.
   */
  readonly open: boolean;

  /**
   * Callback function to close the drawer.
   */
  readonly onRequestClose: () => void;

  /**
   * Change the appearance of the drawer.
   */
  readonly variation?: "base" | "subtle";

  /**
   * Change the scrolling direction of the drawer. Useful for chat-like interfaces.
   */
  readonly scrollDirection?: "normal" | "reverse";

  /**
   * Changes whether the SideDrawer is positioned to the side of the viewport or inline with the content.
   * @default false
   */
  readonly inline?: boolean;

  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    container?: string;
  };

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    container?: CSSProperties;
  };
}

const variants: Variants = {
  initial: { x: "100%" },
  visible: { x: 0, transitionEnd: { x: 0 } },
  hidden: { x: "100%" },
};
const inlineVariants: Variants = {
  initial: { x: "25%", opacity: 0 },
  visible: { x: 0, opacity: 1, transitionEnd: { x: 0 } },
  hidden: { x: "25%", opacity: 0 },
};

const useSideDrawerState = (open: boolean) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [components, setComponents] = useState<RegisteredComponents>({
    backButton: false,
  });
  const { toolbar, title, actions, backButton, footer } = useSlotIDs();

  useRefocusOnActivator(open);
  const sideDrawerRef = useFocusTrap<HTMLDivElement>(open);
  const [headerShadowRef, noHeaderShadow] = useInView<HTMLDivElement>();
  const [footerShadowRef, noFooterShadow] = useInView<HTMLDivElement>();

  return {
    ref,
    setRef,
    components,
    setComponents,
    slots: { toolbar, title, actions, backButton, footer },
    sideDrawerRef,
    headerShadowRef,
    noHeaderShadow,
    footerShadowRef,
    noFooterShadow,
  };
};

export function SideDrawer({
  children,
  onRequestClose,
  open,
  variation = "base",
  scrollDirection,
  inline = false,
  UNSAFE_className,
  UNSAFE_style,
}: SideDrawerProps) {
  const {
    ref,
    setRef,
    components,
    setComponents,
    slots,
    sideDrawerRef,
    headerShadowRef,
    noHeaderShadow,
    footerShadowRef,
    noFooterShadow,
  } = useSideDrawerState(open);

  useRefocusOnActivator(open);

  const container = globalThis.document?.body || null;
  const isMounted = useIsMounted();

  if (!isMounted.current && !container) return null;

  const SideDrawerRender = (
    <SideDrawerContext.Provider
      value={{
        actionPortal: ref?.querySelector(slots.actions.selector),
        titlePortal: ref?.querySelector(slots.title.selector),
        toolbarPortal: ref?.querySelector(slots.toolbar.selector),
        backPortal: ref?.querySelector(slots.backButton.selector),
        footerPortal: ref?.querySelector(slots.footer.selector),
        components,
        registerComponent: key =>
          setComponents(prev => ({ ...prev, [key]: true })),
        unRegisterComponent: key =>
          setComponents(prev => ({ ...prev, [key]: false })),
      }}
    >
      {open && !inline && (
        <button
          className={styles.overlay}
          aria-label="Close"
          onClick={onRequestClose}
          type="button"
        />
      )}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className={classNames(
              styles.drawer,
              {
                [styles.reverseScroll]: scrollDirection === "reverse",
                [styles.inline]: inline,
              },
              UNSAFE_className?.container,
            )}
            ref={setRef}
            data-elevation={"elevated"}
            variants={inline ? inlineVariants : variants}
            initial="initial"
            animate="visible"
            exit="hidden"
            transition={{
              duration: tokens["timing-base"] / 1000,
            }}
            style={UNSAFE_style?.container}
          >
            <div
              ref={sideDrawerRef}
              role="dialog"
              className={classNames(styles.container, styles.hasShadow, {
                [styles.subtle]: variation === "subtle",
              })}
              tabIndex={0}
              onKeyUp={handleKeyUp}
            >
              <div
                className={classNames(styles.header, {
                  [styles.hasShadow]:
                    headerShadowRef.current && !noHeaderShadow,
                })}
              >
                <Flex template={["grow", "shrink"]} align="start">
                  <Flex template={["shrink", "grow"]} align="start" gap="none">
                    <div
                      className={classNames(styles.backButton, {
                        [styles.backButtonVisible]: components.backButton,
                      })}
                      {...slots.backButton.attr}
                    />
                    <div
                      className={classNames(styles.heading)}
                      {...slots.title.attr}
                    />
                  </Flex>

                  <div className={styles.headerActions}>
                    <div
                      className={styles.hideWhenEmpty}
                      {...slots.actions.attr}
                    />
                    <Button
                      ariaLabel="Close"
                      icon="cross"
                      onClick={onRequestClose}
                      type={"tertiary"}
                      variation="subtle"
                    />
                  </div>
                </Flex>

                <div className={styles.hideWhenEmpty} {...slots.toolbar.attr} />
              </div>

              <div className={styles.content}>
                <div
                  className={styles.headerShadowListener}
                  ref={headerShadowRef}
                />

                {children}

                <div
                  className={styles.footerShadowListener}
                  ref={footerShadowRef}
                />
              </div>

              <div
                className={classNames(styles.footer, styles.hideWhenEmpty, {
                  [styles.hasShadow]:
                    footerShadowRef.current && !noFooterShadow,
                })}
                {...slots.footer.attr}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SideDrawerContext.Provider>
  );

  if (inline) {
    return SideDrawerRender;
  }

  return createPortal(SideDrawerRender, container);

  function handleKeyUp(event: KeyboardEvent<HTMLDivElement>): void {
    if (event.key === "Escape") {
      onRequestClose();
    }
  }
}

function useSlotIDs() {
  const toolbar = useSlotID();
  const title = useSlotID("title");
  const actions = useSlotID();
  const backButton = useSlotID("back");
  const footer = useSlotID();

  return { toolbar, title, actions, backButton, footer };
}

function useSlotID(prefix?: string) {
  const id = useId();
  const prefixedId = prefix ? `${prefix}-${id}` : id;
  const attrKey = "data-side-drawer-slot";
  const selector = `[${attrKey}="${prefixedId}"]`;
  const attr = { [attrKey]: prefixedId };

  return { id: prefixedId, selector, attr };
}

SideDrawer.Title = SideDrawerTitle;
SideDrawer.Toolbar = SideDrawerToolbar;
SideDrawer.Actions = SideDrawerActions;
SideDrawer.BackButton = SideDrawerBackButton;
SideDrawer.Footer = SideDrawerFooter;
