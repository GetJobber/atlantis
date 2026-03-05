import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react-vite";
import { Disclosure } from "@jobber/components/Disclosure";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";
import { Flex } from "@jobber/components/Flex";
import { Heading } from "@jobber/components/Heading";
import { Icon } from "@jobber/components/Icon";
import { Button } from "@jobber/components/Button";
import { Box } from "@jobber/components/Box";

export default {
  title: "Components/Layouts and Structure/Disclosure/Web",
  component: Disclosure,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as Meta<typeof Disclosure>;

const BasicTemplate: StoryFn<typeof Disclosure> = args => (
  <Disclosure {...args}>
    <Content>
      <Text>Here is some helpful information to level up your business:</Text>
      <Text>For every 2 team members you add, your profits will triple.</Text>
    </Content>
  </Disclosure>
);

const ControlledTemplate: StoryFn<typeof Disclosure> = args => {
  const [open, setOpen] = useState(false);

  return (
    <Content>
      <Box border={"base"} padding={"base"}>
        <Disclosure {...args} open={open} onToggle={setOpen}>
          <Content>
            <Text>
              The state of the disclosure can be controlled without needing to
              interact with the disclosure component directly.
            </Text>
            <Text>
              The state can also be controlled by the actual disclosure
              component with the onToggle prop.
            </Text>
            <Button label="Close from content" onClick={() => setOpen(false)} />
          </Content>
        </Disclosure>
      </Box>
      <Button label="Toggle Disclosure" onClick={() => setOpen(!open)} />
    </Content>
  );
};

export const Basic = {
  render: BasicTemplate,
  args: {
    title: "Advanced instructions",
  },
};
export const CustomTitle = {
  render: BasicTemplate,
  args: {
    title: (
      <Flex template={["shrink", "grow"]} gap="small">
        <Icon name="sparkles" />
        <Heading level={5} element="span">
          Jobber Pro Tips
        </Heading>
      </Flex>
    ),
  },
};
export const Controlled = {
  render: ControlledTemplate,
  args: {
    title: "Controlled Disclosure",
  },
};
