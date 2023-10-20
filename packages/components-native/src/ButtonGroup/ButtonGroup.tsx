import React, { useRef } from "react";
import { View } from "react-native";
import { PrimaryAction, SecondaryAction } from "./ButtonGroupAction";
import { styles } from "./ButtonGroup.style";
import { SecondaryActionSheet } from "./components/SecondaryActionSheet";
import { getActions, usePreventTapWhenOffline } from "./utils";
import { ButtonGroupActionElement } from "./types";
import { Button } from "../Button";
import { BottomSheetRef } from "../BottomSheet/BottomSheet";
import { useAtlantisI18n } from "../hooks/useAtlantisI18n";

export interface ButtonGroupProps {
  readonly children: ButtonGroupActionElement | ButtonGroupActionElement[];

  /**
   * Display a cancel button in the secondary bottom sheet footer.
   */
  readonly showCancelInBottomSheet?: boolean;

  /**
   * An optional heading to display in the secondary bottom sheet header.
   */
  readonly bottomSheetHeading?: string;

  /**
   * Callback that is called when the secondary actions bottom sheet is opened.
   */
  readonly onOpenBottomSheet?: () => void;

  /**
   * Callback that is called when the secondary actions bottom sheet is closed.
   */
  readonly onCloseBottomSheet?: () => void;

  /**
   * Allows you to Tap the button while offline
   */
  readonly allowTapWhenOffline?: boolean;
}

export function ButtonGroup({
  children,
  showCancelInBottomSheet,
  bottomSheetHeading,
  onOpenBottomSheet,
  onCloseBottomSheet,
  allowTapWhenOffline = false,
}: ButtonGroupProps): JSX.Element {
  const { t } = useAtlantisI18n();
  const { handlePress } = usePreventTapWhenOffline();
  const secondaryActionsRef = useRef<BottomSheetRef>();
  const { primaryActions, secondaryActions } = getActions(children);

  return (
    <View style={styles.buttonGroup}>
      {primaryActions.map((action, index) => {
        const {
          label,
          onPress,
          buttonType,
          buttonVariation,
          icon,
          customButton,
          loading,
        } = action.props;

        return (
          <View style={styles.button} key={index}>
            {customButton || (
              <Button
                label={label}
                accessibilityLabel={label}
                onPress={allowTapWhenOffline ? onPress : handlePress(onPress)}
                type={buttonType}
                variation={buttonVariation}
                fullHeight={true}
                icon={icon}
                loading={loading}
                testID={`ATL-ButtonGroup-Primary-Action-${index}`}
              />
            )}
          </View>
        );
      })}

      {secondaryActions.length > 0 && (
        <View style={styles.moreButton}>
          <Button
            icon={"more"}
            accessibilityLabel={t("more")}
            onPress={handlePress(openBottomSheet)}
            fullHeight={true}
            testID="ATL-ButtonGroup-Secondary-Action"
          />
        </View>
      )}

      <SecondaryActionSheet
        heading={bottomSheetHeading}
        showCancel={showCancelInBottomSheet}
        secondaryActionsRef={secondaryActionsRef}
        actions={secondaryActions.map(secondaryAction => secondaryAction.props)}
        onOpenBottomSheet={onOpenBottomSheet}
        onCloseBottomSheet={onCloseBottomSheet}
      />
    </View>
  );

  function openBottomSheet() {
    secondaryActionsRef.current?.open();
  }
}

ButtonGroup.PrimaryAction = PrimaryAction;
ButtonGroup.SecondaryAction = SecondaryAction;
