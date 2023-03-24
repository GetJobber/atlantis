import React, { useState } from "react";
import classnames from "classnames";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { CustomFieldItem, CustomFieldItemProps } from "./CustomFieldItem";
import styles from "./CustomFieldsPage.css";
import {
  CustomFieldAppliesTo,
  CustomFieldConfiguration,
} from "./__fixtureMockTypes";
import { CustomFieldModal, CustomFieldModalProps } from "./CustomFieldModal";
import {
  UseCustomFieldConfigurationsType,
  useCustomFieldConfigurations,
} from "./useCustomFieldConfigurations";
import { Button } from "../Button";
import { Card } from "../Card";
import { Divider } from "../Divider";

export function CustomFieldsPage() {
  const { customFields, updateCustomFieldPosition } =
    useCustomFieldConfigurations();
  return (
    <>
      <CustomFieldsSection
        updateCustomFieldPosition={updateCustomFieldPosition}
        customFieldModelType={CustomFieldAppliesTo.ALL_CLIENTS}
        customFieldList={customFields.client}
      />
      <CustomFieldsSection
        updateCustomFieldPosition={updateCustomFieldPosition}
        customFieldModelType={CustomFieldAppliesTo.ALL_PROPERTIES}
        customFieldList={customFields.property}
      />
      <CustomFieldsSection
        updateCustomFieldPosition={updateCustomFieldPosition}
        customFieldModelType={CustomFieldAppliesTo.ALL_JOBS}
        customFieldList={customFields.job}
      />
      <CustomFieldsSection
        updateCustomFieldPosition={updateCustomFieldPosition}
        customFieldModelType={CustomFieldAppliesTo.ALL_INVOICES}
        customFieldList={customFields.invoice}
      />
      <CustomFieldsSection
        updateCustomFieldPosition={updateCustomFieldPosition}
        customFieldModelType={CustomFieldAppliesTo.ALL_QUOTES}
        customFieldList={customFields.quote}
      />
      <CustomFieldsSection
        updateCustomFieldPosition={updateCustomFieldPosition}
        customFieldModelType={CustomFieldAppliesTo.TEAM}
        customFieldList={customFields.team}
      />
    </>
  );
}

interface CustomFieldsSectionProps {
  updateCustomFieldPosition: UseCustomFieldConfigurationsType["updateCustomFieldPosition"];
  customFieldList: CustomFieldConfiguration[];
  customFieldModelType: CustomFieldAppliesTo;
}
function CustomFieldsSection({
  updateCustomFieldPosition,
  customFieldList,
  customFieldModelType,
}: CustomFieldsSectionProps) {
  const droppableId = `${customFieldModelType}`;
  const [customFieldConfigValueForModal, setCustomFieldConfigValueForModal] =
    useState<CustomFieldModalProps["customFieldConfig"]>();
  function onDragEnd(result: DropResult) {
    if (
      result.reason == "CANCEL" ||
      !result.destination ||
      result.destination.droppableId != droppableId
    ) {
      return;
    }

    updateCustomFieldPosition(
      result.destination.droppableId as CustomFieldAppliesTo,
      result.draggableId,
      result.destination.index,
    );
  }

  function newCustomField() {
    const customFieldConfig = {
      appliesTo: CustomFieldAppliesTo.ALL_CLIENTS,
      transferable: false,
      name: undefined,
      valueType: undefined,
      defaultValue: undefined,
    };
    setCustomFieldConfigValueForModal(customFieldConfig);
  }

  function editCustomField(customFieldConfig: CustomFieldConfiguration) {
    setCustomFieldConfigValueForModal(customFieldConfig);
  }

  function closeCustomFieldModal() {
    setCustomFieldConfigValueForModal(undefined);
  }

  return (
    <div className={classnames(styles.customFieldsSectionCard)}>
      <CustomFieldModal
        open={!!customFieldConfigValueForModal}
        customFieldConfig={customFieldConfigValueForModal}
        onClose={closeCustomFieldModal}
      />
      <Card
        header={{
          title: getSectionHeader(customFieldModelType),
          action: <Button label="Add Field" onClick={newCustomField} />,
        }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId={droppableId}
            type={`${customFieldModelType}_CustomField`}
          >
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {renderCustomFields(customFieldList, editCustomField)}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Card>
    </div>
  );
}
function renderCustomFields(
  customFieldList: CustomFieldConfiguration[],
  onEditCustomField: (customField: CustomFieldConfiguration) => void,
) {
  return customFieldList.map(customField => (
    <>
      <DraggableCustomField
        key={customField.id}
        customField={customField}
        onEditCustomField={onEditCustomField}
      />
      <Divider />
    </>
  ));
}

function DraggableCustomField({
  customField,
  onEditCustomField,
}: CustomFieldItemProps) {
  return (
    <Draggable draggableId={customField.id} index={customField.sortOrder}>
      {provided => (
        <div
          key={`draggableContainer${customField.id}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CustomFieldItem
            customField={customField}
            onEditCustomField={onEditCustomField}
          />
        </div>
      )}
    </Draggable>
  );
}

function getSectionHeader(customFieldModelType: CustomFieldAppliesTo) {
  return `${convertModelTypeToWords(customFieldModelType)} custom fields`;
}

// eslint-disable-next-line max-statements
function convertModelTypeToWords(customFieldModelType: CustomFieldAppliesTo) {
  if (customFieldModelType == CustomFieldAppliesTo.ALL_CLIENTS) {
    return "Client";
  }

  if (customFieldModelType == CustomFieldAppliesTo.ALL_PROPERTIES) {
    return "Property";
  }

  if (customFieldModelType == CustomFieldAppliesTo.ALL_JOBS) {
    return "Job";
  }

  if (customFieldModelType == CustomFieldAppliesTo.ALL_INVOICES) {
    return "Invoice";
  }

  if (customFieldModelType == CustomFieldAppliesTo.ALL_QUOTES) {
    return "Quote";
  }

  if (customFieldModelType == CustomFieldAppliesTo.TEAM) {
    return "Team";
  }

  return "";
}
