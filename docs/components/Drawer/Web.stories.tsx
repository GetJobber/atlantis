import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Drawer, DrawerGrid } from "@jobber/components/Drawer";
import { Page } from "@jobber/components/Page";
import { Content } from "@jobber/components/Content";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";

export default {
  title: "Components/Layouts and Structure/Drawer/Web",
  component: Drawer,
  parameters: {
    viewMode: "story",
    previewTabs: {
      code: {
        hidden: false,
        extraImports: {
          "@jobber/components/Drawer": ["DrawerGrid"],
        },
      },
    },
  },
} as ComponentMeta<typeof Drawer>;

const BasicTemplate: ComponentStory<typeof Drawer> = args => {
  const [drawerOpen, setDrawerOpen] = useState(args.open);
  return (
    <DrawerGrid>
      <Page title="Page" width="fill" intro="">
        <Content>
          <Button
            label="Toggle Drawer"
            ariaControls={args.id}
            onClick={() => setDrawerOpen(!drawerOpen)}
          />
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Content>
      </Page>
      <Drawer
        {...args}
        open={drawerOpen}
        onRequestClose={() => setDrawerOpen(!drawerOpen)}
      >
        <Content>
          <Text>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?
          </Text>
        </Content>
      </Drawer>
    </DrawerGrid>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  id: "drawer-element",
  title: "Drawer",
  open: true,
};
