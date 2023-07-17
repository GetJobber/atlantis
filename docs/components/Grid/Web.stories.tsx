import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Grid } from "@jobber/components/Grid";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import { Card } from "@jobber/components/Card";
import { DescriptionList } from "@jobber/components/DescriptionList";

export default {
  title: "Components/Layouts and Structure/Grid/Web",
  component: Grid,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Grid>;

const BasicTemplate: ComponentStory<typeof Grid> = args => (
  <Grid {...args}>
    <Grid.Cell size={{ xs: 12, sm: 6, md: 7, lg: 7, xl: 6 }}>
      <Content>
        <Heading level={1}>Welcome to Atlantis!</Heading>
        <Text size="large">
          Atlantis is a design system for Jobber. The primary objective for
          Atlantis is to provide a system of reusable components to help
          developers to quickly build beautiful and consistent interfaces for
          our users.
        </Text>
      </Content>
    </Grid.Cell>
    <Grid.Cell size={{ xs: 12, sm: 6, md: 5, lg: 5, xl: 6 }}>
      <div style={{ display: "flex", height: "100%" }}>
        <Card>
          <Content>
            <DescriptionList
              data={[
                ["Status", "Amazing"],
                ["Emoji", "🔱"],
                ["Components", "A lot!"],
              ]}
            />
          </Content>
        </Card>
      </div>
    </Grid.Cell>
  </Grid>
);

const ThreeColumnsTemplate: ComponentStory<typeof Grid> = args => (
  <Content spacing="large">
    <Grid {...args}>
      <Grid.Cell
        size={{
          xs: 12,
          md: 6,
        }}
      >
        <Card>
          <Content>
            <Text>Column 1</Text>
          </Content>
        </Card>
      </Grid.Cell>
      <Grid.Cell
        size={{
          xs: 12,
          md: 3,
        }}
      >
        <Card>
          <Content>
            <Text>Column 2</Text>
          </Content>
        </Card>
      </Grid.Cell>
      <Grid.Cell
        size={{
          xs: 12,
          md: 3,
        }}
      >
        <Card>
          <Content>
            <Text>Column 3</Text>
          </Content>
        </Card>
      </Grid.Cell>
    </Grid>
  </Content>
);

export const ThreeColumns = ThreeColumnsTemplate.bind({});
ThreeColumns.args = {
  gap: true,
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  gap: true,
  alignItems: "start",
};
