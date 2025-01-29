import React, {
  MouseEvent,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  createContext,
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
  return (
    <Menu.Wrapper
      activator={activator}
      smallScreenBreakpoint={smallScreenBreakpoint}
    >
      <Menu.Shadow />

      <Menu.Activator />

      <MenuPortal>
        <AnimatePresence>
          <Menu.Popper>
            <Menu.Overlay />
            {items.length > 0 && (
              <Menu.ItemWrapper>
                {items.map((item, index) => (
                  <Menu.Item key={index} item={item} />
                ))}
              </Menu.ItemWrapper>
            )}
          </Menu.Popper>
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

export const MenuContext = createContext<{
  shadowRef: React.RefObject<HTMLSpanElement>;
  shadowRefStyle: string;
  toggle: (
    callbackPassthrough?: (event?: MouseEvent) => void,
  ) => (event: MouseEvent) => void;
  hide: () => void;
  visible: boolean;
  buttonID: string;
  menuID: string;
  menuRef: React.RefObject<HTMLDivElement>;
  setPopperElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  state: State | null;
  overlay: string;
  popperContainer: string;
  section: string;
  sectionHeader: string;
  positionAttributes: {
    [key: string]:
      | {
          [key: string]: string;
        }
      | undefined;
  };
  menu: string;
  activator?: ReactElement;
  smallScreenBreakpoint: number;
}>({
  shadowRef: { current: null },
  shadowRefStyle: "",
  toggle: () => () => ({ props: { onClick: () => ({}) } }),
  hide: () => ({}),
  visible: false,
  buttonID: "",
  menuID: "",
  menuRef: { current: null },
  setPopperElement: () => ({}),
  state: null,
  overlay: "",
  popperContainer: "",
  section: "",
  sectionHeader: "",
  positionAttributes: {},
  smallScreenBreakpoint: 490,
  menu: "",
});

export const useMenuContext = () => {
  return React.useContext(MenuContext);
};

Menu.Activator = function MenuActivator() {
  const { toggle, buttonID, menuID, visible, activator } = useMenuContext();

  return React.cloneElement(activator as ReactElement, {
    onClick: toggle((activator as ReactElement)?.props?.onClick),
    id: buttonID,
    ariaControls: menuID,
    ariaExpanded: visible,
    ariaHaspopup: true,
  });
};

Menu.Shadow = function MenuShadow() {
  const { shadowRef, shadowRefStyle } = useMenuContext();

  return <span ref={shadowRef} className={shadowRefStyle} />;
};

Menu.Wrapper = function MenuWrapper({
  children,
  smallScreenBreakpoint,
  activator,
}: {
  readonly children: ReactNode;
  readonly smallScreenBreakpoint: number;
  readonly activator?: ReactElement;
}) {
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
    <MenuContext.Provider
      value={{
        toggle,
        hide,
        visible,
        buttonID,
        menuID,
        menuRef,
        setPopperElement,
        state,
        shadowRefStyle,
        overlay,
        popperContainer,
        section,
        sectionHeader,
        positionAttributes,
        menu,
        shadowRef,
        smallScreenBreakpoint,
        activator,
      }}
    >
      <div className={wrapperClasses} onClick={handleParentClick}>
        {children}
      </div>
    </MenuContext.Provider>
  );
};

Menu.Popper = function MenuPopper({ children }: PropsWithChildren) {
  const { setPopperElement, positionAttributes, popperContainer } =
    useMenuContext();

  return (
    <div
      ref={setPopperElement}
      className={popperContainer}
      {...positionAttributes}
      {...formFieldFocusAttribute}
    >
      {children}
    </div>
  );
};

Menu.Overlay = function MenuOverlay() {
  const { overlay, toggle, smallScreenBreakpoint } = useMenuContext();

  return (
    <motion.div
      className={overlay}
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

Menu.ItemWrapper = function ItemWrapper({ children }: PropsWithChildren) {
  const {
    menu,
    buttonID,
    menuID,
    hide,
    smallScreenBreakpoint,
    state,
    menuRef,
  } = useMenuContext();

  return (
    <motion.div
      className={menu}
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

Menu.Item = function MenuItem({ item }: { readonly item: SectionProps }) {
  const { section, sectionHeader } = useMenuContext();

  return (
    <div className={section}>
      {item.header && (
        <Menu.ItemHeader className={sectionHeader} text={item.header} />
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
