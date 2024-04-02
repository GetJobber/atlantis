import React, { useCallback, useRef, useState } from "react";
import {
  Keyboard,
  LayoutRectangle,
  Platform,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
import { Portal } from "react-native-portalize";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { styles } from "./Menu.style";
import { findViewpoint } from "./utils";
import { MenuProps } from "./types";
import { MenuOption } from "./components/MenuOption";
import { Overlay } from "./components/Overlay";
import { tokens } from "../utils/design";
import { Button } from "../Button";
import { Content } from "../Content";
import { useAtlantisContext } from "../AtlantisContext";
import { useAtlantisI18n } from "../hooks/useAtlantisI18n";

export function Menu({ menuOptions, customActivator }: MenuProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<object>();
  const activatorLayout = useRef<LayoutRectangle>();
  const menuButtonRef = useRef<View | null>();
  const screenInfo = useScreenInformation();

  const { t } = useAtlantisI18n();

  const findMenuLayout = useCallback(() => {
    if (activatorLayout.current) {
      setMenuPosition(findViewpoint(screenInfo, activatorLayout.current));
    }
  }, [screenInfo, activatorLayout]);

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

    if (Keyboard.isVisible()) {
      onKeyboardHide(() => {
        openMenu();
      });
      Keyboard.dismiss();
    } else {
      openMenu();
    }
  };

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

function onKeyboardHide(callback: () => void) {
  const isKeyboardEventSupported =
    Platform.OS !== "android" ||
    // Android versions >10 (API >29) support this event
    (Platform.OS === "android" && Platform.Version > 29);

  if (isKeyboardEventSupported) {
    const listener = Keyboard.addListener("keyboardDidHide", () => {
      listener.remove();
      callback();
    });
  } else {
    callback();
  }
}
