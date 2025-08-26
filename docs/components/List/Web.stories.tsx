import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  BaseListItemProps,
  List,
  ListItem,
  ListItemProps,
} from "@jobber/components/List";
import { Card } from "@jobber/components/Card";
import { Text } from "@jobber/components/Text";
import { Flex } from "@jobber/components/Flex";
import { Avatar } from "@jobber/components/Avatar";
import { Heading } from "@jobber/components/Heading";
import { Icon, IconNames } from "@jobber/components/Icon";
import { FileUpload } from "@jobber/components/InputFile";
import { FormatFile } from "@jobber/components/FormatFile";
import { Box } from "@jobber/components/Box";
import { Tooltip } from "@jobber/components/Tooltip";

export default {
  title: "Components/Lists and Tables/List/Web",
  component: List,
  subcomponents: { ListItem },
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

const SimpleTemplate: ComponentStory<typeof List> = args => (
  <div style={{ width: "fit-content" }}>
    <Card>
      <div style={{ padding: "var(--space-small)" }}>
        <List {...args} />
      </div>
    </Card>
  </div>
);

export const Basic = BasicTemplate.bind({});
const basicItems: ListItemProps[] = [
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
];
Basic.args = { items: basicItems };

export const SectionedListItems = BasicTemplate.bind({});
const sectionedListItems: ListItemProps[] = [
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
];
SectionedListItems.args = { items: sectionedListItems };

interface SPListItemProps extends BaseListItemProps {
  readonly name: string;
  readonly avatarUrl: string;
  readonly onClick?: () => void;
}

const serviceProviderListItems: SPListItemProps[] = [
  {
    id: 1,
    name: "Rob Lane",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    onClick: () => alert("TODO: Implement onClick"),
  },
  {
    id: 2,
    name: "Marlene Hamilton",
    avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    onClick: () => alert("TODO: Implement onClick"),
  },
  {
    id: 3,
    name: "Miriam Graves",
    avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    onClick: () => alert("TODO: Implement onClick"),
  },
  {
    id: 4,
    name: "Milton Payne",
    avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    onClick: () => alert("TODO: Implement onClick"),
  },
  {
    id: 5,
    name: "Madison Simmons",
    avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    onClick: () => alert("TODO: Implement onClick"),
  },
];

function RenderServiceProviderList({
  listItem,
}: {
  readonly listItem: SPListItemProps;
}) {
  return (
    <Flex template={["shrink", "grow", "shrink"]} align="center">
      <Avatar imageUrl={listItem.avatarUrl} />
      <Heading level={4}>{listItem.name}</Heading>
      <Icon name="arrowRight" size="base" color="interactive" />
    </Flex>
  );
}

export const ListWithCustomRenderer = BasicTemplate.bind({});
ListWithCustomRenderer.args = {
  items: serviceProviderListItems,
  customRenderItem: (item: SPListItemProps) => (
    <RenderServiceProviderList listItem={item} />
  ),
};

interface ProductListItemProps extends BaseListItemProps {
  readonly name: string;
  readonly description: string;
  readonly image: FileUpload;
  readonly price: string;
  readonly section: string;
  readonly onClick?: () => void;
}

const imageFile: FileUpload = {
  key: "abc",
  name: "image_of_something.png",
  type: "image/png",
  size: 213402324,
  progress: 1,
  src: () => Promise.resolve("https://picsum.photos/250"),
};

const productsList: ProductListItemProps[] = [
  {
    id: 1,
    name: "Lawn Mower",
    description: "A reliable lawn mower for home or commercial use.",
    image: imageFile,
    price: "$250.00",
    section: "Products",
    onClick: () => alert("TODO: Implement onClick"),
  },
  {
    id: 2,
    name: "Hedge Trimmer",
    description: "Electric hedge trimmer for precise shaping.",
    image: imageFile,
    price: "$85.00",
    section: "Products",
    onClick: () => alert("TODO: Implement onClick"),
  },
  {
    id: 3,
    name: "Garden Fertilizer",
    description: "Premium fertilizer for healthy lawn growth.",
    image: imageFile,
    price: "$30.00",
    section: "Products",
    onClick: () => alert("TODO: Implement onClick"),
  },
  {
    id: 4,
    name: "Lawn Mowing Service",
    description: "Keep your lawn tidy with regular mowing.",
    image: imageFile,
    price: "$50.00",
    section: "Services",
    onClick: () => alert("TODO: Implement onClick"),
  },
  {
    id: 5,
    name: "Weed Control Service",
    description: "Prevent and eliminate unwanted weeds.",
    image: imageFile,
    price: "$40.00",
    section: "Services",
    onClick: () => alert("TODO: Implement onClick"),
  },
  {
    id: 6,
    name: "Hedge Trimming Service",
    description: "Shape your hedges to perfection.",
    image: imageFile,
    price: "$75.00",
    section: "Services",
    onClick: () => alert("TODO: Implement onClick"),
  },
];

function RenderProductList({
  listItem,
}: {
  readonly listItem: ProductListItemProps;
}) {
  return (
    <Flex template={["shrink", "grow"]} align="center">
      <FormatFile file={listItem.image} display="compact" displaySize="base" />
      <div style={{ marginBottom: "8px" }}>
        <Heading level={4}>{listItem.name}</Heading>
        <Flex template={["grow", "shrink"]} align="start">
          <Text>{listItem.description}</Text>
          <Text>{listItem.price}</Text>
        </Flex>
      </div>
    </Flex>
  );
}

export const SectionedListWithCustomItem = BasicTemplate.bind({});
SectionedListWithCustomItem.args = {
  items: productsList,
  customRenderItem: (item: ProductListItemProps) => (
    <RenderProductList listItem={item} />
  ),
};

export const SectionedListWithCustomSection = BasicTemplate.bind({});
SectionedListWithCustomSection.args = {
  items: sectionedListItems,
  customRenderSection: (sectionHeading: string) => (
    <RenderCustomSection sectionHeading={sectionHeading} />
  ),
};

function RenderCustomSection({
  sectionHeading,
}: {
  readonly sectionHeading: string;
}) {
  return (
    <Box direction="row" alignItems="center" gap="base">
      <Icon name="calendar" />
      <Heading level={3}>{sectionHeading}</Heading>
      <div style={{ marginLeft: "auto" }}>
        <Tooltip
          message="These are the items which occurred on this date"
          preferredPlacement="left"
        >
          <Icon name="help" />
        </Tooltip>
      </div>
    </Box>
  );
}

export const SimpleListWithCustomStyles = SimpleTemplate.bind({});
const simpleListItems: ListItemProps[] = [
  {
    id: 1,
    icon: "addNote",
    content: ["Add Note"],
    onClick: () => alert("TODO: Implement onClick"),
  },
  {
    id: 2,
    icon: "checkmark",
    iconColor: "green",
    content: "Approve",
    onClick: () => alert("TODO: Implement onClick"),
  },
  {
    id: 3,
    icon: "cog",
    content: "Settings",
    onClick: () => alert("TODO: Implement onClick"),
  },
];

interface SimpleListItemProps extends BaseListItemProps {
  readonly content: string;
  icon: IconNames;
}

SimpleListWithCustomStyles.args = {
  items: simpleListItems,
  customRenderItem: (item: SimpleListItemProps) => (
    <RenderSimpleItem listItem={item} />
  ),
  customItemStyles: true,
};

function RenderSimpleItem({
  listItem,
}: {
  readonly listItem: SimpleListItemProps;
}) {
  return (
    <div
      style={{
        borderRadius: "var(--radius-base)",
        padding: "var(--space-small)",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "var(--space-small)",
      }}
    >
      <Icon name={listItem.icon} />
      <Text>{listItem.content}</Text>
    </div>
  );
}
