import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { IconButton } from "@jobber/components-native";

const meta = {
  title: "Components/Actions/IconButton",
  component: IconButton,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    accessibilityLabel: "New Job",
    name: "remove",
    onPress: () => alert("👍"),
  },
};
