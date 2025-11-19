import React, { useCallback, useRef, useState } from "react";
import type { LayoutRectangle } from "react-native";
import {
  Keyboard,
  Platform,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
import { Portal } from "react-native-portalize";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { useStyles } from "./Menu.style";
import { findViewpoint } from "./utils";
import type { MenuProps } from "./types";
import { MenuOption } from "./components/MenuOption";
import { Overlay } from "./components/Overlay";
import { Button } from "../Button";
import { Content } from "../Content";
import { useAtlantisContext } from "../AtlantisContext";
import { useAtlantisI18n } from "../hooks/useAtlantisI18n";
import { useAtlantisTheme } from "../AtlantisThemeContext";

export function Menu({ menuOptions, customActivator }: MenuProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<object>();
  const activatorLayout = useRef<LayoutRectangle | null>(null);
  const menuButtonRef = useRef<View | null>(null);
  const screenInfo = useScreenInformation();

  const { t } = useAtlantisI18n();
  const styles = useStyles();

  const findMenuLayout = useCallback(() => {
    if (activatorLayout.current) {
      setMenuPosition(
        findViewpoint(screenInfo, activatorLayout.current, styles),
      );
    }
  }, [screenInfo, activatorLayout, styles]);

  const openMenu = () => {
    menuButtonRef.current?.measureInWindow(
      (x: number, y: number, width: number, height: number) => {
        activatorLayout.current = {
          x,
          y,
          width,
          height,
        };
        findMenuLayout();
        setOpen(true);
      },
    );
  };

  const activatorOnPress = (onPress?: () => void) => {
    onPress && onPress();

    if (Platform.OS === "ios" && Keyboard.isVisible()) {
      // On iOS, the keyboard height causes problems with the menu positioning logic.
      // Wait until the keyboard is fully hidden before we show the menu.
      onKeyboardDidHide(openMenu);
      Keyboard.dismiss();
    } else {
      openMenu();
    }
  };

  const { tokens } = useAtlantisTheme();

  return (
    <>
      <View
        ref={ref => {
          menuButtonRef.current = ref;
        }}
        collapsable={false}
      >
        {customActivator && (
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? tokens["opacity-pressed"] : 1,
              },
            ]}
            pointerEvents="box-only"
            onPress={() => {
              activatorOnPress(customActivator.props.onPress);
            }}
            onLongPress={customActivator.props.onLongPress}
          >
            {customActivator}
          </Pressable>
        )}

        {!customActivator && (
          <Button
            icon="more"
            accessibilityLabel={t("menu")}
            variation="cancel"
            type="tertiary"
            onPress={() => {
              activatorOnPress();
            }}
          />
        )}
      </View>
      <Portal>
        {open && (
          <>
            <Overlay setOpen={setOpen} />
            <View style={[open && menuPosition, styles.menu]}>
              <Content spacing="none" childSpacing="small">
                {menuOptions?.map((menuOption, index) => {
                  return (
                    <MenuOption {...menuOption} key={index} setOpen={setOpen} />
                  );
                })}
              </Content>
            </View>
          </>
        )}
      </Portal>
    </>
  );
}

function useScreenInformation() {
  const { headerHeight } = useAtlantisContext();
  const windowWidth = useWindowDimensions().width;
  const { height: windowHeight } = useSafeAreaFrame();

  return { headerHeight, windowWidth, windowHeight };
}

function onKeyboardDidHide(callback: () => void) {
  const listener = Keyboard.addListener("keyboardDidHide", () => {
    listener.remove();
    callback();
  });
}
