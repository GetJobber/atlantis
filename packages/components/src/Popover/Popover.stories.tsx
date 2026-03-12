import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AtlantisThemeContextProvider,
  useAtlantisTheme,
} from "@jobber/components/AtlantisThemeContext";
import { Content } from "@jobber/components/Content";
import { Popover } from "@jobber/components/Popover";
import { Button } from "@jobber/components/Button";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import { Box } from "@jobber/components/Box";

const meta = {
  title: "Components/Overlays/Popover",
  component: Popover,
} satisfies Meta<typeof Popover>;
export default meta;
type Story = StoryObj<
  Pick<React.ComponentProps<typeof Popover>, "open" | "preferredPlacement">
>;

const BasicTemplate = (args: Story["args"]) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [showPopover, setShowPopover] = useState(args?.open ?? false);

  return (
    <>
      <div
        ref={divRef}
        style={{ display: "inline-block", width: "fit-content" }}
      >
        <Button
          label="Toggle Popover"
          onClick={() => setShowPopover(!showPopover)}
        />
      </div>
      <Popover
        attachTo={divRef}
        open={showPopover}
        preferredPlacement={args?.preferredPlacement}
        onRequestClose={() => setShowPopover(false)}
      >
        <Content>Here is your first Popover</Content>
      </Popover>
    </>
  );
};

export const Basic: Story = {
  render: BasicTemplate,
};

const InformationalTemplate = (args: Story["args"]) => {
  const newFeatureButton = useRef<HTMLDivElement>(null);
  const [showPopover, setShowPopover] = useState(true);

  return (
    <>
      <div
        ref={newFeatureButton}
        style={{ display: "inline-block", width: "fit-content" }}
      >
        <Button
          label="New Feature"
          onClick={() => setShowPopover(!showPopover)}
        />
      </div>
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

export const Informational: Story = {
  render: InformationalTemplate,
};

const ComposedTemplate = (args: Story["args"]) => {
  const divRef1 = useRef<HTMLDivElement>(null);
  const divRef2 = useRef<HTMLDivElement>(null);
  const divRef3 = useRef<HTMLDivElement>(null);
  const [showPopover1, setShowPopover1] = useState(args?.open ?? false);
  const [showPopover2, setShowPopover2] = useState(args?.open ?? false);
  const [showPopover3, setShowPopover3] = useState(args?.open ?? false);
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
        <Popover.Provider
          preferredPlacement={args?.preferredPlacement}
          attachTo={divRef1}
          open={showPopover1}
        >
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
        <Popover.Provider
          preferredPlacement={args?.preferredPlacement}
          attachTo={divRef2}
          open={showPopover2}
        >
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
        <Popover.Provider
          preferredPlacement={args?.preferredPlacement}
          attachTo={divRef3}
          open={showPopover3}
        >
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

export const Composed: Story = {
  render: ComposedTemplate,
};

const ForceInverseThemeTemplate = (args: Story["args"]) => {
  const divRef1 = useRef<HTMLDivElement>(null);
  const [showPopover1, setShowPopover1] = useState(args?.open ?? false);
  const buttonStyles = { width: "fit-content" };
  const { theme } = useAtlantisTheme();

  return (
    <Box gap="base">
      <Heading level={2}>Force theme of popover content</Heading>
      <div ref={divRef1} style={buttonStyles}>
        <Button
          label="Toggle Popover"
          onClick={() => setShowPopover1(!showPopover1)}
        />
      </div>
      <AtlantisThemeContextProvider
        dangerouslyOverrideTheme={theme === "dark" ? "light" : "dark"}
      >
        <Popover.Provider
          preferredPlacement={args?.preferredPlacement}
          attachTo={divRef1}
          open={showPopover1}
        >
          <Popover.DismissButton onClick={() => setShowPopover1(false)} />
          <Content>
            <Heading level={3}>Inverse Theme</Heading>
            <Text>This is a Popover built with composable subcomponents</Text>
          </Content>
          <Popover.Arrow />
        </Popover.Provider>
      </AtlantisThemeContextProvider>
    </Box>
  );
};

export const ForceInverseTheme: Story = {
  render: ForceInverseThemeTemplate,
};
