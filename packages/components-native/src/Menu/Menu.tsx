import React, { useCallback, useRef, useState } from "react";
import {
  LayoutRectangle,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
import { Portal } from "react-native-portalize";
import { useIntl } from "react-intl";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/stack";
import { styles } from "./Menu.style";
import { messages } from "./messages";
import { findViewpoint } from "./utils";
import { MenuProps } from "./types";
import { MenuOption } from "./components/MenuOption";
import { Overlay } from "./components/Overlay";
import { tokens } from "../utils/design";
import { Button } from "../Button";
import { Content } from "../Content";

export function Menu({ menuOptions, customActivator }: MenuProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<object>();
  const activatorLayout = useRef<LayoutRectangle>();
  const menuButtonRef = useRef<View | null>();
  const screenInfo = useScreenInformation();

  const { formatMessage } = useIntl();

  const findMenuLayout = useCallback(() => {
    if (activatorLayout.current) {
      setMenuPosition(findViewpoint(screenInfo, activatorLayout.current));
    }
  }, [screenInfo, activatorLayout]);

  const activatorOnPress = (onPress?: () => void) => {
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
        onPress && onPress();
      },
    );
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
            accessibilityLabel={formatMessage(messages.more)}
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
  const headerHeight = useHeaderHeight();
  const windowWidth = useWindowDimensions().width;
  const { height: windowHeight } = useSafeAreaFrame();

  return { headerHeight, windowWidth, windowHeight };
}
