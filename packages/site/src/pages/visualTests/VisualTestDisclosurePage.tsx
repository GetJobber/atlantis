import {
  Box,
  Button,
  Disclosure,
  Grid,
  Heading,
  Stack,
  Text,
} from "@jobber/components";
import { useState } from "react";

export const VisualTestDisclosurePage = () => {
  const [isControlledOpen, setIsControlledOpen] = useState(false);

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={1}>Disclosure Examples</Heading>

        <Stack gap="large">
          {/* Basic Disclosure */}
          <section>
            <Text size="large">Basic Disclosure</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Disclosure title="Basic Example">
                  <Text>
                    This is a basic example of the Disclosure component. It
                    shows how to use the component in its simplest form with
                    just a title and content.
                  </Text>
                </Disclosure>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Default Open Disclosure */}
          <section>
            <Text size="large">Default Open Disclosure</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Disclosure title="Default Open Example" defaultOpen={true}>
                  <Text>
                    This Disclosure is open by default using the defaultOpen
                    prop. This is useful when you want the content to be visible
                    initially.
                  </Text>
                </Disclosure>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Controlled Disclosure */}
          <section>
            <Text size="large">Controlled Disclosure</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small">
                  <Button
                    label={
                      isControlledOpen ? "Close Disclosure" : "Open Disclosure"
                    }
                    onClick={() => setIsControlledOpen(!isControlledOpen)}
                  />
                  <Disclosure
                    title="Controlled Example"
                    open={isControlledOpen}
                    onToggle={setIsControlledOpen}
                  >
                    <Text>
                      This is a controlled Disclosure component. Its open state
                      is managed externally using the open and onToggle props.
                      You can use the button above to control it.
                    </Text>
                  </Disclosure>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Complex Title Disclosure */}
          <section>
            <Text size="large">Complex Title Disclosure</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Disclosure
                  title={
                    <span>
                      <Text variation="default">Complex Title</Text>
                      <Text variation="subdued">
                        {" "}
                        (with additional details)
                      </Text>
                    </span>
                  }
                >
                  <Text>
                    This example shows how to use a complex title with multiple
                    elements. Note that when using multiple elements, they must
                    be wrapped in a container element (like span) and not a
                    Fragment.
                  </Text>
                </Disclosure>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Nested Content Disclosure */}
          <section>
            <Text size="large">Nested Content Disclosure</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Disclosure title="Nested Content Example">
                  <Stack gap="small">
                    <Text>This Disclosure contains nested content:</Text>
                    <Box padding="small" background="base-grey--100">
                      <Stack gap="small">
                        <Text>• First item in a list</Text>
                        <Text>• Second item in a list</Text>
                        <Text>• Third item in a list</Text>
                      </Stack>
                    </Box>
                    <Disclosure title="Nested Disclosure">
                      <Text>
                        You can even nest Disclosure components within each
                        other!
                      </Text>
                    </Disclosure>
                  </Stack>
                </Disclosure>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Event Handling Disclosure */}
          <section>
            <Text size="large">Event Handling Disclosure</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Disclosure
                  title="Click to See Event Handling"
                  onToggle={isOpen =>
                    console.log(
                      `Disclosure was ${isOpen ? "opened" : "closed"}`,
                    )
                  }
                >
                  <Text>
                    This Disclosure logs to the console when it is opened or
                    closed. Open your browser&apos;s console to see the events.
                  </Text>
                </Disclosure>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
