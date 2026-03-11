import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid } from "@jobber/components/Grid";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import { Card } from "@jobber/components/Card";
import { DescriptionList } from "@jobber/components/DescriptionList";
import { Stack } from "@jobber/components/Stack";

const meta = {
  title: "Components/Layouts and Structure/Grid",
  component: Grid,
} satisfies Meta<typeof Grid>;
export default meta;
type Story = StoryObj<
  Pick<React.ComponentProps<typeof Grid>, "gap" | "alignItems">
>;

const BasicTemplate = (args: Story["args"]) => (
  <Grid gap={args?.gap} alignItems={args?.alignItems}>
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

const ThreeColumnsTemplate = (args: Story["args"]) => (
  <Content spacing="large">
    <Grid gap={args?.gap} alignItems={args?.alignItems}>
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

const SpacingTemplate = () => (
  <Stack gap="large">
    <div>
      <Text variation="subdued">gap=true (default)</Text>
      <Grid gap={true}>
        <Grid.Cell size={{ xs: 6 }}>
          <Card>
            <Content>
              <Text>Column 1</Text>
            </Content>
          </Card>
        </Grid.Cell>
        <Grid.Cell size={{ xs: 6 }}>
          <Card>
            <Content>
              <Text>Column 2</Text>
            </Content>
          </Card>
        </Grid.Cell>
      </Grid>
    </div>

    <div>
      <Text variation="subdued">gap=&quot;base&quot;</Text>
      <Grid gap="base">
        <Grid.Cell size={{ xs: 6 }}>
          <Card>
            <Content>
              <Text>Column 1</Text>
            </Content>
          </Card>
        </Grid.Cell>
        <Grid.Cell size={{ xs: 6 }}>
          <Card>
            <Content>
              <Text>Column 2</Text>
            </Content>
          </Card>
        </Grid.Cell>
      </Grid>
    </div>

    <div>
      <Text variation="subdued">gap=large</Text>
      <Grid gap="large">
        <Grid.Cell size={{ xs: 6 }}>
          <Card>
            <Content>
              <Text>Column 1</Text>
            </Content>
          </Card>
        </Grid.Cell>
        <Grid.Cell size={{ xs: 6 }}>
          <Card>
            <Content>
              <Text>Column 2</Text>
            </Content>
          </Card>
        </Grid.Cell>
      </Grid>
    </div>

    <div>
      <Text variation="subdued">gap=false</Text>
      <Grid gap={false}>
        <Grid.Cell size={{ xs: 6 }}>
          <Card>
            <Content>
              <Text>Column 1</Text>
            </Content>
          </Card>
        </Grid.Cell>
        <Grid.Cell size={{ xs: 6 }}>
          <Card>
            <Content>
              <Text>Column 2</Text>
            </Content>
          </Card>
        </Grid.Cell>
      </Grid>
    </div>
  </Stack>
);

export const Spacing: Story = {
  render: SpacingTemplate,
};

export const ThreeColumns: Story = {
  render: ThreeColumnsTemplate,
  args: {
    gap: true,
  },
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    gap: true,
    alignItems: "start",
  },
};
