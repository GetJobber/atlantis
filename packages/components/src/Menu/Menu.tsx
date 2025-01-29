import React, {
  MouseEvent,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { useOnMount } from "@jobber/hooks/useOnMount";
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
    <Menu.Provider
      smallScreenBreakpoint={smallScreenBreakpoint}
      activator={activator}
    >
      <Menu.Wrapper>
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
    </Menu.Provider>
  );
}

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
  const { shadowRefStyle, shadowRef } = useMenuContext();

  return <span className={shadowRefStyle} ref={shadowRef} />;
};

interface MenuContextProps {
  readonly shadowRef: React.RefObject<HTMLSpanElement>;
  readonly popperElement: HTMLElement | null;
  readonly width: number;
  readonly toggle: (callbackPassthrough?: (event?: MouseEvent) => void) => void;
  readonly buttonID: string;
  readonly menuID: string;
  readonly hide: () => void;
  readonly menuRef: React.RefObject<HTMLDivElement>;
  readonly visible: boolean;
  readonly setPopperElement: (element: HTMLElement | null) => void;
  readonly positionAttributes: Record<string, unknown>;
  readonly state: { readonly placement: string } | null;
  readonly wrapperClasses: string;
  readonly shadowRefStyle: string;
  readonly overlay: string;
  readonly popperContainer: string;
  readonly section: string;
  readonly activator: ReactElement;
  readonly smallScreenBreakpoint: number;
  readonly sectionHeader: string;
  readonly menu: string;
}
const MenuContext = React.createContext<MenuContextProps>(
  {} as MenuContextProps,
);

Menu.Provider = function MenuProvider({
  children,
  smallScreenBreakpoint,
  activator,
}: PropsWithChildren<{
  readonly smallScreenBreakpoint: number;
  readonly activator?: ReactElement;
}>) {
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
        positionAttributes,
        state,
        wrapperClasses,
        shadowRefStyle,
        overlay,
        popperContainer,
        section,
        activator,
        smallScreenBreakpoint,
        sectionHeader,
        menu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

function useMenuContext() {
  return React.useContext(MenuContext);
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
}: {
  readonly children: ReactNode;
}) {
  const { wrapperClasses } = useMenuContext();

  return (
    <div className={wrapperClasses} onClick={handleParentClick}>
      {children}
    </div>
  );
};

Menu.Popper = function MenuPopper({ children }: PropsWithChildren) {
  const { visible, popperContainer, setPopperElement, positionAttributes } =
    useMenuContext();

  return (
    visible && (
      <div
        ref={setPopperElement}
        className={popperContainer}
        {...positionAttributes}
        {...formFieldFocusAttribute}
      >
        {children}
      </div>
    )
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
    smallScreenBreakpoint,
    state,
    menuRef,
    hide,
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
  const [mounted, setMounted] = useState(false);

  useOnMount(() => {
    setMounted(true);
  });

  if (!mounted) {
    return null;
  }

  return ReactDOM.createPortal(children, document.body);
}
