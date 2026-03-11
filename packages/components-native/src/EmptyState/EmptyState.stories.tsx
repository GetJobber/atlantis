import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { EmptyState } from "@jobber/components-native";

const meta = {
  title: "Components/Status and Feedback/EmptyState",
  component: EmptyState,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof EmptyState>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    icon: "home",
    title: "Title",
    description: "Description",
    primaryAction: {
      label: "Click Me",
      onPress: () => {
        alert("👋");
      },
    },
    secondaryAction: {
      label: "Don't Forget About Me",
      onPress: () => {
        alert("👋");
      },
    },
  },
};
