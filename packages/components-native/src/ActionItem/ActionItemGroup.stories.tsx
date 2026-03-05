import React from "react";
import type { Meta } from "@storybook/react-native-web-vite";
import { Card, Content, Text, Typography } from "@jobber/components-native";
import { ActionItem } from "./ActionItem";
import { ActionItemGroup } from "./ActionItemGroup";

export default {
  title: "Components/Layouts and Structure/ActionItemGroup/Mobile",
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
    backgrounds: {
      default: "surface background",
    },
  },
} satisfies Meta<typeof ActionItemGroup>;

const BasicTemplate = () => {
  return (
    <ActionItemGroup>
      <Card>
        <ActionItem
          title={"Request #13"}
          icon={"request"}
          onPress={() => console.log("request")}
        />
        <ActionItem
          title={"Quote #64"}
          icon={"quote"}
          onPress={() => console.log("quote")}
        />
        <ActionItem
          title={"Job #12"}
          icon={"job"}
          onPress={() => console.log("job")}
        />
        <ActionItem
          title={"Invoice #72"}
          icon={"invoice"}
          onPress={() => console.log("invoice")}
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
          onPress={() => console.log("client")}
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
          onPress={() => console.log("request")}
        />
        <ActionItem
          title={"Quote #64"}
          icon={"quote"}
          onPress={() => console.log("quote")}
        />
        <ActionItem
          title={"Job #12"}
          icon={"job"}
          onPress={() => console.log("job")}
        />
        <ActionItem
          title={"Invoice #72"}
          icon={"invoice"}
          onPress={() => console.log("invoice")}
        >
          <Text>$250.00</Text>
        </ActionItem>
      </ActionItemGroup>
    </Card>
  );
};

export const Basic = {
  render: BasicTemplate,
};

export const MixedComponents = {
  render: MixedComponentsTemplate,
};
