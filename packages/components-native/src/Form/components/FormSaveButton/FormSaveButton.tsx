import React from "react";
import { useFormContext } from "react-hook-form";
import type { FormSaveButtonProps, SecondaryActionProp } from "../../types";
import type { ButtonGroupSecondaryActionProps } from "../../../ButtonGroup";
import { ButtonGroup } from "../../../ButtonGroup";
import { useAtlantisI18n } from "../../../hooks/useAtlantisI18n";

export function FormSaveButton({
  primaryAction,
  loading,
  label,
  secondaryActions,
  setSecondaryActionLoading,
  onOpenBottomSheet,
  onCloseBottomSheet,
}: FormSaveButtonProps): React.JSX.Element {
  const { t } = useAtlantisI18n();
  const formContext = useFormContext();
  const buttonActions = useButtonGroupAction(secondaryActions);

  return (
    <ButtonGroup
      onOpenBottomSheet={onOpenBottomSheet}
      onCloseBottomSheet={onCloseBottomSheet}
      allowTapWhenOffline={true}
    >
      {buttonActions.map((action, index) => {
        if (index === 0) {
          return (
            <ButtonGroup.PrimaryAction
              key={index}
              onPress={primaryAction}
              label={label ?? t("save")}
              loading={loading}
            />
          );
        } else {
          return (
            <ButtonGroup.SecondaryAction
              key={index}
              label={action.label}
              icon={action.icon}
              onPress={action.onPress}
              destructive={action.destructive}
            />
          );
        }
      })}
    </ButtonGroup>
  );

  function useButtonGroupAction(
    array: SecondaryActionProp[] | undefined,
  ): ButtonGroupSecondaryActionProps[] {
    const buttonGroupActionProps: ButtonGroupSecondaryActionProps[] = array
      ? array.map(arr => {
          return {
            label: arr.label,
            onPress: () => internalOnPress(arr.handleAction),
            destructive: arr.destructive,
            icon: arr.icon,
          };
        })
      : [];

    buttonGroupActionProps.unshift({
      label: label ?? t("save"),
      onPress: primaryAction,
      loading: loading,
      icon: undefined,
    });

    return buttonGroupActionProps;
  }

  async function internalOnPress(
    handleAction: SecondaryActionProp["handleAction"],
  ) {
    let performSubmit = true;

    if (handleAction.onBeforeSubmit) {
      performSubmit = await handleAction.onBeforeSubmit();
    }

    if (performSubmit) {
      setSecondaryActionLoading?.(true);
      handleAction
        .onSubmit(primaryAction)
        .then(() => {
          handleAction.resetFormOnSubmit && formContext.reset();
          handleAction.onSubmitSuccess?.();
        })
        .catch(handleAction.onSubmitError)
        .finally(() => {
          setSecondaryActionLoading?.(false);
        });
    }
  }
}
