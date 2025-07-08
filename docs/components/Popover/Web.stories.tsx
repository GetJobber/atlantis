import React, { useRef, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
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
import { Banner } from "@jobber/components/Banner";

export default {
  title: "Components/Overlays/Popover/Web",
  component: Popover,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Popover>;

const BasicTemplate: ComponentStory<typeof Popover> = args => {
  const divRef = useRef<HTMLDivElement>(null);
  const [showPopover, setShowPopover] = useState(args.open);

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

export const Informational = InformationalTemplate.bind({});

const MovingElementTemplate: ComponentStory<typeof Popover> = args => {
  const divRef = useRef<HTMLDivElement>(null);
  const [showPopover, setShowPopover] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const moveElement = (direction: "up" | "down" | "left" | "right") => {
    const newPosition = { ...position };

    switch (direction) {
      case "up":
        newPosition.y -= 50;
        break;
      case "down":
        newPosition.y += 50;
        break;
      case "left":
        newPosition.x -= 50;
        break;
      case "right":
        newPosition.x += 50;
        break;
    }
    setPosition(newPosition);
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <Box gap="large">
      <Box gap="base">
        <Heading level={2}>Moving attachTo Element</Heading>
        <Text>
          This demonstrates how the popover will reposition itself when the
          attachTo element moves.
        </Text>
        <Text>
          Click the buttons below to move the attached element around. The
          popover should follow it correctly.
        </Text>
        <Text>
          The popover should also shift, then flip when it reaches the edge of
          its container.
        </Text>
      </Box>

      <Box gap="small">
        <Button
          label="Add Banner (causing layout reflow)"
          onClick={() => setShowBanner(!showBanner)}
          variation="subtle"
        />
        <Button
          label="Move Up"
          onClick={() => moveElement("up")}
          variation="subtle"
        />
        <Button
          label="Move Down"
          onClick={() => moveElement("down")}
          variation="subtle"
        />
        <Button
          label="Move Left"
          onClick={() => moveElement("left")}
          variation="subtle"
        />
        <Button
          label="Move Right"
          onClick={() => moveElement("right")}
          variation="subtle"
        />
        <Button
          label="Reset Position"
          onClick={resetPosition}
          variation="subtle"
        />
      </Box>

      <div
        style={{
          position: "relative",
          minHeight: "300px",
          border: "2px dashed #ccc",
          padding: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        {showBanner && <Banner type="notice">Banner</Banner>}
        <div
          ref={divRef}
          style={{
            display: "inline-block",
            position: "relative",
            left: `${2 + position.x}px`,
            top: `${1 + position.y}px`,
            transition: "all 0.3s ease",
            zIndex: 1,
          }}
        >
          <Button
            label={showPopover ? "Close Popover" : "Open Popover"}
            onClick={() => setShowPopover(!showPopover)}
          />
        </div>
      </div>

      <Popover
        {...args}
        attachTo={divRef}
        open={showPopover}
        onRequestClose={() => setShowPopover(false)}
      >
        <Content>
          <Heading level={3}>Following Element</Heading>
          <Text>
            This popover should reposition itself and follow the attached button
            as it moves around the page.
          </Text>
          <Text>
            Current position: ({position.x}, {position.y})
          </Text>
        </Content>
      </Popover>
    </Box>
  );
};

export const MovingAttachToElement = MovingElementTemplate.bind({});

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

const ForceInverseThemeTemplate: ComponentStory<typeof Popover> = args => {
  const divRef1 = useRef<HTMLDivElement>(null);
  const [showPopover1, setShowPopover1] = useState(args.open);
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
        <Popover.Provider {...args} attachTo={divRef1} open={showPopover1}>
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

export const ForceInverseTheme = ForceInverseThemeTemplate.bind({});
