import React, { useRef } from "react";
import { useIntl } from "react-intl";
import { View } from "react-native";
import { PrimaryAction, SecondaryAction } from "./ButtonGroupAction";
import { messages } from "./messages";
import { styles } from "./ButtonGroup.style";
import { SecondaryActionSheet } from "./components/SecondaryActionSheet";
import { getActions, usePreventTapWhenOffline } from "./utils";
import { ButtonGroupActionElement } from "./types";
import { Button } from "../Button";
import { BottomSheetRef } from "../BottomSheet/BottomSheet";

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
  const { formatMessage } = useIntl();
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
              />
            )}
          </View>
        );
      })}

      {secondaryActions.length > 0 && (
        <View style={styles.moreButton}>
          <Button
            icon={"more"}
            accessibilityLabel={formatMessage(messages.more)}
            onPress={handlePress(openBottomSheet)}
            fullHeight={true}
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
