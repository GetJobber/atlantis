import { useEffect, useState } from "react";
import {
  CustomFieldAppliesTo,
  CustomFieldConfiguration,
  CustomFieldConfigurationArea,
  CustomFieldConfigurationDropdown,
  CustomFieldConfigurationInterface,
  CustomFieldConfigurationLink,
  CustomFieldConfigurationNumeric,
  CustomFieldConfigurationText,
  CustomFieldConfigurationTrueFalse,
  CustomFieldConfigurationValueType,
} from "./__fixtureMockTypes";
import { CustomFieldConfigurationList } from "./useCustomFieldConfigurations";

export function __useGetDataFromServer() {
  const [fieldList, setFieldList] = useState<CustomFieldConfiguration[]>([]);

  useEffect(() => {
    setFieldList(__makeCustomFieldArray(30));
  }, []);

  return fieldList;
}

function __makeCustomFieldArray(size: number) {
  const customFieldArray = Array.from({ length: size }, (_, index) =>
    __makeFakeCustomField(index),
  );

  customFieldArray.forEach(customField => {
    customField.transferredFrom = [
      __makeLinkCustomField(),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ][Math.floor(Math.random() * 10)];
  });

  // Set initial sort order
  const grouped = groupByType(customFieldArray);
  Object.keys(grouped).forEach(type => {
    // @ts-ignore
    const items = grouped[type];
    // @ts-ignore
    items.forEach((cf, index) => {
      cf.sortOrder = index;
    });
  });

  return customFieldArray;
}
function __makeFakeCustomField(position: number): CustomFieldConfiguration {
  const customFieldGenerators = [
    __makeLinkCustomField,
    __makeSelectCustomField,
    __makeAreaCustomField,
    __makeBoolCustomField,
    __makeNumberCustomField,
    __makeTextCustomField,
  ];
  const generator =
    customFieldGenerators[
      Math.floor(Math.random() * customFieldGenerators.length)
    ];

  return generator();
}

function __makeLinkCustomField(): CustomFieldConfigurationLink {
  const base = __makeInterfaceCustomField("Link");
  // @ts-ignore Only the typename is wrong, remove this and the typename and it should pass.
  return Object.assign(base, {
    defaultValue: {
      text: "Testing",
      url: "https://www.google.com",
    },
    valueType: CustomFieldConfigurationValueType.LINK,
    __typename: "CustomFieldConfigurationLink",
  });
}

function __makeSelectCustomField(): CustomFieldConfigurationDropdown {
  const base = __makeInterfaceCustomField("Select");
  // @ts-ignore Only the typename is wrong, remove this and the typename and it should pass.
  return Object.assign(base, {
    valueType: CustomFieldConfigurationValueType.DROPDOWN,
    defaultValue: "Foo Bar",
    dropdownOptions: ["Foo Bar", "Baz"],
    __typename: "CustomFieldConfigurationDropdown",
  });
}

function __makeAreaCustomField(): CustomFieldConfigurationArea {
  const base = __makeInterfaceCustomField("Area");
  // @ts-ignore Only the typename is wrong, remove this and the typename and it should pass.
  return Object.assign(base, {
    __typename: "CustomFieldConfigurationArea",
    valueType: CustomFieldConfigurationValueType.AREA,
    defaultValue: {
      length: Math.floor(Math.random() * 1000),
      width: Math.floor(Math.random() * 1000),
    },
    unit: ["M", "Ft"][Math.floor(Math.random() * 2)],
  });
}

function __makeBoolCustomField(): CustomFieldConfigurationTrueFalse {
  const base = __makeInterfaceCustomField("Boolean");
  // @ts-ignore Only the typename is wrong, remove this and the typename and it should pass.
  return Object.assign(base, {
    __typename: "CustomFieldConfigurationTrueFalse",
    valueType: CustomFieldConfigurationValueType.TRUE_FALSE,
    defaultValue: [true, false][Math.floor(Math.random() * 2)],
  });
}

function __makeNumberCustomField(): CustomFieldConfigurationNumeric {
  const base = __makeInterfaceCustomField("Number");
  // @ts-ignore Only the typename is wrong, remove this and the typename and it should pass.
  return Object.assign(base, {
    __typename: "CustomFieldConfigurationNumeric",
    valueType: CustomFieldConfigurationValueType.NUMERIC,
    defaultValue: Math.floor(Math.random() * 100),
    unit: ["M", "Lbs", "$"][Math.floor(Math.random() * 3)],
  });
}

function __makeTextCustomField(): CustomFieldConfigurationText {
  const base = __makeInterfaceCustomField("Text");
  // @ts-ignore Only the typename is wrong, remove this and the typename and it should pass.
  return Object.assign(base, {
    __typename: "CustomFieldConfigurationText",
    valueType: CustomFieldConfigurationValueType.TEXT,
    defaultValue: `${Math.floor(Math.random() * 100000)}`,
  });
}

function __makeInterfaceCustomField(
  valueType: string,
): CustomFieldConfigurationInterface {
  const appliesTo = randomEnum(CustomFieldAppliesTo) as CustomFieldAppliesTo;
  return {
    appliesTo: appliesTo,
    createdAt: new Date().toISOString(),
    id: `${Math.floor(Math.random() * 100000)}`,
    name: ["Widget", "Thingger", "Sales", "Size", "Are Doggos Great?"][
      Math.floor(Math.random() * 5)
    ],
    readOnly: [true, false][Math.floor(Math.random() * 2)],
    sortOrder: 0,
    transferable: [true, false][Math.floor(Math.random() * 2)],
    updatedAt: new Date().toISOString(),
    //This is getting overridden later.
    valueType: CustomFieldConfigurationValueType.TEXT,
    transferredFrom: undefined,
  };
}

// @ts-ignore
function randomEnum(anEnum) {
  const possibleValues = Object.values(anEnum);
  return possibleValues[Math.floor(Math.random() * possibleValues.length)];
}

function groupByType(
  customFieldArray: CustomFieldConfiguration[],
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

function fixSortOrderForGrouping(grouping: CustomFieldConfiguration[]) {
  grouping.forEach((cfc, index) => {
    cfc.sortOrder = index;
  });
}

function getGrouping(
  customFieldConfigurationList: CustomFieldConfigurationList,
  appliesTo: CustomFieldAppliesTo,
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
