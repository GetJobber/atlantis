import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";
import { Heading } from "@jobber/components/Heading";
import { InputText } from "@jobber/components/InputText";
import { Card } from "@jobber/components/Card";

const meta = {
  title: "Components/Layouts and Structure/Content",
  component: Content,
  argTypes: {
    children: { control: false, table: { disable: true } },
  },
  parameters: {
    backgrounds: {
      default: "surface background",
    },
  },
} satisfies Meta<typeof Content>;
export default meta;

interface ContentStoryArgs {
  spacing?: React.ComponentProps<typeof Content>["spacing"];
  type?: React.ComponentProps<typeof Content>["type"];
}

type Story = StoryObj<ContentStoryArgs>;

const BasicTemplate = (args: Story["args"]) => (
  <Content spacing={args?.spacing} type={args?.type}>
    <Card title="About me">
      <Content spacing={args?.spacing} type={args?.type}>
        <Heading level={2}>Sign up!</Heading>
        <Text>
          Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
          vestibulum. Nulla vitae elit libero, a pharetra augue. Nullam quis
          risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta
          felis euismod semper. Curabitur blandit tempus porttitor.
        </Text>
        <InputText placeholder="Name" />
        <InputText placeholder="Phone" />
        <InputText placeholder="Email" />
        <InputText
          multiline={true}
          placeholder="Describe yourself"
          name="describeAge"
        />
      </Content>
    </Card>
  </Content>
);

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    spacing: "small",
  },
};
