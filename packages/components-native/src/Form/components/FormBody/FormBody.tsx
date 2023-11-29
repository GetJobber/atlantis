import React, { useMemo } from "react";
import { View } from "react-native";
import { styles } from "./FormBody.style";
import { useScreenInformation } from "../../hooks/useScreenInformation";
import { FormActionBar, FormActionBarProps } from "../FormActionBar";
import { tokens } from "../../../utils/design";

interface FormBodyProps extends FormActionBarProps {
  readonly children: JSX.Element;
  readonly shouldRenderActionBar?: boolean;
  readonly saveButtonOffset?: number;
}

export function FormBody({
  isFormSubmitting,
  submit,
  keyboardHeight,
  children,
  saveButtonLabel,
  renderStickySection,
  shouldRenderActionBar = true,
  secondaryActions,
  setSecondaryActionLoading,
  setSaveButtonHeight,
  saveButtonOffset,
}: FormBodyProps): JSX.Element {
  const paddingBottom = useBottomPadding();
  const fullViewPadding = useMemo(() => ({ paddingBottom }), [paddingBottom]);

  return (
    <>
      <View style={[styles.container]}>
        {children}
        {shouldRenderActionBar && (
          <FormActionBar
            setSecondaryActionLoading={setSecondaryActionLoading}
            keyboardHeight={keyboardHeight}
            submit={submit}
            isFormSubmitting={isFormSubmitting}
            saveButtonLabel={saveButtonLabel}
            renderStickySection={renderStickySection}
            secondaryActions={secondaryActions}
            setSaveButtonHeight={setSaveButtonHeight}
          />
        )}
      </View>

      {shouldRenderActionBar && !saveButtonOffset && (
        <View
          style={[fullViewPadding, styles.safeArea]}
          testID="ATL-FormSafeArea"
        />
      )}
    </>
  );
}

export function useBottomPadding(): number {
  const { insets } = useScreenInformation();
  const extraBottomSpace = insets.bottom - tokens["space-base"];

  return extraBottomSpace >= 0 ? extraBottomSpace : 0;
}
