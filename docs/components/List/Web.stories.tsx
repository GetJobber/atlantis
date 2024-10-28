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
import { Icon } from "@jobber/components/Icon";
import { FileUpload } from "@jobber/components/InputFile";
import { FormatFile } from "@jobber/components/FormatFile";

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

const itemCSS = `
  li:not(:last-child) .my-item {
    border-bottom: var(--border-base) solid var(--color-border);
  }

  .my-item {
    padding: var(--space-small);
    display: flex;
    align-items: center;
    gap: var(--space-small);
  }
`;

function RenderServiceProviderList({
  listItem,
}: {
  readonly listItem: SPListItemProps;
}) {
  return (
    <div className="my-item">
      <style>{itemCSS}</style>
      <Avatar imageUrl={listItem.avatarUrl} />
      <Heading level={4}>{listItem.name}</Heading>
      <div style={{ marginLeft: "auto" }}>
        <Icon name="arrowRight" size="base" color="interactive" />
      </div>
    </div>
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

const sectionedCSS = `
  .product-list-item {
    display: flex;
    justify-content: flex-start;
    text-align: left;
    padding: var(--space-small);
  }

  .product-list-item > * {
    padding: var(--space-small);
  }

  li > ul > li:not(:last-child) .product-list-item {
    border-bottom: var(--border-base) solid var(--color-border);
  }
`;

function RenderProductList({
  listItem,
}: {
  readonly listItem: ProductListItemProps;
}) {
  return (
    <div className="product-list-item">
      <style>{sectionedCSS}</style>
      <FormatFile file={listItem.image} display="compact" displaySize="base" />
      <Flex template={["grow"]}>
        <Heading level={4}>{listItem.name}</Heading>
        <Flex template={["grow", "shrink"]} align="start">
          <Text>{listItem.description}</Text>
          <Text>{listItem.price}</Text>
        </Flex>
      </Flex>
    </div>
  );
}

export const SectionedListWithCustomRenderer = BasicTemplate.bind({});
SectionedListWithCustomRenderer.args = {
  items: productsList,
  customRenderItem: (item: ProductListItemProps) => (
    <RenderProductList listItem={item} />
  ),
};
