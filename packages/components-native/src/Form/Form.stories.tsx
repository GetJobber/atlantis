import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Host } from "react-native-portalize";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Content, Form, InputText } from "@jobber/components-native";

const meta = {
  title: "Components/Forms and Inputs/Form",
  component: Form,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    showNativeOnWebDisclaimer: true,
  },
} satisfies Meta<typeof Form>;
export default meta;

interface NativeFormStoryArgs {
  initialValues?: {
    firstName: string;
    lastName: string;
    nickName: string;
  };
  secondaryActions?: React.ComponentProps<typeof Form>["secondaryActions"];
}
type Story = StoryObj<NativeFormStoryArgs>;

const BasicTemplate = (args: Story["args"]) => (
  <SafeAreaProvider>
    <Host>
      <Form
        initialValues={args?.initialValues}
        secondaryActions={args?.secondaryActions}
        onSubmit={value =>
          new Promise(resolve => {
            setTimeout(
              () => resolve(alert(JSON.stringify(value, undefined))),
              1000,
            );
          })
        }
        onSubmitError={() => undefined}
        onSubmitSuccess={() => undefined}
      >
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
    </Host>
  </SafeAreaProvider>
);

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    initialValues: {
      firstName: "Greatest",
      lastName: "Ever",
      nickName: "",
    },
  },
};

export const WithSecondaryActions: Story = {
  render: BasicTemplate,
  args: {
    initialValues: {
      firstName: "Test",
      lastName: "Secondary",
      nickName: "Actions!",
    },
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
  },
};
