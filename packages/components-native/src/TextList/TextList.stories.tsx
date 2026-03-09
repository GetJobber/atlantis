import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { TextList } from "@jobber/components-native";

const meta = {
  title: "Components/Lists and Tables/TextList",
  component: TextList,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof TextList>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    items: ["Item uno", "Item dos", "Item tres"],
  },
};

export const Levels: Story = {
  args: {
    items: [
      "This is the first item",
      "This is the second item",
      "This is the third item",
    ],
    level: "textSupporting",
  },
};

export const Emphasis: Story = {
  args: {
    items: [
      "This is the first item",
      "This is the second item",
      "This is the third item",
    ],
    emphasis: "strong",
  },
};

export const Spacing: Story = {
  args: {
    items: [
      "This is the first item",
      "This is the second item",
      "This is the third item",
    ],
    spacing: "large",
  },
};

export const ChildSpacing: Story = {
  args: {
    items: [
      "This is the first item",
      "This is the second item",
      "This is the third item",
    ],
    childSpacing: "large",
  },
};
