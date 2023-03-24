import { CustomFieldConfiguration } from "../__fixtureMockTypes";

export type CustomFieldOrCustomFieldInitialValues =
  | CustomFieldConfiguration
  | (Pick<CustomFieldConfiguration, "appliesTo" | "transferable"> & {
      defaultValue: undefined;
      valueType: undefined;
      name: undefined;
    });

export function useHandleSave() {
  return {
    handleSave,
  };
}
function handleSave(
  customFieldConfig: CustomFieldOrCustomFieldInitialValues,
  formValueState: Partial<
    Pick<
      CustomFieldConfiguration,
      "appliesTo" | "transferable" | "name" | "valueType" | "defaultValue"
    >
  > & {
    unit?: string;
    dropdownOptions?: string[];
  },
) {
  const customFieldToSend = JSON.parse(JSON.stringify(customFieldConfig));

  customFieldToSend.appliesTo = formValueState.appliesTo;
  customFieldToSend.transferable = formValueState.transferable;
  customFieldToSend.name = formValueState.name;
  customFieldToSend.valueType = formValueState.valueType;
  customFieldToSend.defaultValue = formValueState.defaultValue;
  customFieldToSend.unit = formValueState.unit;
  customFieldToSend.dropdownOptions = formValueState.dropdownOptions;

  return new Promise(resolve => {
    setTimeout(() => {
      if (customFieldToSend.id) {
        console.log(
          `update request sent for type ${customFieldToSend.appliesTo}`,
          customFieldToSend,
        );
      } else {
        console.log(
          `create request sent for type ${customFieldToSend.appliesTo}`,
          customFieldToSend,
        );
      }
      resolve(undefined);
    }, 1000);
  });
}
