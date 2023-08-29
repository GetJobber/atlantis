import React, { RefObject } from "react";
import { Portal } from "react-native-portalize";
import { BottomSheet, BottomSheetRef } from "../../../BottomSheet/BottomSheet";
import { BottomSheetOption } from "../../../BottomSheet/components/BottomSheetOption";
import { useAtlantisI18n } from "../../../hooks/useAtlantisI18n";

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
  const { t } = useAtlantisI18n();

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
            text={t("FormatFile.preview", {
              item: bottomSheetOptionsSuffix || "",
            })}
            onPress={() => handlePress(onPreviewPress)}
          />
        ) : undefined}
        {onRemovePress ? (
          <BottomSheetOption
            icon={"trash"}
            destructive={true}
            text={t("FormatFile.remove", {
              item: bottomSheetOptionsSuffix || "",
            })}
            onPress={() => handlePress(onRemovePress)}
          />
        ) : undefined}
      </BottomSheet>
    </Portal>
  );
};
