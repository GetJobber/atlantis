import React, { PropsWithChildren, useCallback, useEffect } from "react";
import classNames from "classnames";
import { useIsMounted } from "@jobber/hooks/useIsMounted";
import { createPortal } from "react-dom";
import styles from "../Autocomplete.module.css";
import { UseRepositionMenu, useRepositionMenu } from "../useRepositionMenu";

export interface MenuWrapperProps {
  readonly setMenuRef: UseRepositionMenu["setMenuRef"];
  readonly popperStyles: UseRepositionMenu["styles"];
  readonly attributes: UseRepositionMenu["attributes"];
  readonly targetWidth: UseRepositionMenu["targetWidth"];
  readonly visible?: boolean;
}

function MenuWrapperInternal({
  setMenuRef,
  popperStyles,
  attributes,
  targetWidth,
  visible,
  children,
}: PropsWithChildren<MenuWrapperProps>) {
  return (
    <div
      className={classNames(styles.options, { [styles.visible]: visible })}
      ref={setMenuRef}
      style={{ ...popperStyles.popper, width: targetWidth }}
      data-elevation={"elevated"}
      {...attributes.popper}
    >
      {children}
    </div>
  );
}

/**
 * Provides a wrapper for the Autocomplete menu that handles positioning and visibility.
 * @param attachTo - The element that the menu should be attached to.
 */
export function useAutocompleteMenu({
  attachTo,
}: {
  attachTo: React.RefObject<Element | null>;
}) {
  const [menuRef, setMenuRef] = React.useState<HTMLElement | null>();
  const Wrapper = useCallback(
    ({
      children,
      visible,
    }: {
      children?: React.ReactNode;
      visible: boolean;
    }): React.ReactElement => {
      const props = useRepositionMenu(attachTo, visible);
      useEffect(() => {
        setMenuRef(props.menuRef);
      }, [menuRef, props.menuRef]);

      return (
        <MenuWrapper
          attributes={props.attributes}
          popperStyles={props.styles}
          setMenuRef={props.setMenuRef}
          targetWidth={props.targetWidth}
          visible={visible}
        >
          {children}
        </MenuWrapper>
      );
    },
    [attachTo],
  );

  return { MenuWrapper: Wrapper, menuRef };
}

export function MenuWrapper(props: PropsWithChildren<MenuWrapperProps>) {
  const mounted = useIsMounted();
  const menu = <MenuWrapperInternal {...props} />;

  return mounted.current ? createPortal(menu, document.body) : menu;
}
