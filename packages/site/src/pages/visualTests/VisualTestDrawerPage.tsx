import {
  Box,
  Button,
  Content,
  Drawer,
  Grid,
  Heading,
  Stack,
  Text,
} from "@jobber/components";
import { useState } from "react";

export const VisualTestDrawerPage = () => {
  const [isBasicDrawerOpen, setIsBasicDrawerOpen] = useState(false);
  const [isDrawerWithContentOpen, setIsDrawerWithContentOpen] = useState(false);

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>Drawer Examples</Heading>

        <Stack gap="large">
          {/* Basic Drawer */}
          <section>
            <Text size="large">Basic Drawer</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Button
                  label="Toggle Basic Drawer"
                  onClick={() => setIsBasicDrawerOpen(!isBasicDrawerOpen)}
                />
                {isBasicDrawerOpen && (
                  <Drawer
                    title="Basic Drawer Example"
                    open={isBasicDrawerOpen}
                    onRequestClose={() => setIsBasicDrawerOpen(false)}
                  >
                    <Content>
                      <Stack gap="small">
                        <Text>This is a basic drawer with simple content.</Text>
                        <Text>
                          The drawer can be closed by clicking the close button
                          or using the onRequestClose handler.
                        </Text>
                      </Stack>
                    </Content>
                  </Drawer>
                )}
              </Grid.Cell>
            </Grid>
          </section>

          {/* Drawer with Rich Content */}
          <section>
            <Text size="large">Drawer with Rich Content</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Button
                  label="Toggle Rich Content Drawer"
                  onClick={() =>
                    setIsDrawerWithContentOpen(!isDrawerWithContentOpen)
                  }
                />
                {isDrawerWithContentOpen && (
                  <Drawer
                    title="Drawer with Rich Content"
                    open={isDrawerWithContentOpen}
                    onRequestClose={() => setIsDrawerWithContentOpen(false)}
                  >
                    <Content>
                      <Stack gap="large">
                        <Text>
                          This drawer demonstrates how to display rich content
                          with multiple sections.
                        </Text>
                        <Box padding="small">
                          <Stack gap="small">
                            <Heading level={2}>Section 1</Heading>
                            <Text>
                              This is the content for section 1. It can contain
                              any type of content.
                            </Text>
                          </Stack>
                        </Box>
                        <Box padding="small">
                          <Stack gap="small">
                            <Heading level={2}>Section 2</Heading>
                            <Text>
                              This is the content for section 2. Notice how we
                              use different components to structure the content.
                            </Text>
                          </Stack>
                        </Box>
                        <Button
                          label="Action Inside Drawer"
                          onClick={() => alert("Button clicked inside drawer!")}
                        />
                      </Stack>
                    </Content>
                  </Drawer>
                )}
              </Grid.Cell>
            </Grid>
          </section>

          {/* Main Content Area */}
          <section>
            <Text size="large">Main Content Area</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Content>
                  <Stack gap="small">
                    <Text>
                      This is the main content area. It remains interactive
                      while the drawer is open. Try clicking the buttons above
                      to see how the drawer appears alongside this content.
                    </Text>
                    <Text>
                      The drawer is useful for displaying supplementary
                      information without hiding the main content completely.
                    </Text>
                  </Stack>
                </Content>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
