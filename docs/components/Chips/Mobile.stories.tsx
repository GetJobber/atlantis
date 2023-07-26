import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { View } from "react-native";
import { Chip } from "@jobber/components-native";

export default {
  title: "Components/Selections/Chips/Mobile",
  component: Chip,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} as ComponentMeta<typeof Chip>;

const BasicTemplate: ComponentStory<typeof Chip> = args => (
  <>
    <View style={{ display: "flex", flexDirection: "row" }}>
      <Chip {...args} />
    </View>
  </>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  label: "Active chip",
  onPress: () => alert("hi!"),
  accessibilityLabel: "Active chip",
  isActive: true,
};

const AccentTemplate: ComponentStory<typeof Chip> = args => (
  <>
    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      <Chip {...args} />
      <Chip
        label="Select requests"
        accent="request"
        icon="request"
        onPress={() => alert("Requests")}
        accessibilityLabel={"Select Requests"}
        isActive={true}
      />
      <Chip
        label="Select quotes"
        accent="quote"
        icon="quote"
        onPress={() => alert("Quotes")}
        accessibilityLabel={"Select Quotes"}
        isActive={true}
      />
      <Chip
        label="Select jobs"
        accent="job"
        icon="job"
        onPress={() => alert("Jobs")}
        accessibilityLabel={"Select Jobs"}
        isActive={true}
      />
      <Chip
        label="Select invoices"
        accent="invoice"
        icon="invoice"
        onPress={() => alert("Invoices")}
        accessibilityLabel={"Select Invoices"}
        isActive={true}
      />
    </View>
  </>
);

export const Accent = AccentTemplate.bind({});
Accent.args = {
  label: "Select clients",
  accent: "client",
  icon: "clients",
  onPress: () => alert("Clients"),
  accessibilityLabel: "Select clients",
  isActive: true,
};

export const Dismissable = BasicTemplate.bind({});
Dismissable.args = {
  label: "Test Chip",
  accent: "client",
  icon: "clients",
  onPress: () => alert("Clients"),
  accessibilityLabel: "Select clients",
  isDismissible: true,
};

export const InactiveBackgroundColor = BasicTemplate.bind({});
InactiveBackgroundColor.args = {
  label: "Inactive Chip",
  accent: "client",
  icon: "clients",
  onPress: () => alert("Clients"),
  accessibilityLabel: "Select clients",
  isDismissible: true,
  inactiveBackgroundColor: "surface",
};
