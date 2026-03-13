import type { ReactElement } from "react";
import React, { createContext, useContext } from "react";
import { useWindowDimensions } from "@jobber/hooks";
import { SMALL_SCREEN_BREAKPOINT } from "./constants";
import type {
  MenuHeaderComposableProps,
  MenuItemComposableProps,
  MenuLegacyProps,
  MenuResponsiveProps,
  MenuSectionComposableProps,
  MenuSeparatorComposableProps,
} from "./Menu.types";
import {
  MenuHeaderComposable,
  MenuHeaderLabel,
  MenuItemComposable,
  MenuItemIconComposable,
  MenuItemLabelComposable,
  MenuPopover,
  MenuSectionComposable,
  MenuSeparatorComposable,
} from "./Menu.composable";
import { MenuLegacy } from "./Menu.legacy";
import { BottomSheet } from "../BottomSheet";

interface MenuSurfaceComponents {
  readonly Section: typeof MenuSectionComposable;
  readonly Header: typeof MenuHeaderComposable;
  readonly Item: typeof MenuItemComposable;
  readonly Separator: typeof MenuSeparatorComposable;
}

const menuPopoverComponents: MenuSurfaceComponents = {
  Section: MenuSectionComposable,
  Header: MenuHeaderComposable,
  Item: MenuItemComposable,
  Separator: MenuSeparatorComposable,
};

const menuSheetComponents: MenuSurfaceComponents = {
  Section: BottomSheet.Section,
  Header: BottomSheet.Header,
  Item: BottomSheet.Item,
  Separator: BottomSheet.Separator,
};

const MenuSurfaceComponentsContext = createContext<MenuSurfaceComponents>(
  menuPopoverComponents,
);

interface MenuComponent {
  (props: MenuLegacyProps): ReactElement;
  (props: MenuResponsiveProps): ReactElement;
  Section: (props: MenuSectionComposableProps) => ReactElement;
  Header: (props: MenuHeaderComposableProps) => ReactElement;
  Item: React.ForwardRefExoticComponent<
    MenuItemComposableProps & React.RefAttributes<HTMLElement>
  >;
  Separator: (props: MenuSeparatorComposableProps) => ReactElement;
  ItemIcon: typeof MenuItemIconComposable;
  ItemLabel: typeof MenuItemLabelComposable;
  HeaderLabel: typeof MenuHeaderLabel;
  Popover: typeof MenuPopover;
}

function isLegacy(
  props: MenuLegacyProps | MenuResponsiveProps,
): props is MenuLegacyProps {
  return "items" in props;
}

function useMenuSurfaceComponents() {
  return useContext(MenuSurfaceComponentsContext);
}

function MenuRoot(props: MenuLegacyProps | MenuResponsiveProps): ReactElement {
  if (isLegacy(props)) {
    return <MenuLegacy {...props} />;
  }

  const { ariaLabel, children, trigger, ...rootProps } = props;
  const { width } = useWindowDimensions();
  const isSmallScreen = width < SMALL_SCREEN_BREAKPOINT;
  const surfaceComponents = isSmallScreen
    ? menuSheetComponents
    : menuPopoverComponents;
  const RootComponent = isSmallScreen ? BottomSheet : MenuPopover;

  return (
    <MenuSurfaceComponentsContext.Provider value={surfaceComponents}>
      <RootComponent ariaLabel={ariaLabel} trigger={trigger} {...rootProps}>
        {children}
      </RootComponent>
    </MenuSurfaceComponentsContext.Provider>
  );
}

function MenuSection(props: MenuSectionComposableProps): ReactElement {
  const { Section } = useMenuSurfaceComponents();

  return <Section {...props} />;
}

function MenuHeader(props: MenuHeaderComposableProps): ReactElement {
  const { Header } = useMenuSurfaceComponents();

  return <Header {...props} />;
}

const MenuItem = React.forwardRef<HTMLElement, MenuItemComposableProps>(
  function MenuItem(props, ref) {
    const { Item } = useMenuSurfaceComponents();

    return <Item {...props} ref={ref} />;
  },
);

function MenuSeparator(props: MenuSeparatorComposableProps): ReactElement {
  const { Separator } = useMenuSurfaceComponents();

  return <Separator {...props} />;
}

export const Menu = Object.assign(MenuRoot, {
  Section: MenuSection,
  Header: MenuHeader,
  Item: MenuItem,
  Separator: MenuSeparator,
  ItemIcon: MenuItemIconComposable,
  ItemLabel: MenuItemLabelComposable,
  HeaderLabel: MenuHeaderLabel,
  Popover: MenuPopover,
}) as MenuComponent;
