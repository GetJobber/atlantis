import React from "react";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import {
  ActionItem,
  ActionItemGroup,
  Card,
  Content,
  Text,
  Typography,
} from "@jobber/components-native";

const meta = {
  title: "Components/Layouts and Structure/ActionItemGroup",
  component: ActionItemGroup,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    backgrounds: {
      default: "surface background",
    },
  },
} satisfies Meta<typeof ActionItemGroup>;
export default meta;
type Story = StoryObj<
  Omit<React.ComponentProps<typeof ActionItemGroup>, "children"> & {
    children?: React.ReactNode;
  }
>;

const BasicTemplate = () => {
  return (
    <ActionItemGroup>
      <Card>
        <ActionItem
          title={"Request #13"}
          icon={"request"}
          onPress={() => alert("request")}
        />
        <ActionItem
          title={"Quote #64"}
          icon={"quote"}
          onPress={() => alert("quote")}
        />
        <ActionItem
          title={"Job #12"}
          icon={"job"}
          onPress={() => alert("job")}
        />
        <ActionItem
          title={"Invoice #72"}
          icon={"invoice"}
          onPress={() => alert("invoice")}
        >
          <Text>$250.00</Text>
        </ActionItem>
      </Card>
    </ActionItemGroup>
  );
};

const MixedComponentsTemplate = () => {
  return (
    <Card>
      <ActionItemGroup>
        <ActionItem
          title={"Stephen Campbell"}
          icon={"person"}
          onPress={() => alert("client")}
        />
        <Content>
          <Typography fontFamily="display">Client name</Typography>
          <Text>Stephen Campbell</Text>
          <Typography fontFamily="display">Client type</Typography>
          <Text>Residential</Text>
        </Content>
        <ActionItem
          title={"Request #13"}
          icon={"request"}
          onPress={() => alert("request")}
        />
        <ActionItem
          title={"Quote #64"}
          icon={"quote"}
          onPress={() => alert("quote")}
        />
        <ActionItem
          title={"Job #12"}
          icon={"job"}
          onPress={() => alert("job")}
        />
        <ActionItem
          title={"Invoice #72"}
          icon={"invoice"}
          onPress={() => alert("invoice")}
        >
          <Text>$250.00</Text>
        </ActionItem>
      </ActionItemGroup>
    </Card>
  );
};

export const Basic: Story = {
  render: BasicTemplate,
};

export const MixedComponents: Story = {
  render: MixedComponentsTemplate,
};
