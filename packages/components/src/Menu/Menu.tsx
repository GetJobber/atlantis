import React, {
  MouseEvent,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useIsMounted } from "@jobber/hooks/useIsMounted";
import ReactDOM from "react-dom";
import { State } from "@popperjs/core";
import { Action } from "./Action";
import { ItemHeaderProps, MenuProps, SectionProps } from "./types";
import { MenuVariation, useMenu } from "./useMenu";
import { useMenuPopper } from "./useMenuPopper";
import { useMenuStyles } from "./useMenuStyles";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { formFieldFocusAttribute } from "../FormField/hooks/useFormFieldFocus";

// eslint-disable-next-line max-statements
export function Menu({
  activator,
  items,
  smallScreenBreakpoint = 490,
}: MenuProps) {
  const {
    shadowRef,
    popperElement,
    width,
    toggle,
    buttonID,
    menuID,
    hide,
    menuRef,
    visible,
    setPopperElement,
  } = useMenu();

  const { positionAttributes, state } = useMenuPopper({
    popperElement,
    shadowRef,
    width,
    smallScreenBreakpoint,
  });

  const {
    wrapperClasses,
    shadowRefStyle,
    overlay,
    popperContainer,
    section,
    sectionHeader,
    menu,
  } = useMenuStyles({ activator });

  // Would prefer this as a default prop, but it breaks two snapshot tests to move it there. Fine for now.
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
    <Menu.Wrapper className={wrapperClasses}>
      <span ref={shadowRef} className={shadowRefStyle} />

      {React.cloneElement(activator as ReactElement, {
        onClick: toggle((activator as ReactElement).props.onClick),
        id: buttonID,
        ariaControls: menuID,
        ariaExpanded: visible,
        ariaHaspopup: true,
      })}

      <MenuPortal>
        <AnimatePresence>
          {visible && (
            <Menu.Popper
              setPopperElement={setPopperElement}
              className={popperContainer}
              positionAttributes={positionAttributes}
            >
              <Menu.Overlay
                className={overlay}
                toggle={toggle}
                smallScreenBreakpoint={smallScreenBreakpoint}
              />
              {items.length > 0 && (
                <Menu.ItemWrapper
                  className={menu}
                  menuID={menuID}
                  buttonID={buttonID}
                  smallScreenBreakpoint={smallScreenBreakpoint}
                  state={state}
                  menuRef={menuRef}
                  hide={hide}
                >
                  {items.map((item, index) => (
                    <Menu.Item
                      key={index}
                      className={section}
                      item={item}
                      headerClassName={sectionHeader}
                    />
                  ))}
                </Menu.ItemWrapper>
              )}
            </Menu.Popper>
          )}
        </AnimatePresence>
      </MenuPortal>
    </Menu.Wrapper>
  );
}

export function handleParentClick(event: MouseEvent<HTMLDivElement>) {
  // Since the menu is being rendered within the same parent as the activator,
  // we need to stop the click event from bubbling up. If the Menu component
  // gets added within a parent that has a click handler, any click on the
  // menu will trigger the parent's click handler.
  event.stopPropagation();
}

Menu.Wrapper = function MenuWrapper({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className: string;
}) {
  return (
    <div className={className} onClick={handleParentClick}>
      {children}
    </div>
  );
};

Menu.Popper = function MenuPopper({
  children,
  setPopperElement,
  className,
  positionAttributes,
}: PropsWithChildren<{
  readonly setPopperElement: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
  readonly className: string;
  readonly positionAttributes: { [key: string]: string };
}>) {
  return (
    <div
      ref={setPopperElement}
      className={className}
      {...positionAttributes}
      {...formFieldFocusAttribute}
    >
      {children}
    </div>
  );
};

Menu.Overlay = function MenuOverlay({
  className,
  toggle,
  smallScreenBreakpoint,
}: {
  readonly className: string;
  readonly toggle: () => (e: React.MouseEvent) => void;
  readonly smallScreenBreakpoint: number;
}) {
  return (
    <motion.div
      className={className}
      onClick={toggle()}
      variants={MenuVariation(smallScreenBreakpoint)}
      initial="overlayStartStop"
      animate="done"
      exit="overlayStartStop"
      transition={{
        type: "tween",
        duration: 0.15,
      }}
    />
  );
};

Menu.ItemWrapper = function ItemWrapper({
  children,
  className,
  buttonID,
  menuID,
  smallScreenBreakpoint,
  state,
  menuRef,
  hide,
}: PropsWithChildren<{
  readonly className: string;
  readonly menuID: string;
  readonly buttonID: string;
  readonly smallScreenBreakpoint: number;
  readonly state: State | null;
  readonly menuRef: React.RefObject<HTMLDivElement>;
  readonly hide: () => void;
}>) {
  return (
    <motion.div
      className={className}
      role="menu"
      data-elevation={"elevated"}
      aria-labelledby={buttonID}
      id={menuID}
      onClick={hide}
      variants={MenuVariation(smallScreenBreakpoint)}
      initial="startOrStop"
      animate="done"
      exit="startOrStop"
      custom={state?.placement}
      ref={menuRef}
      transition={{
        type: "tween",
        duration: 0.25,
      }}
    >
      {children}
    </motion.div>
  );
};

Menu.Item = function MenuItem({
  className,
  headerClassName,
  item,
}: {
  readonly className: string;
  readonly headerClassName: string;
  readonly item: SectionProps;
}) {
  return (
    <div className={className}>
      {item.header && (
        <Menu.ItemHeader className={headerClassName} text={item.header} />
      )}

      {item.actions.map(action => (
        <Action sectionLabel={item.header} key={action.label} {...action} />
      ))}
    </div>
  );
};

Menu.ItemHeader = function ItemHeader({ text, className }: ItemHeaderProps) {
  return (
    <div className={className} aria-hidden={true}>
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
};

function MenuPortal({ children }: { readonly children: React.ReactElement }) {
  const mounted = useIsMounted();

  if (!mounted?.current) {
    return null;
  }

  return ReactDOM.createPortal(children, document.body);
}
