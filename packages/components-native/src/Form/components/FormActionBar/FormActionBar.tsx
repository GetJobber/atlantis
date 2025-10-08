import React from "react";
import type { LayoutChangeEvent } from "react-native";
import { StyleSheet } from "react-native";
import Reanimated from "react-native-reanimated";
import { useStyles } from "./FormActionBar.style";
import type { SecondaryActionProp } from "../../types";
import { FormSaveButton } from "../FormSaveButton";

const ReanimatedView = Reanimated.View;

export interface FormActionBarProps {
  readonly keyboardHeight: number;
  readonly isFormSubmitting: boolean;
  readonly saveButtonLabel?: string;
  readonly submit: () => Promise<void> | void;
  readonly setSaveButtonHeight?: (height: number) => void;
  readonly renderStickySection?: (
    onSubmit: () => void,
    label: string | undefined,
    isSubmitting: boolean,
  ) => React.JSX.Element;
  readonly secondaryActions?: SecondaryActionProp[];
  readonly setSecondaryActionLoading?: (bool: boolean) => void;
}

export function FormActionBar({
  keyboardHeight,
  submit,
  isFormSubmitting,
  saveButtonLabel,
  renderStickySection,
  setSaveButtonHeight,
  secondaryActions,
  setSecondaryActionLoading,
}: FormActionBarProps): React.JSX.Element {
  const styles = useStyles();

  const buttonStyle = StyleSheet.flatten([
    styles.saveButton,
    {
      position:
        keyboardHeight > 0 ? ("absolute" as const) : ("relative" as const),
      bottom: 0,
    },
  ]);

  const onLayout = (event: LayoutChangeEvent) => {
    setSaveButtonHeight && setSaveButtonHeight(event.nativeEvent.layout.height);
  };

  return (
    <ReanimatedView style={buttonStyle} onLayout={onLayout}>
      {renderStickySection ? (
        renderStickySection(submit, saveButtonLabel, isFormSubmitting)
      ) : (
        <FormSaveButton
          setSecondaryActionLoading={setSecondaryActionLoading}
          primaryAction={submit}
          loading={isFormSubmitting}
          label={saveButtonLabel}
          secondaryActions={secondaryActions}
        />
      )}
    </ReanimatedView>
  );
}
