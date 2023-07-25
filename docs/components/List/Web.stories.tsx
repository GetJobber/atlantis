import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { List } from "@jobber/components/List";
import { Card } from "@jobber/components/Card";

export default {
  title: "Components/Lists and Tables/List/Web",
  component: List,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof List>;

const BasicTemplate: ComponentStory<typeof List> = args => (
  <Card>
    <List {...args} />
  </Card>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  items: [
    {
      id: 1,
      icon: "wallet",
      iconColor: "orange",
      content: "Payment for Invoice #39",
      value: "-$300.00",
      caption: "Sep 25, 2019",
      onClick: () => alert("TODO: Implement onClick"),
    },
    {
      id: 3,
      icon: "paidInvoice",
      content: "Invoice #39",
      value: "$300.00",
      caption: "Sep 24, 2019",
      onClick: () => alert("TODO: Implement onClick"),
    },
  ],
};

export const SectionedListItems = BasicTemplate.bind({});
SectionedListItems.args = {
  items: [
    {
      id: 1,
      icon: "addNote",
      title: "Darryl Tec added a note",
      content: [
        "_'Called the client. Asked if they want the luxury package, they said yes!'_",
        "Deck Build",
      ],
      caption: "1 minute ago",
      section: "Today",
      isActive: true,
      onClick: () => alert("TODO: Implement onClick"),
    },
    {
      id: 2,
      icon: "checkmark",
      iconColor: "green",
      title: "Josh Elford completed a visit",
      content: "Annual Maintenance",
      caption: "2 hours ago",
      section: "Today",
      onClick: () => alert("TODO: Implement onClick"),
    },
    {
      id: 3,
      icon: "badInvoice",
      title: "Payment failed",
      content: "For services rendered",
      value: "$300.00",
      caption: "1 day ago",
      onClick: () => alert("TODO: Implement onClick"),
      section: "Yesterday",
    },
  ],
};
