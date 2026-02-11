import { Box, Button, Heading, Stack, Tooltip } from "@jobber/components";

export const VisualTestTooltipPage = () => {
  return (
    <div style={{ paddingLeft: "200px", maxWidth: "500px" }}>
      <Stack gap="extravagant">
        <Heading level={1}>Tooltip Examples</Heading>

        <Stack gap="large">
          <Heading level={2}>Basic</Heading>
          <div>
            <Tooltip message="This is a basic tooltip">
              <Button label="Hover me" />
            </Tooltip>
          </div>

          <Heading level={2}>Positions</Heading>
          <Stack gap="base">
            <Tooltip message="Top tooltip" preferredPlacement="top">
              <Button label="Top" />
            </Tooltip>
            <Tooltip message="Bottom tooltip" preferredPlacement="bottom">
              <Button label="Bottom" />
            </Tooltip>
            <Tooltip message="Left tooltip" preferredPlacement="left">
              <Button label="Left" />
            </Tooltip>
            <Tooltip message="Right tooltip" preferredPlacement="right">
              <Button label="Right" />
            </Tooltip>
          </Stack>

          <Heading level={2}>Long message</Heading>
          <Tooltip message="This is a very long tooltip message that demonstrates how the component handles text wrapping for longer content that might span multiple lines.">
            <Button label="Long Message" />
          </Tooltip>

          <Heading level={2}>Offscreen and within scrollable container</Heading>
          <div
            data-testid="scrollable-container"
            style={{
              height: "100px",
              overflow: "scroll",
              border: "1px solid",
              marginBottom: "100px",
            }}
          >
            <Box padding="large" />
            <Box padding="large" />
            <Box padding="large" />
            <Tooltip message="Offscreen tooltip">
              <Button label="Offscreen" />
            </Tooltip>
          </div>
        </Stack>
      </Stack>
    </div>
  );
};
