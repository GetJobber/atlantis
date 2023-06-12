import React from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import Reanimated from "react-native-reanimated";
import { styles } from "./FormActionBar.style";
import { SecondaryActionProp } from "../../types";
import { FormSaveButton } from "../FormSaveButton";

const ReanimatedView = Reanimated.createAnimatedComponent(View);

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
  ) => JSX.Element;
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
}: FormActionBarProps): JSX.Element {
  const buttonStyle = StyleSheet.flatten([
    styles.saveButton,
    {
      position: keyboardHeight > 0 ? "absolute" : "relative",
      bottom: 0,
    },
  ]);

  const onLayout = (event: LayoutChangeEvent) => {
    setSaveButtonHeight && setSaveButtonHeight(event.nativeEvent.layout.height);
  };

  return (
    //@ts-expect-error tsc-ci
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
