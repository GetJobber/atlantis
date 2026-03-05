import React from "react";
import { View } from "react-native";
import type { Meta, StoryFn } from "@storybook/react-native-web-vite";
import { Chip } from "@jobber/components-native";

export default {
  title: "Components/Selections/Chip/Mobile",
  component: Chip,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof Chip>;

const BasicTemplate: StoryFn<typeof Chip> = args => (
  <View style={{ display: "flex", flexDirection: "row" }}>
    <Chip {...args} />
  </View>
);

export const Basic = {
  render: BasicTemplate,
  args: {
    label: "Active chip",
    onPress: () => console.log("hi!"),
    accessibilityLabel: "Active chip",
    isActive: true,
  },
};
const AccentTemplate: StoryFn<typeof Chip> = args => (
  <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
    <Chip {...args} />
    <Chip
      label="Select requests"
      accent="request"
      icon="request"
      onPress={() => console.log("Requests")}
      accessibilityLabel={"Select Requests"}
      isActive={true}
    />
    <Chip
      label="Select quotes"
      accent="quote"
      icon="quote"
      onPress={() => console.log("Quotes")}
      accessibilityLabel={"Select Quotes"}
      isActive={true}
    />
    <Chip
      label="Select jobs"
      accent="job"
      icon="job"
      onPress={() => console.log("Jobs")}
      accessibilityLabel={"Select Jobs"}
      isActive={true}
    />
    <Chip
      label="Select invoices"
      accent="invoice"
      icon="invoice"
      onPress={() => console.log("Invoices")}
      accessibilityLabel={"Select Invoices"}
      isActive={true}
    />
  </View>
);

export const Accent = {
  render: AccentTemplate,
  args: {
    label: "Select clients",
    accent: "client",
    icon: "clients",
    onPress: () => console.log("Clients"),
    accessibilityLabel: "Select clients",
    isActive: true,
  },
};
export const Dismissable = {
  render: BasicTemplate,
  args: {
    label: "Test Chip",
    accent: "client",
    icon: "clients",
    onPress: () => console.log("Clients"),
    accessibilityLabel: "Select clients",
    isDismissible: true,
  },
};
export const InactiveBackgroundColor = {
  render: BasicTemplate,
  args: {
    label: "Inactive Chip",
    accent: "client",
    icon: "clients",
    onPress: () => console.log("Clients"),
    accessibilityLabel: "Select clients",
    inactiveBackgroundColor: "surface",
  },
};
