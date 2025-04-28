import {
  Box,
  Button,
  Grid,
  Heading,
  Popover,
  Stack,
  Text,
} from "@jobber/components";
import { useRef, useState } from "react";

export const VisualTestPopoverPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const customButtonRef = useRef<HTMLDivElement>(null);

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={1}>Popover Examples</Heading>

        <Stack gap="large">
          {/* Basic Popover */}
          <section>
            <Text size="large">Basic Popover</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <div ref={buttonRef}>
                  <Button label="Click me" onClick={() => setIsOpen(true)} />
                </div>
                <Popover
                  attachTo={buttonRef}
                  open={isOpen}
                  onRequestClose={() => setIsOpen(false)}
                >
                  <Box padding="base">
                    <Text>This is a basic popover</Text>
                  </Box>
                </Popover>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Popover with Custom Placement */}
          <section>
            <Text size="large">Popover with Custom Placement</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <div ref={customButtonRef}>
                  <Button
                    label="Click me"
                    onClick={() => setIsCustomOpen(true)}
                  />
                </div>
                <Popover
                  attachTo={customButtonRef}
                  open={isCustomOpen}
                  onRequestClose={() => setIsCustomOpen(false)}
                  preferredPlacement="right"
                >
                  <Box padding="base">
                    <Stack gap="small">
                      <Text>This is a popover with custom placement</Text>
                      <Text>It appears on the right side</Text>
                    </Stack>
                  </Box>
                </Popover>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
