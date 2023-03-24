import React, { MutableRefObject, useRef } from "react";
import { useFormState } from "@jobber/hooks";
import classnames from "classnames";
import styles from "./CustomFieldModal.css";
import { DefaultValueSection } from "./DefaultValueSection";
import { useCustomFieldFormValueState } from "./useCustomFieldFormValueState";
import {
  CustomFieldOrCustomFieldInitialValues,
  useHandleSave,
} from "./useHandleSave";
import {
  CustomFieldAppliesTo,
  CustomFieldConfigurationValueType,
} from "../__fixtureMockTypes";
import { Checkbox } from "../../Checkbox";
import { Content } from "../../Content";
import { Form, FormRef } from "../../Form";
import { Icon } from "../../Icon";
import { InputText } from "../../InputText";
import { Modal } from "../../Modal";
import { Option, Select } from "../../Select";
import { Tooltip } from "../../Tooltip";
import { Banner } from "../../Banner";

export interface CustomFieldModalProps {
  customFieldConfig?: CustomFieldOrCustomFieldInitialValues;
  open: boolean;
  onClose(): void;
}

export function CustomFieldModal({
  customFieldConfig,
  open,
  onClose,
}: CustomFieldModalProps) {
  //TODO: Handle Delete Flow
  const deleteAction = {
    label: "Delete",
    onClick: () => {
      alert("delete");
    },
  };
  const formRef = useRef() as MutableRefObject<FormRef>;
  return (
    <>
      <Modal
        title={getModalTitle(customFieldConfig)}
        open={open}
        primaryAction={{
          label: "Save",
          onClick: () => formRef.current.submit(),
        }}
        secondaryAction={{
          label: "Cancel",
          onClick: onClose,
        }}
        tertiaryAction={customFieldConfig ? deleteAction : undefined}
        onRequestClose={onClose}
      >
        {open && customFieldConfig && (
          <CustomFieldModalContent
            customFieldConfig={customFieldConfig}
            formRef={formRef}
            onClose={onClose}
          />
        )}
      </Modal>
    </>
  );
}

interface CustomFieldModalContentProps {
  customFieldConfig: CustomFieldOrCustomFieldInitialValues;
  formRef: MutableRefObject<FormRef>;
  onClose(): void;
}
function CustomFieldModalContent({
  customFieldConfig,
  formRef,
  onClose,
}: CustomFieldModalContentProps) {
  const [, setFormState] = useFormState();
  const formValueState = useCustomFieldFormValueState(customFieldConfig);
  const { handleSave } = useHandleSave();
  function onValueTypeChange(value: CustomFieldConfigurationValueType) {
    formValueState.setValueType(value);
    formValueState.setDefaultValue(undefined);
    formValueState.setUnit(undefined);
  }
  function onSubmit() {
    handleSave(customFieldConfig, formValueState).then(() => {
      onClose();
    });
  }

  return (
    <Content>
      {customFieldConfig?.transferable && (
        <Banner type="warning" dismissible={false}>
          Warning: Deleting or editing this transferable custom field will
          affect all instances where it was previously used.{" "}
          <a href="https://help.getjobber.com/hc/en-us/articles/115009735928#transferable">
            More Information.
          </a>
        </Banner>
      )}
      <Form onStateChange={setFormState} ref={formRef} onSubmit={onSubmit}>
        <Content>
          <label>Applies to </label>
          <Select
            name="appliesTo"
            value={formValueState.appliesTo}
            onChange={value =>
              formValueState.setAppliesTo(value as CustomFieldAppliesTo)
            }
            disabled={!isNewCustomField(customFieldConfig)}
          >
            <Option value={CustomFieldAppliesTo.ALL_CLIENTS}>
              All clients
            </Option>
            <Option value={CustomFieldAppliesTo.ALL_PROPERTIES}>
              All properties
            </Option>
            <Option value={CustomFieldAppliesTo.ALL_JOBS}>All jobs</Option>
            <Option value={CustomFieldAppliesTo.ALL_INVOICES}>
              All invoices
            </Option>
            <Option value={CustomFieldAppliesTo.ALL_QUOTES}>All quotes</Option>
            <Option value={CustomFieldAppliesTo.TEAM}>Team</Option>
          </Select>

          <div className={classnames(styles.transferableFieldContainer)}>
            <Checkbox
              name="transferable"
              label="Transferable field"
              checked={formValueState.transferable}
              onChange={formValueState.setTransferable}
              disabled={!isNewCustomField(customFieldConfig)}
            />
            {/* TODO: Need to rethink this for the Learn More link. We can probably do something clever to replace the tooltip with something like a popover */}
            <Tooltip message="Transferable custom fields allow your data to appear in multiple places and follow you through your workflow. Learn More. This field will also apply to quotes, jobs and invoices.">
              <Icon name="help" />
            </Tooltip>
          </div>

          <InputText
            name="name"
            placeholder="Custom field name"
            value={formValueState.name}
            onChange={value => formValueState.setName(value as string)}
            validations={{
              required: {
                value: true,
                message: "Custom field name is required",
              },
            }}
          />

          <label>Field type </label>

          <Select
            name="valueType"
            value={formValueState.valueType}
            onChange={onValueTypeChange}
            disabled={!isNewCustomField(customFieldConfig)}
          >
            <Option value={CustomFieldConfigurationValueType.TRUE_FALSE}>
              True/False
            </Option>
            <Option value={CustomFieldConfigurationValueType.NUMERIC}>
              Numeric
            </Option>
            <Option value={CustomFieldConfigurationValueType.AREA}>Area</Option>
            <Option value={CustomFieldConfigurationValueType.DROPDOWN}>
              Dropdown
            </Option>
            <Option value={CustomFieldConfigurationValueType.TEXT}>
              Text Field
            </Option>
          </Select>
          <DefaultValueSection formValueState={formValueState} />
        </Content>
      </Form>
    </Content>
  );
}

function isNewCustomField(
  customFieldConfig: CustomFieldOrCustomFieldInitialValues | undefined,
) {
  return !customFieldConfig?.name;
}
function getModalTitle(
  customFieldConfig: CustomFieldOrCustomFieldInitialValues | undefined,
) {
  if (isNewCustomField(customFieldConfig)) {
    return "New Custom Field";
  } else {
    return `Edit ${customFieldConfig?.name}`;
  }
}
