import {
  Box,
  Button,
  Grid,
  Heading,
  InputText,
  SideDrawer,
  Stack,
  Text,
} from "@jobber/components";
import { useState } from "react";

export const VisualTestSideDrawerPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubtleOpen, setIsSubtleOpen] = useState(false);
  const [isReverseOpen, setIsReverseOpen] = useState(false);

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>SideDrawer Examples</Heading>

        <Stack gap="large">
          {/* Basic SideDrawer */}
          <section>
            <Text size="large">Basic SideDrawer</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Button
                  label="Open Basic SideDrawer"
                  onClick={() => setIsOpen(true)}
                />
                <SideDrawer
                  open={isOpen}
                  onRequestClose={() => setIsOpen(false)}
                >
                  <SideDrawer.Title>Basic SideDrawer</SideDrawer.Title>
                  <Box padding="base">
                    <Text>
                      This is a basic SideDrawer with default settings.
                    </Text>
                  </Box>
                </SideDrawer>
              </Grid.Cell>
            </Grid>
          </section>

          {/* SideDrawer with Toolbar and Actions */}
          <section>
            <Text size="large">SideDrawer with Toolbar and Actions</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Button
                  label="Open SideDrawer with Toolbar"
                  onClick={() => setIsSubtleOpen(true)}
                />
                <SideDrawer
                  open={isSubtleOpen}
                  onRequestClose={() => setIsSubtleOpen(false)}
                  variation="subtle"
                >
                  <SideDrawer.Title>With Toolbar and Actions</SideDrawer.Title>
                  <SideDrawer.Actions>
                    <Button icon="add" ariaLabel="Add" />
                  </SideDrawer.Actions>
                  <SideDrawer.Toolbar>
                    <InputText placeholder="Search" />
                  </SideDrawer.Toolbar>
                  <Box padding="base">
                    <Text>This SideDrawer has a toolbar and actions.</Text>
                  </Box>
                </SideDrawer>
              </Grid.Cell>
            </Grid>
          </section>

          {/* SideDrawer with Footer and Back Button */}
          <section>
            <Text size="large">SideDrawer with Footer and Back Button</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Button
                  label="Open SideDrawer with Footer"
                  onClick={() => setIsReverseOpen(true)}
                />
                <SideDrawer
                  open={isReverseOpen}
                  onRequestClose={() => setIsReverseOpen(false)}
                  scrollDirection="reverse"
                >
                  <SideDrawer.BackButton
                    onClick={() => setIsReverseOpen(false)}
                  />
                  <SideDrawer.Title>
                    With Footer and Back Button
                  </SideDrawer.Title>
                  <Box padding="base">
                    <Text>This SideDrawer has a footer and back button.</Text>
                  </Box>
                  <SideDrawer.Footer>
                    <Button label="Save" fullWidth={true} />
                  </SideDrawer.Footer>
                </SideDrawer>
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
