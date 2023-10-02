import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";
import { Flex } from "@jobber/components/Flex";
import { Heading } from "@jobber/components/Heading";
import { Link } from "@jobber/components/Link";
import { Text } from "@jobber/components/Text";
import { Grid } from "@jobber/components/Grid";

export default {
  title: "Components/Layouts and Structure/Flex/Web",
  component: Flex,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Flex>;

const BasicTemplate: ComponentStory<typeof Flex> = args => (
  <Grid>
    <Grid.Cell
      size={{
        md: 4,
        lg: 3,
        xl: 2,
      }}
    >
      <Content>
        <Flex {...args}>
          <Heading level={2}>Job insights</Heading>
          <Button
            label="Feedback"
            onClick={() => {
              console.log("clicked");
            }}
            type="tertiary"
            variation="subtle"
            size="small"
          />
        </Flex>
        <Flex {...args} justify="space-between">
          <Heading level={3}>One-off job projections</Heading>
          <Link url="#" external>
            View report
          </Link>
        </Flex>
        <Flex {...args}>
          <Content spacing="small">
            <Heading level={4}>Job revenue</Heading>
            <Heading level={3}>$5,782</Heading>
            <Text variation="subdued" size="small">
              vs $5,012 past 30 days
            </Text>
          </Content>
          <Content spacing="small">
            <Heading level={4}>Jobs scheduled</Heading>
            <Heading level={3}>37</Heading>
            <Text variation="subdued" size="small">
              vs 42 past 30 days
            </Text>
          </Content>
        </Flex>
      </Content>
    </Grid.Cell>
  </Grid>
);

export const Basic = BasicTemplate.bind({});
