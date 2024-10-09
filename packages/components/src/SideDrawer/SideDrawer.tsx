import React, { useId, useState } from "react";
import type { KeyboardEvent, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { tokens } from "@jobber/design";
import {
  useFocusTrap,
  useInView,
  useIsMounted,
  useRefocusOnActivator,
} from "@jobber/hooks";
import classNames from "classnames";
import { SideDrawerActions } from "./SideDrawerActions";
import { RegisteredComponents, SideDrawerContext } from "./SideDrawerContext";
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
}

const variants: Variants = {
  hidden: { x: "100%" },
  visible: { x: 0, transitionEnd: { x: 0 } },
};

export function SideDrawer({
  children,
  onRequestClose,
  open,
  variation = "base",
  scrollDirection,
}: SideDrawerProps) {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [components, setComponents] = useState<RegisteredComponents>({
    backButton: false,
  });
  const { toolbar, title, actions, backButton, footer } = useSlotIDs();

  useRefocusOnActivator(open);
  const sideDrawerRef = useFocusTrap<HTMLDivElement>(open);
  const [headerShadowRef, noHeaderShadow] = useInView<HTMLDivElement>();
  const [footerShadowRef, noFooterShadow] = useInView<HTMLDivElement>();

  const container = globalThis.document?.body || null;
  const isMounted = useIsMounted();

  if (!isMounted.current && !container) return null;

  return createPortal(
    <SideDrawerContext.Provider
      value={{
        actionPortal: ref?.querySelector(actions.selector),
        titlePortal: ref?.querySelector(title.selector),
        toolbarPortal: ref?.querySelector(toolbar.selector),
        backPortal: ref?.querySelector(backButton.selector),
        footerPortal: ref?.querySelector(footer.selector),
        components,
        registerComponent: key =>
          setComponents(prev => ({ ...prev, [key]: true })),
        unRegisterComponent: key =>
          setComponents(prev => ({ ...prev, [key]: false })),
      }}
    >
      {open && (
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
            className={classNames(styles.drawer, {
              [styles.reverseScroll]: scrollDirection === "reverse",
            })}
            ref={setRef}
            data-elevation={"elevated"}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              duration: tokens["timing-base"] / 1000,
            }}
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
                      {...backButton.attr}
                    />
                    <div
                      className={classNames(styles.heading)}
                      {...title.attr}
                    />
                  </Flex>

                  <div className={styles.headerActions}>
                    <div className={styles.hideWhenEmpty} {...actions.attr} />
                    <Button
                      ariaLabel="Close"
                      icon="cross"
                      onClick={onRequestClose}
                      type={"tertiary"}
                      variation="subtle"
                    />
                  </div>
                </Flex>

                <div className={styles.hideWhenEmpty} {...toolbar.attr} />
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
                {...footer.attr}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SideDrawerContext.Provider>,
    container,
  );

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
