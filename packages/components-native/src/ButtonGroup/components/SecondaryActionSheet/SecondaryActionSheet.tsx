import React, { RefObject } from "react";
import { View } from "react-native";
import { Portal } from "react-native-portalize";
import { ButtonGroupSecondaryActionProps } from "../../types";
import { BottomSheetOption } from "../../../BottomSheet/components/BottomSheetOption";
import { BottomSheet, BottomSheetRef } from "../../../BottomSheet/BottomSheet";

interface SecondaryActionSheetProps {
  readonly actions: ButtonGroupSecondaryActionProps[];
  readonly secondaryActionsRef: RefObject<BottomSheetRef>;
  readonly showCancel?: boolean;
  readonly heading?: string;
  readonly onOpenBottomSheet?: () => void;
  readonly onCloseBottomSheet?: () => void;
}

export function SecondaryActionSheet({
  actions,
  secondaryActionsRef,
  heading,
  showCancel,
  onOpenBottomSheet,
  onCloseBottomSheet,
}: SecondaryActionSheetProps): JSX.Element {
  return (
    <Portal>
      <BottomSheet
        heading={heading}
        showCancel={showCancel}
        ref={secondaryActionsRef}
        onOpen={onOpenBottomSheet}
        onClose={onCloseBottomSheet}
      >
        <View>
          {actions.map((action, index) => {
            const { label, onPress, icon, iconColor, destructive } = action;

            return (
              <BottomSheetOption
                destructive={destructive}
                key={index}
                text={label}
                onPress={() => {
                  secondaryActionsRef?.current?.close();
                  onPress();
                }}
                icon={icon}
                iconColor={iconColor}
              />
            );
          })}
        </View>
      </BottomSheet>
    </Portal>
  );
}
