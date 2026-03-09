import React from "react";
import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Chip } from "@jobber/components-native";

const meta = {
  title: "Components/Selections/Chip",
  component: Chip,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof Chip>;
export default meta;
type Story = StoryObj<typeof meta>;

const BasicTemplate = (args: Story["args"]) => (
  <View style={{ display: "flex", flexDirection: "row" }}>
    <Chip {...args} />
  </View>
);

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    label: "Active chip",
    onPress: () => alert("hi!"),
    accessibilityLabel: "Active chip",
    isActive: true,
  },
};

const AccentTemplate = (args: Story["args"]) => (
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
);

export const Accent: Story = {
  render: AccentTemplate,
  args: {
    label: "Select clients",
    accent: "client",
    icon: "clients",
    onPress: () => alert("Clients"),
    accessibilityLabel: "Select clients",
    isActive: true,
  },
};

export const Dismissable: Story = {
  render: BasicTemplate,
  args: {
    label: "Test Chip",
    accent: "client",
    icon: "clients",
    onPress: () => alert("Clients"),
    accessibilityLabel: "Select clients",
    isDismissible: true,
  },
};

export const InactiveBackgroundColor: Story = {
  render: BasicTemplate,
  args: {
    label: "Inactive Chip",
    accent: "client",
    icon: "clients",
    onPress: () => alert("Clients"),
    accessibilityLabel: "Select clients",
    inactiveBackgroundColor: "surface",
  },
};
