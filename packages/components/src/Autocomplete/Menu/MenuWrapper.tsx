import React, { PropsWithChildren, useCallback } from "react";
import classNames from "classnames";
import { useIsMounted } from "@jobber/hooks/useIsMounted";
import { createPortal } from "react-dom";
import styles from "../Autocomplete.module.css";
import { UseRepositionMenu, useRepositionMenu } from "../useRepositionMenu";

export interface BaseAutocompleteMenuWrapperInternalProps {
  readonly setMenuRef: (ref: HTMLElement | null) => void;
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
  setMenuRef,
  menuRef,
}: {
  attachTo: React.RefObject<Element | null>;
  setMenuRef: (ref: HTMLElement | null) => void;
  menuRef: HTMLElement | null;
}) {
  const AutocompleteMenuWrapper = useCallback(
    ({
      children,
      visible,
    }: {
      children?: React.ReactNode;
      visible: boolean;
    }): React.ReactElement => {
      const menuPopperProps = useRepositionMenu(attachTo, menuRef, visible);

      return (
        <BaseAutocompleteMenuWrapper
          attributes={menuPopperProps.attributes}
          popperStyles={menuPopperProps.styles}
          setMenuRef={setMenuRef}
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
