import React, { useRef, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AtlantisThemeContextProvider } from "@jobber/components/AtlantisThemeContext";
import { Content } from "@jobber/components/Content";
import { Popover } from "@jobber/components/Popover";
import { Button } from "@jobber/components/Button";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import { Box } from "@jobber/components/Box";

export default {
  title: "Components/Overlays/Popover/Web",
  component: Popover,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
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

const ComposedTemplate: ComponentStory<typeof Popover> = args => {
  const divRef1 = useRef<HTMLDivElement>(null);
  const divRef2 = useRef<HTMLDivElement>(null);
  const divRef3 = useRef<HTMLDivElement>(null);
  const [showPopover1, setShowPopover1] = useState(args.open);
  const [showPopover2, setShowPopover2] = useState(args.open);
  const [showPopover3, setShowPopover3] = useState(args.open);
  const buttonStyles = { width: "fit-content" };

  return (
    <Box gap="larger">
      <Box gap="base">
        <Heading level={2}>Default style with subcomponents</Heading>
        <div ref={divRef1} style={buttonStyles}>
          <Button
            label="Toggle Popover"
            onClick={() => setShowPopover1(!showPopover1)}
          />
        </div>
        <Popover.Provider {...args} attachTo={divRef1} open={showPopover1}>
          <Popover.DismissButton onClick={() => setShowPopover1(false)} />

          <Content>
            This is a Popover built with composable subcomponents
          </Content>
          <Popover.Arrow />
        </Popover.Provider>
      </Box>

      <Box gap="base">
        <Heading level={2}>Without arrow and dismiss button</Heading>
        <div ref={divRef2} style={buttonStyles}>
          <Button
            label="Toggle Popover"
            onClick={() => setShowPopover2(!showPopover2)}
          />
        </div>
        <Popover.Provider {...args} attachTo={divRef2} open={showPopover2}>
          <Content>
            This is a Popover that excludes the arrow and dismiss button
          </Content>
        </Popover.Provider>
      </Box>

      <Box gap="base">
        <Heading level={2}>With custom dismiss button</Heading>
        <div ref={divRef3} style={buttonStyles}>
          <Button
            label="Toggle Popover"
            onClick={() => setShowPopover3(!showPopover3)}
          />
        </div>
        <Popover.Provider {...args} attachTo={divRef3} open={showPopover3}>
          <Popover.DismissButton>
            <Button onClick={() => setShowPopover3(false)} variation="subtle">
              <Button.Icon name="eyeCrossed" />
            </Button>
          </Popover.DismissButton>
          <Content>This is a Popover with a custom dismiss button</Content>
          <Popover.Arrow />
        </Popover.Provider>
      </Box>
    </Box>
  );
};

export const Composed = ComposedTemplate.bind({});

const ForceThemeTemplate: ComponentStory<typeof Popover> = args => {
  const divRef1 = useRef<HTMLDivElement>(null);
  const [showPopover1, setShowPopover1] = useState(args.open);
  const buttonStyles = { width: "fit-content" };

  return (
    <Box gap="base">
      <Heading level={2}>Force theme of popover content</Heading>
      <div ref={divRef1} style={buttonStyles}>
        <Button
          label="Toggle Popover"
          onClick={() => setShowPopover1(!showPopover1)}
        />
      </div>
      <AtlantisThemeContextProvider dangerouslyOverrideTheme="dark">
        <Popover.Provider {...args} attachTo={divRef1} open={showPopover1}>
          <Popover.DismissButton onClick={() => setShowPopover1(false)} />
          <Content>
            <Text>This is a Popover built with composable subcomponents</Text>
          </Content>
          <Popover.Arrow />
        </Popover.Provider>
      </AtlantisThemeContextProvider>
    </Box>
  );
};

export const ForceTheme = ForceThemeTemplate.bind({});
