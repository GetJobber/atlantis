import React, { RefObject } from "react";
import { Portal } from "react-native-portalize";
import { useIntl } from "react-intl";
import { messages } from "./messages";
import { BottomSheet, BottomSheetRef } from "../../../BottomSheet/BottomSheet";
import { BottomSheetOption } from "../../../BottomSheet/components/BottomSheetOption";

export type BottomSheetOptionsSuffix = "receipt" | "image" | "file" | "video";

interface FormatFileBottomSheetProps {
  bottomSheetRef: RefObject<BottomSheetRef>;
  onPreviewPress?: () => void;
  onRemovePress?: () => void;
  bottomSheetOptionsSuffix?: BottomSheetOptionsSuffix;
}

export const FormatFileBottomSheet = ({
  bottomSheetRef,
  onPreviewPress,
  onRemovePress,
  bottomSheetOptionsSuffix,
}: FormatFileBottomSheetProps): JSX.Element => {
  const { formatMessage } = useIntl();

  const handlePress = (onPressAction: () => void) => {
    onPressAction();

    bottomSheetRef.current?.close();
  };

  return (
    <Portal>
      <BottomSheet ref={bottomSheetRef}>
        {onPreviewPress ? (
          <BottomSheetOption
            icon={"eye"}
            text={formatMessage(messages.lightBoxPreviewButton, {
              bottomSheetOptionsSuffix,
            })}
            onPress={() => handlePress(onPreviewPress)}
          />
        ) : undefined}
        {onRemovePress ? (
          <BottomSheetOption
            icon={"trash"}
            destructive={true}
            text={formatMessage(messages.removeButton, {
              bottomSheetOptionsSuffix,
            })}
            onPress={() => handlePress(onRemovePress)}
          />
        ) : undefined}
      </BottomSheet>
    </Portal>
  );
};
