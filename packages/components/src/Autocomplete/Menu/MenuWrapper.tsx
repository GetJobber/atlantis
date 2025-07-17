import React, { PropsWithChildren, useCallback, useEffect } from "react";
import classNames from "classnames";
import { useIsMounted } from "@jobber/hooks/useIsMounted";
import { createPortal } from "react-dom";
import styles from "../Autocomplete.module.css";
import { UseRepositionMenu, useRepositionMenu } from "../useRepositionMenu";

export interface BaseAutocompleteMenuWrapperInternalProps {
  readonly setMenuRef: UseRepositionMenu["setMenuRef"];
  readonly floatStyles: UseRepositionMenu["styles"];
  readonly attributes: UseRepositionMenu["attributes"];
  readonly targetWidth: UseRepositionMenu["targetWidth"];
  readonly visible?: boolean;
}

function BaseAutocompleteMenuWrapperInternal({
  setMenuRef,
  floatStyles,
  attributes,
  targetWidth,
  visible,
  children,
}: PropsWithChildren<BaseAutocompleteMenuWrapperInternalProps>) {
  return (
    <div
      className={classNames(styles.options, { [styles.visible]: visible })}
      ref={setMenuRef}
      style={{ ...floatStyles.float, width: targetWidth }}
      data-elevation={"elevated"}
      {...attributes.float}
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
      const menuFloatProps = useRepositionMenu(attachTo);
      useEffect(() => {
        setMenuRef(menuFloatProps.menuRef);
      }, [menuFloatProps.menuRef]);

      return (
        <BaseAutocompleteMenuWrapper
          attributes={menuFloatProps.attributes}
          floatStyles={menuFloatProps.styles}
          setMenuRef={menuFloatProps.setMenuRef}
          targetWidth={menuFloatProps.targetWidth}
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
