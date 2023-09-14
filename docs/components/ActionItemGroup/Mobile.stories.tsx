import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  ActionItem,
  ActionItemGroup,
  Card,
  Content,
  Text,
  Typography,
} from "@jobber/components-native";

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
} as ComponentMeta<typeof ActionItemGroup>;

const BasicTemplate: ComponentStory<typeof ActionItemGroup> = () => {
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

const MixedComponentsTemplate: ComponentStory<typeof ActionItemGroup> = () => {
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

export const Basic = BasicTemplate.bind({});

export const MixedComponents = MixedComponentsTemplate.bind({});
