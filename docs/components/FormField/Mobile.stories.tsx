import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";
import { FormField, InputText, Text } from "@jobber/components-native";

export default {
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
} as ComponentMeta<typeof FormField>;

const BasicTemplate: ComponentStory<typeof FormField> = args => {
  return (
    <FormField {...args}>
      {field => {
        return <InputText value={field.value} placeholder="Enter name here" />;
      }}
    </FormField>
  );
};

const WithValidationsTemplate: ComponentStory<typeof FormField> = args => {
  const methods = useForm({ mode: "onChange" });
  return (
    <FormProvider {...methods}>
      <FormField
        {...args}
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

export const Basic = BasicTemplate.bind({});
Basic.args = {
  name: "name",
};

export const WithValidations = WithValidationsTemplate.bind({});
WithValidations.args = {
  name: "validations",
};
