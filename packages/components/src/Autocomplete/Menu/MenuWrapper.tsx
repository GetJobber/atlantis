import React, { PropsWithChildren, useCallback, useEffect } from "react";
import classNames from "classnames";
import { useIsMounted } from "@jobber/hooks/useIsMounted";
import { FloatingPortal } from "@floating-ui/react";
import styles from "../Autocomplete.module.css";
import { UseRepositionMenu, useRepositionMenu } from "../useRepositionMenu";

export interface BaseAutocompleteMenuWrapperInternalProps {
  readonly setMenuRef: UseRepositionMenu["setMenuRef"];
  readonly floatStyles: UseRepositionMenu["styles"];
  readonly targetWidth: UseRepositionMenu["targetWidth"];
  readonly visible?: boolean;
}

function BaseAutocompleteMenuWrapperInternal({
  setMenuRef,
  floatStyles,
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
  attachTo: HTMLDivElement | null;
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
      const menuFloatProps = useRepositionMenu(attachTo, visible, true);
      useEffect(() => {
        setMenuRef(menuFloatProps.menuRef);
      }, [menuFloatProps.menuRef]);

      return (
        <BaseAutocompleteMenuWrapper
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

  return mounted.current ? <FloatingPortal>{menu}</FloatingPortal> : menu;
}
