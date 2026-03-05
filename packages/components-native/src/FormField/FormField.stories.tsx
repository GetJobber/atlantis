import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { Meta } from "@storybook/react-native-web-vite";
import { InputText, Text } from "@jobber/components-native";
import { FormField } from "./FormField";

const meta = {
  title: "Components/Private/FormField/Mobile",
  component: FormField,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "react-hook-form": ["useForm", "FormProvider"],
        },
      },
    },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof FormField>;

export default meta;

const BasicTemplate = (args: unknown) => {
  const formFieldArgs = (
    typeof args === "object" && args ? args : {}
  ) as Parameters<typeof FormField>[0];

  return (
    <FormField {...formFieldArgs}>
      {field => {
        return <InputText value={field.value} placeholder="Enter name here" />;
      }}
    </FormField>
  );
};

const WithValidationsTemplate = (args: unknown) => {
  const formFieldArgs = (
    typeof args === "object" && args ? args : {}
  ) as Parameters<typeof FormField>[0];
  const methods = useForm({ mode: "onChange" });

  return (
    <FormProvider {...methods}>
      <FormField
        {...formFieldArgs}
        validations={{
          maxLength: {
            value: 5,
            message: "Should not exceed 5 characters",
          },
        }}
      >
        {(field, error) => {
          return (
            <>
              {error && <Text variation="error">{error.message}</Text>}
              <InputText
                value={field.value}
                placeholder="Should not exceed 5 characters"
                onChangeText={field.onChange}
              />
            </>
          );
        }}
      </FormField>
    </FormProvider>
  );
};

export const Basic = {
  render: BasicTemplate,
  args: {
    name: "name",
  },
};
export const WithValidations = {
  render: WithValidationsTemplate,
  args: {
    name: "validations",
  },
};
