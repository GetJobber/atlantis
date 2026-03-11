import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { AutoLink } from "@jobber/components-native";

const meta = {
  title: "Components/Text and Typography/AutoLink",
  component: AutoLink,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
} satisfies Meta<typeof AutoLink>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children:
      "I am a test with a link to getjobber.com! Call me at 902-555-5555 or email me at test@example.com",
  },
};

export const SkipPhoneNumber: Story = {
  args: {
    phone: false,
    children:
      "Ignoring phone numbers like 902-555-5555 but still linking getjobber.com!",
  },
};
