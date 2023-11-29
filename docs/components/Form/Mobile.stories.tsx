import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Content, Form, InputText } from "@jobber/components-native";

export default {
  title: "Components/Forms and Inputs/Form/Mobile",
  component: Form,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} as ComponentMeta<typeof Form>;

const BasicTemplate: ComponentStory<typeof Form> = args => (
  <Form {...args}>
    <Content>
      <InputText
        name="firstName"
        placeholder="First name"
        validations={{ required: "Please add a first name" }}
      />
      <InputText
        name="lastName"
        placeholder="Last name"
        validations={{ required: "Please add a last name" }}
      />
      <InputText
        name="nickName"
        placeholder="Nick name"
        validations={{ required: "Please add a nick name" }}
      />
    </Content>
  </Form>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  initialValues: {
    firstName: "Greatest",
    lastName: "Ever",
    nickName: "",
  },
  onSubmit: value =>
    new Promise(resolve => {
      setTimeout(() => resolve(alert(JSON.stringify(value, undefined))), 1000);
    }),
};

export const WithSecondaryActions = BasicTemplate.bind({});
WithSecondaryActions.args = {
  initialValues: {
    firstName: "Test",
    lastName: "Secondary",
    nickName: "Actions!",
  },
  onSubmit: value =>
    new Promise(resolve => {
      setTimeout(() => resolve(alert(JSON.stringify(value, undefined))), 1000);
    }),
  secondaryActions: [
    {
      label: "Base",
      handleAction: {
        onSubmit: () =>
          new Promise(resolve => {
            setTimeout(() => resolve(alert("Base Case")), 1000);
          }),
      },
      icon: "email",
    },
    {
      label: "Destructive Delete",
      handleAction: {
        onSubmit: () =>
          new Promise(resolve => {
            setTimeout(() => resolve(alert("Base Case")), 1000);
          }),
      },
      icon: "trash",
      destructive: true,
    },
  ],
};
