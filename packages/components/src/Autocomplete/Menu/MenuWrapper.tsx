import React, { PropsWithChildren, useCallback, useEffect } from "react";
import classNames from "classnames";
import { useIsMounted } from "@jobber/hooks/useIsMounted";
import { createPortal } from "react-dom";
import styles from "../Autocomplete.module.css";
import { UseRepositionMenu, useRepositionMenu } from "../useRepositionMenu";

export interface BaseAutocompleteMenuWrapperInternalProps {
  readonly setMenuRef: UseRepositionMenu["setMenuRef"];
  readonly popperStyles: UseRepositionMenu["styles"];
  readonly attributes: UseRepositionMenu["attributes"];
  readonly targetWidth: UseRepositionMenu["targetWidth"];
  readonly visible?: boolean;
}

function BaseAutocompleteMenuWrapperInternal({
  setMenuRef,
  popperStyles,
  attributes,
  targetWidth,
  visible,
  children,
}: PropsWithChildren<BaseAutocompleteMenuWrapperInternalProps>) {
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
  const [menuRef, setMenuRef] = React.useState<HTMLElement | null>(null);
  const AutocompleteMenuWrapper = useCallback(
    ({
      children,
      visible,
    }: {
      children?: React.ReactNode;
      visible: boolean;
    }): React.ReactElement => {
      const menuPopperProps = useRepositionMenu(attachTo);
      useEffect(() => {
        setMenuRef(menuPopperProps.menuRef);
      }, [menuPopperProps.menuRef]);

      return (
        <BaseAutocompleteMenuWrapper
          attributes={menuPopperProps.attributes}
          popperStyles={menuPopperProps.styles}
          setMenuRef={menuPopperProps.setMenuRef}
          targetWidth={menuPopperProps.targetWidth}
          visible={visible}
        >
          {children}
        </BaseAutocompleteMenuWrapper>
      );
    },
    [attachTo],
  );

  return { MenuWrapper: AutocompleteMenuWrapper, menuRef };
}

export function BaseAutocompleteMenuWrapper(
  props: PropsWithChildren<BaseAutocompleteMenuWrapperInternalProps>,
) {
  const mounted = useIsMounted();
  const menu = <BaseAutocompleteMenuWrapperInternal {...props} />;

  return mounted.current ? createPortal(menu, document.body) : menu;
}
