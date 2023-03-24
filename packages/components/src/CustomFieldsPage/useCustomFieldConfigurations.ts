import { useEffect, useState } from "react";
import { __useGetDataFromServer } from "./__fixtureData";
import {
  CustomFieldAppliesTo,
  CustomFieldConfiguration,
} from "./__fixtureMockTypes";

export type CustomFieldConfigurationList = {
  client: Array<CustomFieldConfiguration>;
  property: Array<CustomFieldConfiguration>;
  job: Array<CustomFieldConfiguration>;
  invoice: Array<CustomFieldConfiguration>;
  quote: Array<CustomFieldConfiguration>;
  team: Array<CustomFieldConfiguration>;
};

export type UseCustomFieldConfigurationsType = {
  customFields: CustomFieldConfigurationList;
  updateCustomFieldPosition: (
    appliesToSection: CustomFieldAppliesTo,
    customFieldConfigurationId: CustomFieldConfiguration["id"],
    newPosition: number
  ) => void;
};

export function useCustomFieldConfigurations(): UseCustomFieldConfigurationsType {
  const [fieldList, setFieldList] = useState<CustomFieldConfigurationList>(emptyGroupedList());
  const dataFromServer = __useGetDataFromServer();

  useEffect(() => {
    setFieldList(groupByType(dataFromServer));
  }, [dataFromServer]);

  function updateCustomFieldPosition(
    appliesToSection: CustomFieldAppliesTo,
    customFieldConfigurationId: CustomFieldConfiguration["id"],
    newPosition: number
  ) {
    const newCustomFieldConfigs = JSON.parse(
      JSON.stringify(fieldList)
    ) as typeof fieldList;

    const customFieldGrouping = getGrouping(
      newCustomFieldConfigs,
      appliesToSection
    );

    const customFieldConfigIndex = customFieldGrouping.findIndex(
      cfc => cfc.id == customFieldConfigurationId
    );

    const customFieldConfig = customFieldGrouping[customFieldConfigIndex];

    if (!customFieldConfig) {
      return;
    }

    customFieldGrouping.splice(customFieldConfigIndex, 1);
    customFieldGrouping.splice(newPosition, 0, customFieldConfig);
    fixSortOrderForGrouping(customFieldGrouping);

    setFieldList(newCustomFieldConfigs);
    //TODO: Remotely send *ALL* custom fields in group to the server in the proper order, server will handle ensuring they stay in that order.
  }

  return {
    updateCustomFieldPosition,
    customFields: fieldList,
  };
}

function getGrouping(
  customFieldConfigurationList: CustomFieldConfigurationList,
  appliesTo: CustomFieldAppliesTo
) {
  if (appliesTo == CustomFieldAppliesTo.ALL_CLIENTS) {
    return customFieldConfigurationList.client;
  }

  if (appliesTo == CustomFieldAppliesTo.ALL_PROPERTIES) {
    return customFieldConfigurationList.property;
  }

  if (appliesTo == CustomFieldAppliesTo.ALL_JOBS) {
    return customFieldConfigurationList.job;
  }

  if (appliesTo == CustomFieldAppliesTo.ALL_INVOICES) {
    return customFieldConfigurationList.invoice;
  }

  if (appliesTo == CustomFieldAppliesTo.ALL_QUOTES) {
    return customFieldConfigurationList.quote;
  }

  if (appliesTo == CustomFieldAppliesTo.TEAM) {
    return customFieldConfigurationList.team;
  }

  // This should be impossible, but typescript isn't that smart.
  return [];
}

function fixSortOrderForGrouping(grouping: CustomFieldConfiguration[]) {
  grouping.forEach((cfc, index) => {
    cfc.sortOrder = index;
  });
}

function groupByType(
  customFieldArray: CustomFieldConfiguration[]
): CustomFieldConfigurationList {
  const groups: CustomFieldConfigurationList = emptyGroupedList();

  customFieldArray.forEach(customField => {
    getGrouping(groups, customField.appliesTo).push(customField);
  });

  // In case the server has gotten bad data, let's update these to ensure that they have the correct sort orders (no missing values)
  // draggable library cannot handle orders like, 1, 3, 4, 5, 6 because it needs to be consecutive. On the next save, these changes/the new order will be persisted
  Object.values(groups).forEach(grouping => {
    fixSortOrderForGrouping(grouping);
  });

  return groups;
}

function emptyGroupedList(): CustomFieldConfigurationList {
  return {
    client: [],
    property: [],
    job: [],
    invoice: [],
    quote: [],
    team: [],
  };
}