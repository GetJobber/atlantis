import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { FormField, InputText, Text } from "@jobber/components-native";

const meta = {
  title: "Components/Private/FormField",
  component: FormField,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof FormField>;
export default meta;

interface NativeFormFieldStoryArgs {
  name?: string;
}
type Story = StoryObj<NativeFormFieldStoryArgs>;

const BasicTemplate = (args: Story["args"]) => {
  return (
    <FormField name={args?.name ?? "name"}>
      {field => {
        return <InputText value={field.value} placeholder="Enter name here" />;
      }}
    </FormField>
  );
};

const WithValidationsTemplate = (args: Story["args"]) => {
  const methods = useForm({ mode: "onChange" });

  return (
    <FormProvider {...methods}>
      <FormField
        name={args?.name ?? "validations"}
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

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    name: "name",
  },
};

export const WithValidations: Story = {
  render: WithValidationsTemplate,
  args: {
    name: "validations",
  },
};
