export type Maybe<T> = T | undefined;

export type Scalars = {
  ISO8601DateTime: string;
  String: string;
  EncodedId: string;
  Int: number;
  Boolean: boolean;
  Float: number;
};

export type CustomFieldConfigurationInterface = {
  /** The object type to which the CustomFieldConfiguration belongs */
  appliesTo: CustomFieldAppliesTo;
  /** The time the CustomFieldConfiguration was created */
  createdAt: Scalars["ISO8601DateTime"];
  /** The CustomFieldConfiguration ID */
  id: Scalars["EncodedId"];
  /** The name of the CustomFieldConfiguration */
  name: Scalars["String"];
  /** Sets if Custom Field values are editable by Jobber users */
  readOnly: Scalars["Boolean"];
  /** The order in which custom fields are displayed by default in Jobber */
  sortOrder: Scalars["Int"];
  /** Transferable custom fields allow data to appear in multiple places and follow you through your workflow */
  transferable: Scalars["Boolean"];
  /** The last time the CustomFieldConfiguration was updated */
  updatedAt: Scalars["ISO8601DateTime"];
  /** The type of CustomFieldConfiguration */
  valueType: CustomFieldConfigurationValueType;

  transferredFrom: Maybe<CustomFieldConfiguration>;
};

export enum CustomFieldAppliesTo {
  /** Attach custom field to all clients on account */
  ALL_CLIENTS = "ALL_CLIENTS",
  /** Attach custom field to all invoices on account */
  ALL_INVOICES = "ALL_INVOICES",
  /** Attach custom field to all jobs on account */
  ALL_JOBS = "ALL_JOBS",
  /** Attach custom field to all properties on account */
  ALL_PROPERTIES = "ALL_PROPERTIES",
  /** Attach custom field to all quotes on account */
  ALL_QUOTES = "ALL_QUOTES",
  /** Attach custom field to a team */
  TEAM = "TEAM",
}

export enum CustomFieldConfigurationValueType {
  /** The value type for an area custom field configuration */
  AREA = "AREA",
  /** The value type for a dropdown custom field configuration */
  DROPDOWN = "DROPDOWN",
  /** The value type for a link custom field configuration */
  LINK = "LINK",
  /** The value type for a numeric custom field configuration */
  NUMERIC = "NUMERIC",
  /** The value type for a text custom field configuration */
  TEXT = "TEXT",
  /** The value type for a true false custom field configuration */
  TRUE_FALSE = "TRUE_FALSE",
}

export type CustomFieldConfiguration =
  | CustomFieldConfigurationArea
  | CustomFieldConfigurationDropdown
  | CustomFieldConfigurationLink
  | CustomFieldConfigurationNumeric
  | CustomFieldConfigurationText
  | CustomFieldConfigurationTrueFalse;

export type CustomFieldConfigurationArea = CustomFieldConfigurationInterface & {
  __typename?: "CustomFieldConfigurationArea";
  /** The object type to which the CustomFieldConfiguration belongs */
  appliesTo: CustomFieldAppliesTo;
  /** The time the CustomFieldConfiguration was created */
  createdAt: Scalars["ISO8601DateTime"];
  /** The default length and width for an area custom field */
  defaultValue: CustomFieldConfigurationAreaDefaultValue;
  /** The unique identifier */
  id: Scalars["EncodedId"];
  /** The name of the CustomFieldConfiguration */
  name: Scalars["String"];
  /** Sets if Custom Field values are editable by Jobber users */
  readOnly: Scalars["Boolean"];
  /** The order in which custom fields are displayed by default in Jobber */
  sortOrder: Scalars["Int"];
  /** Transferable custom fields allow data to appear in multiple places and follow you through your workflow */
  transferable: Scalars["Boolean"];
  /** The unit of an area custom field */
  unit: Scalars["String"];
  /** The last time the CustomFieldConfiguration was updated */
  updatedAt: Scalars["ISO8601DateTime"];
  /** The type of CustomFieldConfiguration */
  valueType: CustomFieldConfigurationValueType;
};

/** The default value for area custom fields */
export type CustomFieldConfigurationAreaDefaultValue = {
  __typename?: "CustomFieldConfigurationAreaDefaultValue";
  /** The default length for area custom fields */
  length: Scalars["Float"];
  /** The default width for area custom fields */
  width: Scalars["Float"];
};

/** A dropdown custom field configuration */
export type CustomFieldConfigurationDropdown =
  CustomFieldConfigurationInterface & {
    __typename?: "CustomFieldConfigurationDropdown";
    /** The object type to which the CustomFieldConfiguration belongs */
    appliesTo: CustomFieldAppliesTo;
    /** The time the CustomFieldConfiguration was created */
    createdAt: Scalars["ISO8601DateTime"];
    /** The default value for a dropdown custom field */
    defaultValue: Scalars["String"];
    /** The list of possible dropdown values of a dropdown custom field */
    dropdownOptions: Array<Scalars["String"]>;
    /** The unique identifier */
    id: Scalars["EncodedId"];
    /** The name of the CustomFieldConfiguration */
    name: Scalars["String"];
    /** Sets if Custom Field values are editable by Jobber users */
    readOnly: Scalars["Boolean"];
    /** The order in which custom fields are displayed by default in Jobber */
    sortOrder: Scalars["Int"];
    /** Transferable custom fields allow data to appear in multiple places and follow you through your workflow */
    transferable: Scalars["Boolean"];
    /** The last time the CustomFieldConfiguration was updated */
    updatedAt: Scalars["ISO8601DateTime"];
    /** The type of CustomFieldConfiguration */
    valueType: CustomFieldConfigurationValueType;
  };

