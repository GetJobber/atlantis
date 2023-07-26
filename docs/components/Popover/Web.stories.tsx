import React, { useRef, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Content } from "@jobber/components/Content";
import { Popover } from "@jobber/components/Popover";
import { Button } from "@jobber/components/Button";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";

export default {
  title: "Components/Overlays/Popover/Web",
  component: Popover,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Popover>;

const BasicTemplate: ComponentStory<typeof Popover> = args => {
  const divRef = useRef<HTMLSpanElement>(null);
  const [showPopover, setShowPopover] = useState(args.open);
  return (
    <>
      <span ref={divRef}>
        <Button
          label="Toggle Popover"
          onClick={() => setShowPopover(!showPopover)}
        />
      </span>
      <Popover
        {...args}
        attachTo={divRef}
        open={showPopover}
        onRequestClose={() => setShowPopover(false)}
      >
        <Content>Here is your first Popover</Content>
      </Popover>
    </>
  );
};

export const Basic = BasicTemplate.bind({});

const InformationalTemplate: ComponentStory<typeof Popover> = args => {
  const newFeatureButton = useRef<HTMLSpanElement>(null);
  const [showPopover, setShowPopover] = useState(true);
  return (
    <>
      <span ref={newFeatureButton}>
        <Button
          label="New Feature"
          onClick={() => setShowPopover(!showPopover)}
        />
      </span>
      <Popover
        {...args}
        attachTo={newFeatureButton}
        open={showPopover}
        preferredPlacement="right"
        onRequestClose={() => setShowPopover(false)}
      >
        <Content>
          <Heading level={2}>New feature!</Heading>
          <Text>
            You can now press a button that you could not before. This is
            important!
          </Text>
          <Button
            label="Got it"
            variation="learning"
            onClick={() => setShowPopover(!showPopover)}
          />
        </Content>
      </Popover>
    </>
  );
};

export const Informational = InformationalTemplate.bind({});
