import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SideDrawer } from "@jobber/components/SideDrawer";
import { Button } from "@jobber/components/Button";

export default {
  title: "Components/Layouts and Structure/SideDrawer/Web",
  component: SideDrawer,
  parameters: {
    viewMode: "story",
  },
} as ComponentMeta<typeof SideDrawer>;

const BasicTemplate: ComponentStory<typeof SideDrawer> = args => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(args.open);

  return (
    <>
      <Button
        onClick={() => setSideDrawerOpen(true)}
        label="Open Side Drawer"
      />
      <SideDrawer
        open={sideDrawerOpen}
        onRequestClose={() => setSideDrawerOpen(false)}
      >
        <SideDrawer.Title>Title</SideDrawer.Title>
      </SideDrawer>
    </>
  );
};

export const Basic = BasicTemplate.bind({});
Basic.args = {
  open: true,
};