/** A link custom field configuration */
export type CustomFieldConfigurationLink = CustomFieldConfigurationInterface & {
  __typename?: "CustomFieldConfigurationLink";
  /** The object type to which the CustomFieldConfiguration belongs */
  appliesTo: CustomFieldAppliesTo;
  /** The time the CustomFieldConfiguration was created */
  createdAt: Scalars["ISO8601DateTime"];
  /** The default values for this link custom field */
  defaultValue: CustomFieldConfigurationLinkDefaultValue;
  /** The unique identifier */
  id: Scalars["EncodedId"];
  /** The name of the CustomFieldConfiguration */
  name: Scalars["String"];
  /** Sets if Custom Field values are editable by Jobber users */
  readOnly: Scalars["Boolean"];
  /** The order in which custom fields are displayed by default in Jobber */
  sortOrder: Scalars["Int"];
  /** Transferable custom fields allow data to appear in multiple places and follow you through your workflow */
  transferable: Scalars["Boolean"];
  /** The last time the CustomFieldConfiguration was updated */
  updatedAt: Scalars["ISO8601DateTime"];
  /** The type of CustomFieldConfiguration */
  valueType: CustomFieldConfigurationValueType;
};

/** The default value for a link custom field */
export type CustomFieldConfigurationLinkDefaultValue = {
  __typename?: "CustomFieldConfigurationLinkDefaultValue";
  /** The default text for this link custom field */
  text: Scalars["String"];
  /** The default URL for this link custom field */
  url: Scalars["String"];
};

/** A numeric custom field configuration */
export type CustomFieldConfigurationNumeric =
  CustomFieldConfigurationInterface & {
    __typename?: "CustomFieldConfigurationNumeric";
    /** The object type to which the CustomFieldConfiguration belongs */
    appliesTo: CustomFieldAppliesTo;
    /** The time the CustomFieldConfiguration was created */
    createdAt: Scalars["ISO8601DateTime"];
    /** The default number for a numeric custom field */
    defaultValue: Scalars["Float"];
    /** The unique identifier */
    id: Scalars["EncodedId"];
    /** The name of the CustomFieldConfiguration */
    name: Scalars["String"];
    /** Sets if Custom Field values are editable by Jobber users */
    readOnly: Scalars["Boolean"];
    /** The order in which custom fields are displayed by default in Jobber */
    sortOrder: Scalars["Int"];
    /** Transferable custom fields allow data to appear in multiple places and follow you through your workflow */
    transferable: Scalars["Boolean"];
    /** The unit of a numeric custom field */
    unit: Scalars["String"];
    /** The last time the CustomFieldConfiguration was updated */
    updatedAt: Scalars["ISO8601DateTime"];
    /** The type of CustomFieldConfiguration */
    valueType: CustomFieldConfigurationValueType;
  };

/** A text custom field configuration */
export type CustomFieldConfigurationText = CustomFieldConfigurationInterface & {
  __typename?: "CustomFieldConfigurationText";
  /** The object type to which the CustomFieldConfiguration belongs */
  appliesTo: CustomFieldAppliesTo;
  /** The time the CustomFieldConfiguration was created */
  createdAt: Scalars["ISO8601DateTime"];
  /** The default value for a text custom field */
  defaultValue: Scalars["String"];
  /** The unique identifier */
  id: Scalars["EncodedId"];
  /** The name of the CustomFieldConfiguration */
  name: Scalars["String"];
  /** Sets if Custom Field values are editable by Jobber users */
  readOnly: Scalars["Boolean"];
  /** The order in which custom fields are displayed by default in Jobber */
  sortOrder: Scalars["Int"];
  /** Transferable custom fields allow data to appear in multiple places and follow you through your workflow */
  transferable: Scalars["Boolean"];
  /** The last time the CustomFieldConfiguration was updated */
  updatedAt: Scalars["ISO8601DateTime"];
  /** The type of CustomFieldConfiguration */
  valueType: CustomFieldConfigurationValueType;
};

/** A true false custom field configuration */
export type CustomFieldConfigurationTrueFalse =
  CustomFieldConfigurationInterface & {
    __typename?: "CustomFieldConfigurationTrueFalse";
    /** The object type to which the CustomFieldConfiguration belongs */
    appliesTo: CustomFieldAppliesTo;
    /** The time the CustomFieldConfiguration was created */
    createdAt: Scalars["ISO8601DateTime"];
    /** The default value for a TrueFalse custom field */
    defaultValue: Scalars["Boolean"];
    /** The unique identifier */
    id: Scalars["EncodedId"];
    /** The name of the CustomFieldConfiguration */
    name: Scalars["String"];
    /** Sets if Custom Field values are editable by Jobber users */
    readOnly: Scalars["Boolean"];
    /** The order in which custom fields are displayed by default in Jobber */
    sortOrder: Scalars["Int"];
    /** Transferable custom fields allow data to appear in multiple places and follow you through your workflow */
    transferable: Scalars["Boolean"];
    /** The last time the CustomFieldConfiguration was updated */
    updatedAt: Scalars["ISO8601DateTime"];
    /** The type of CustomFieldConfiguration */
    valueType: CustomFieldConfigurationValueType;
  };
