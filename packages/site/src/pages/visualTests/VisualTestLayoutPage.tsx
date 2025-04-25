import {
  Box,
  Button,
  Card,
  Chip,
  Cluster,
  ContentBlock,
  Cover,
  Divider,
  Frame,
  Heading,
  Hidden,
  HiddenVisually,
  InputText,
  ResponsiveSwitcher,
  SideKick,
  Stack,
  Text,
  Tiles,
} from "@jobber/components";

export const VisualTestLayoutPage = () => {
  return (
    <Stack>
      <Box padding="large">
        {/* Stack Examples */}
        <Stack>
          <Heading level={1}>Stack Examples</Heading>
          <Stack gap="large">
            {/* Basic Stack */}
            <section>
              <Text size="large">Basic Stack</Text>
              <Card>
                <Box padding="base">
                  <Stack>
                    <Text>First item</Text>
                    <Text>Second item</Text>
                    <Text>Third item</Text>
                  </Stack>
                </Box>
              </Card>
            </section>

            {/* Stack with Different Spacing */}
            <section>
              <Text size="large">Stack with Different Spacing</Text>
              <Cluster>
                <Card>
                  <Box padding="base">
                    <Stack gap="small">
                      <Text>Small Space</Text>
                      <Text>Between Items</Text>
                      <Text>In Stack</Text>
                    </Stack>
                  </Box>
                </Card>
                <Card>
                  <Box padding="base">
                    <Stack gap="large">
                      <Text>Large Space</Text>
                      <Text>Between Items</Text>
                      <Text>In Stack</Text>
                    </Stack>
                  </Box>
                </Card>
              </Cluster>
            </section>

            {/* Stack with Form Layout */}
            <section>
              <Text size="large">Stack with Form Layout</Text>
              <Card>
                <Box padding="base">
                  <Stack>
                    <InputText placeholder="Enter your name" />
                    <InputText placeholder="Enter your email" />
                    <Button label="Submit Form" />
                  </Stack>
                </Box>
              </Card>
            </section>
            <section>
              <Text size="large">Stack with Divider</Text>
              <Card>
                <Box padding="base">
                  <Stack
                    divider={
                      <HiddenVisually above="sm">
                        <Divider />
                      </HiddenVisually>
                    }
                  >
                    <Text>First item</Text>
                    <Text>Second item</Text>
                    <Text>Third item</Text>
                  </Stack>
                </Box>
              </Card>
            </section>

            {/* Stack with Alignment */}
            <section>
              <Text size="large">Stack with Alignment</Text>
              <Cluster>
                <Card>
                  <Box padding="base" width="grow">
                    <Stack align="start">
                      <Text>Start Aligned</Text>
                      <Button label="Button" />
                      <Text>Text</Text>
                    </Stack>
                  </Box>
                </Card>
                <Card>
                  <Box padding="base" width="grow">
                    <Stack align="center">
                      <Text>Center Aligned</Text>
                      <Button label="Button" />
                      <Text>Text</Text>
                    </Stack>
                  </Box>
                </Card>
                <Card>
                  <Box padding="base" width="grow">
                    <Stack align="end">
                      <Text>End Aligned</Text>
                      <Button label="Button" />
                      <Text>Text</Text>
                    </Stack>
                  </Box>
                </Card>
              </Cluster>
            </section>

            {/* Stack with Split */}
            <section>
              <Text size="large">Stack with Split</Text>
              <Card>
                <Box padding="base" height={300}>
                  <Stack splitAfter={2}>
                    <Text>Main Content 1</Text>
                    <Text>Main Content 2</Text>
                    <Text>Footer Content</Text>
                  </Stack>
                </Box>
              </Card>
            </section>

            {/* Recursive Stack */}
            <section>
              <Text size="large">Recursive Stack</Text>
              <Card>
                <Box padding="base">
                  <Stack gap="large" recursive>
                    <div>
                      <Text>Nested Group 1</Text>
                      <Text>These items have space</Text>
                      <Text>Due to recursive prop</Text>
                    </div>
                    <div>
                      <Text>Nested Group 2</Text>
                      <Text>These also have</Text>
                      <Text>The same spacing</Text>
                    </div>
                  </Stack>
                </Box>
              </Card>
            </section>
          </Stack>
          {/* Cluster Examples */}
          <Stack>
            <Heading level={1}>Cluster Examples</Heading>
            <Stack gap="large">
              {/* Basic Cluster */}
              <section>
                <Text size="large">Basic Cluster</Text>
                <Card>
                  <Box padding="base">
                    <Cluster>
                      <Button label="First" />
                      <Button label="Second" type="secondary" />
                      <Button label="Third" variation="work" />
                      <Button label="Fourth" variation="learning" />
                    </Cluster>
                  </Box>
                </Card>
              </section>

              {/* Cluster with Different Spacing */}
              <section>
                <Text size="large">Cluster with Different Spacing</Text>
                <Stack gap="base">
                  <Card>
                    <Box padding="base">
                      <Cluster gap="small">
                        <Chip label="Small" />
                        <Chip label="Space" />
                        <Chip label="Between" />
                        <Chip label="Items" />
                      </Cluster>
                    </Box>
                  </Card>
                  <Card>
                    <Box padding="base">
                      <Cluster gap="large">
                        <Chip label="Large" />
                        <Chip label="Space" />
                        <Chip label="Between" />
                        <Chip label="Items" />
                      </Cluster>
                    </Box>
                  </Card>
                </Stack>
              </section>

              {/* Cluster with Justification */}
              <section>
                <Text size="large">Cluster with Justification</Text>
                <Stack gap="base">
                  <Card>
                    <Box padding="base">
                      <Cluster justify="start">
                        <Button label="Start" />
                        <Button label="Justified" type="secondary" />
                      </Cluster>
                    </Box>
                  </Card>
                  <Card>
                    <Box padding="base">
                      <Cluster justify="center">
                        <Button label="Center" />
                        <Button label="Justified" type="secondary" />
                      </Cluster>
                    </Box>
                  </Card>
                  <Card>
                    <Box padding="base">
                      <Cluster justify="end">
                        <Button label="End" />
                        <Button label="Justified" type="secondary" />
                      </Cluster>
                    </Box>
                  </Card>
                  <Card>
                    <Box padding="base">
                      <Cluster justify="space-between">
                        <Button label="Space" />
                        <Button label="Between" type="secondary" />
                        <Button label="Items" type="secondary" />
                      </Cluster>
                    </Box>
                  </Card>
                  <Card>
                    <Box padding="base">
                      <Cluster justify="space-around">
                        <Button label="Space" />
                        <Button label="Around" type="secondary" />
                        <Button label="Items" type="secondary" />
                      </Cluster>
                    </Box>
                  </Card>
                </Stack>
              </section>

              {/* Cluster with Collapse */}
              <section>
                <Text size="large">Cluster with Collapse</Text>
                <Card>
                  <Box padding="base">
                    <Cluster collapseBelow="md">
                      <Button label="These" />
                      <Button label="Items" type="secondary" />
                      <Button label="Will" type="secondary" />
                      <Button label="Stack" type="secondary" />
                      <Button label="Below" type="secondary" />
                      <Button label="md" type="secondary" />
                      <Button label="Breakpoint" type="secondary" />
                    </Cluster>
                  </Box>
                </Card>
              </section>
            </Stack>
          </Stack>

          {/* ContentBlock Examples */}
          <Stack>
            <Heading level={1}>ContentBlock Examples</Heading>
            <Stack gap="large">
              {/* Basic ContentBlock */}
              <section>
                <Text size="large">Basic ContentBlock</Text>
                <Card>
                  <Box padding="base">
                    <ContentBlock>
                      <Stack>
                        <Heading level={2}>Default ContentBlock</Heading>
                        <Text>
                          This content uses the default maxWidth and left
                          justification.
                        </Text>
                        <Button label="Click me" />
                      </Stack>
                    </ContentBlock>
                  </Box>
                </Card>
              </section>

              {/* ContentBlock with Different Justification */}
              <section>
                <Text size="large">
                  ContentBlock with Different Justification
                </Text>
                <Stack gap="base">
                  <Card>
                    <Box padding="base">
                      <ContentBlock justify="left">
                        <Stack>
                          <Text>Left Justified Content</Text>
                          <Cluster>
                            <Button label="Button 1" />
                            <Button label="Button 2" type="secondary" />
                          </Cluster>
                        </Stack>
                      </ContentBlock>
                    </Box>
                  </Card>
                  <Card>
                    <Box padding="base">
                      <ContentBlock justify="center">
                        <Stack>
                          <Text>Center Justified Content</Text>
                          <Cluster>
                            <Button label="Button 1" />
                            <Button label="Button 2" type="secondary" />
                          </Cluster>
                        </Stack>
                      </ContentBlock>
                    </Box>
                  </Card>
                  <Card>
                    <Box padding="base">
                      <ContentBlock justify="right">
                        <Stack>
                          <Text>Right Justified Content</Text>
                          <Cluster>
                            <Button label="Button 1" />
                            <Button label="Button 2" type="secondary" />
                          </Cluster>
                        </Stack>
                      </ContentBlock>
                    </Box>
                  </Card>
                </Stack>
              </section>

              {/* ContentBlock with Different Max Widths */}
              <section>
                <Text size="large">ContentBlock with Different Max Widths</Text>
                <Stack gap="base">
                  <Card>
                    <Box padding="base">
                      <ContentBlock maxWidth="300px">
                        <Stack>
                          <Text>Narrow ContentBlock (300px)</Text>
                          <Text>
                            The content is constrained to a maximum width of 300
                            pixels.
                          </Text>
                        </Stack>
                      </ContentBlock>
                    </Box>
                  </Card>
                  <Card>
                    <Box padding="base">
                      <ContentBlock maxWidth="600px">
                        <Stack>
                          <Text>Medium ContentBlock (600px)</Text>
                          <Text>
                            The content is constrained to a maximum width of 600
                            pixels, giving more room for content while still
                            maintaining readability.
                          </Text>
                        </Stack>
                      </ContentBlock>
                    </Box>
                  </Card>
                </Stack>
              </section>

              {/* ContentBlock with Text Alignment */}
              <section>
                <Text size="large">ContentBlock with Text Alignment</Text>
                <Stack gap="base">
                  <Card>
                    <Box padding="base">
                      <ContentBlock justify="center" andText>
                        <Stack>
                          <Text>Centered Content and Text</Text>
                          <Text>
                            Both the content block and the text within it are
                            centered, creating a cohesive centered layout.
                          </Text>
                          <ContentBlock maxWidth="300px">
                            <Button label="Centered Button" />
                          </ContentBlock>
                        </Stack>
                      </ContentBlock>
                    </Box>
                  </Card>
                </Stack>
              </section>

              {/* ContentBlock with Gutters */}
              <section>
                <Text size="large">ContentBlock with Gutters</Text>
                <Card>
                  <Box padding="base">
                    <ContentBlock gutters="large">
                      <Stack>
                        <Text>Content with Large Gutters</Text>
                        <Text>
                          This content maintains consistent spacing from the
                          edges of its container using the gutters prop.
                        </Text>
                        <ContentBlock maxWidth="300px">
                          <Button label="Button with Gutters" />
                        </ContentBlock>
                      </Stack>
                    </ContentBlock>
                  </Box>
                </Card>
              </section>
            </Stack>
          </Stack>

          {/* ResponsiveSwitcher Examples */}
          <Stack>
            <Heading level={1}>ResponsiveSwitcher Examples</Heading>
            <Stack gap="large">
              {/* Basic ResponsiveSwitcher */}
              <section>
                <Text size="large">Basic ResponsiveSwitcher</Text>
                <Card>
                  <Box padding="base">
                    <ResponsiveSwitcher threshold="30ch">
                      <Card>
                        <Box padding="base">
                          <Stack>
                            <Heading level={3}>Left/Top Content</Heading>
                            <Text>
                              This content will switch between horizontal and
                              vertical layout based on the threshold.
                            </Text>
                          </Stack>
                        </Box>
                      </Card>
                      <Card>
                        <Box padding="base">
                          <Stack>
                            <Heading level={3}>Right/Bottom Content</Heading>
                            <Text>
                              The layout switches when the container width is
                              less than the threshold.
                            </Text>
                          </Stack>
                        </Box>
                      </Card>
                    </ResponsiveSwitcher>
                  </Box>
                </Card>
              </section>

              {/* ResponsiveSwitcher with Different Spacing */}
              <section>
                <Text size="large">
                  ResponsiveSwitcher with Different Spacing
                </Text>
                <Stack gap="base">
                  <Card>
                    <Box padding="base">
                      <ResponsiveSwitcher threshold="40ch" gap="small">
                        <Card>
                          <Box padding="base">
                            <Text>Small Space Between</Text>
                          </Box>
                        </Card>
                        <Card>
                          <Box padding="base">
                            <Text>These Items</Text>
                          </Box>
                        </Card>
                      </ResponsiveSwitcher>
                    </Box>
                  </Card>
                  <Card>
                    <Box padding="base">
                      <ResponsiveSwitcher threshold="40ch" gap="large">
                        <Card>
                          <Box padding="base">
                            <Text>Large Space Between</Text>
                          </Box>
                        </Card>
                        <Card>
                          <Box padding="base">
                            <Text>These Items</Text>
                          </Box>
                        </Card>
                      </ResponsiveSwitcher>
                    </Box>
                  </Card>
                </Stack>
              </section>

              {/* ResponsiveSwitcher with Different Thresholds */}
              <section>
                <Text size="large">
                  ResponsiveSwitcher with Different Thresholds
                </Text>
                <Stack gap="base">
                  <Card>
                    <Box padding="base">
                      <ResponsiveSwitcher threshold="200px">
                        <Card>
                          <Box padding="base">
                            <Text>200px Threshold</Text>
                          </Box>
                        </Card>
                        <Card>
                          <Box padding="base">
                            <Text>Switches Earlier</Text>
                          </Box>
                        </Card>
                      </ResponsiveSwitcher>
                    </Box>
                  </Card>
                  <Card>
                    <Box padding="base">
                      <ResponsiveSwitcher threshold="400px">
                        <Card>
                          <Box padding="base">
                            <Text>400px Threshold</Text>
                          </Box>
                        </Card>
                        <Card>
                          <Box padding="base">
                            <Text>Switches Later</Text>
                          </Box>
                        </Card>
                      </ResponsiveSwitcher>
                    </Box>
                  </Card>
                </Stack>
              </section>

              {/* ResponsiveSwitcher with Item Limit */}
              <section>
                <Text size="large">ResponsiveSwitcher with Item Limit</Text>
                <Card>
                  <Box padding="base">
                    <ResponsiveSwitcher threshold="30ch" limit={3}>
                      <Card>
                        <Box padding="base">
                          <Text>First Item</Text>
                        </Box>
                      </Card>
                      <Card>
                        <Box padding="base">
                          <Text>Second Item</Text>
                        </Box>
                      </Card>
                      <Card>
                        <Box padding="base">
                          <Text>Third Item</Text>
                        </Box>
                      </Card>
                      <Card>
                        <Box padding="base">
                          <Text>Fourth Item (Forces Wrap)</Text>
                        </Box>
                      </Card>
                    </ResponsiveSwitcher>
                  </Box>
                </Card>
              </section>

              {/* ResponsiveSwitcher with Form Layout */}
              <section>
                <Text size="large">ResponsiveSwitcher with Form Layout</Text>
                <Card>
                  <Box padding="base">
                    <ResponsiveSwitcher threshold="30ch">
                      <Stack>
                        <InputText placeholder="First Name" />
                        <InputText placeholder="Last Name" />
                      </Stack>
                      <Stack>
                        <InputText placeholder="Email" />
                        <InputText placeholder="Password" />
                        <Cluster justify="center">
                          <Button label="Sign In" />
                        </Cluster>
                      </Stack>
                    </ResponsiveSwitcher>
                  </Box>
                </Card>
              </section>
              {/* ResponsiveSwitcher with Divider */}
              <section>
                <Text size="large">ResponsiveSwitcher with Divider</Text>
                <Card>
                  <Box padding="base">
                    <ResponsiveSwitcher collapseBelow="md">
                      <Stack>
                        <InputText placeholder="First Name" />
                        <InputText placeholder="Last Name" />
                      </Stack>
                      <Stack
                        divider={
                          <Hidden above="md">
                            <Divider />
                          </Hidden>
                        }
                      >
                        <InputText placeholder="Email" />
                        <InputText placeholder="Password" />
                        <Cluster justify="center">
                          <Button label="Sign In" />
                        </Cluster>
                      </Stack>
                    </ResponsiveSwitcher>
                  </Box>
                </Card>
              </section>
            </Stack>
          </Stack>

          {/* SideKick Examples */}
          <Stack>
            <Heading level={1}>SideKick Examples</Heading>
            <Stack gap="large">
              {/* Basic SideKick */}
              <section>
                <Text size="large">Basic SideKick</Text>
                <Card>
                  <Box padding="base">
                    <SideKick sideWidth="200px" contentMinWidth="60%">
                      <Card>
                        <Box padding="base">
                          <Stack>
                            <Heading level={3}>Main Content</Heading>
                            <Text>
                              This is the main content area that grows to fill
                              available space.
                            </Text>
                            <InputText placeholder="Enter some text" />
                          </Stack>
                        </Box>
                      </Card>
                      <Card>
                        <Box padding="base">
                          <Stack>
                            <Text>Sidekick Panel</Text>
                            <Button label="Action" />
                          </Stack>
                        </Box>
                      </Card>
                    </SideKick>
                  </Box>
                </Card>
              </section>

              {/* SideKick with Different Spacing */}
              <section>
                <Text size="large">SideKick with Different Spacing</Text>
                <Stack gap="base">
                  <Card>
                    <Box padding="base">
                      <SideKick
                        sideWidth="150px"
                        contentMinWidth="50%"
                        gap="small"
                      >
                        <Card>
                          <Box padding="base">
                            <Text>Small Space Between</Text>
                          </Box>
                        </Card>
                        <Card>
                          <Box padding="base">
                            <Text>Side Panel</Text>
                          </Box>
                        </Card>
                      </SideKick>
                    </Box>
                  </Card>
                  <Card>
                    <Box padding="base">
                      <SideKick
                        sideWidth="150px"
                        contentMinWidth="50%"
                        gap="large"
                      >
                        <Card>
                          <Box padding="base">
                            <Text>Large Space Between</Text>
                          </Box>
                        </Card>
                        <Card>
                          <Box padding="base">
                            <Text>Side Panel</Text>
                          </Box>
                        </Card>
                      </SideKick>
                    </Box>
                  </Card>
                </Stack>
              </section>
              {/* SideKick with Default/Left Alignment */}
              <section>
                <Text size="large">SideKick with Right Alignment</Text>
                <Card>
                  <Box padding="base">
                    <SideKick sideWidth="200px" contentMinWidth="30%">
                      <Card>
                        <Box padding="base">
                          <Stack>
                            <Heading level={3}>Main Content</Heading>
                            <Text>The sidekick panel is now this one.</Text>
                          </Stack>
                        </Box>
                      </Card>
                      <Card>
                        <Box padding="base">
                          <Stack>
                            <Text>Side Panel</Text>
                            <Cluster>
                              <Button label="Action" />
                            </Cluster>
                          </Stack>
                        </Box>
                      </Card>
                    </SideKick>
                  </Box>
                </Card>
              </section>
              {/* SideKick with Right Alignment */}
              <section>
                <Text size="large">SideKick with Right Alignment</Text>
                <Card>
                  <Box padding="base">
                    <SideKick sideWidth="200px" contentMinWidth="30%" onRight>
                      <Card>
                        <Box padding="base">
                          <Stack>
                            <Heading level={3}>Main Content</Heading>
                            <Text>
                              The sidekick panel is the one on the right.
                            </Text>
                          </Stack>
                        </Box>
                      </Card>
                      <Card>
                        <Box padding="base">
                          <Stack>
                            <Text>Right Side Panel</Text>
                            <Cluster>
                              <Button label="Action" />
                            </Cluster>
                          </Stack>
                        </Box>
                      </Card>
                    </SideKick>
                  </Box>
                </Card>
              </section>

              {/* SideKick with Collapse */}
              <section>
                <Text size="large">SideKick with Collapse</Text>
                <Card>
                  <Box padding="base">
                    <SideKick
                      sideWidth="200px"
                      contentMinWidth="50%"
                      collapseBelow="md"
                    >
                      <Card>
                        <Box padding="base">
                          <Stack>
                            <Heading level={3}>Responsive Layout</Heading>
                            <Text>
                              This layout will collapse to vertical below 800px
                              viewport width.
                            </Text>
                          </Stack>
                        </Box>
                      </Card>
                      <Card>
                        <Box padding="base">
                          <Stack>
                            <Text>Collapsible Panel</Text>
                            <Cluster>
                              <Button label="Save" />
                              <Button label="Cancel" type="secondary" />
                            </Cluster>
                          </Stack>
                        </Box>
                      </Card>
                    </SideKick>
                  </Box>
                </Card>
              </section>

              {/* SideKick with Form Layout */}
              <section>
                <Text size="large">SideKick with Form Layout</Text>
                <Card>
                  <Box padding="base">
                    <SideKick sideWidth="300px" contentMinWidth="40%">
                      <Card>
                        <Box padding="base">
                          <Stack>
                            <Heading level={3}>Form Fields</Heading>
                            <Stack>
                              <InputText placeholder="First Name" />
                              <InputText placeholder="Last Name" />
                              <InputText placeholder="Email" />
                              <Button label="Submit" />
                            </Stack>
                          </Stack>
                        </Box>
                      </Card>
                      <Card>
                        <Box padding="base">
                          <Stack>
                            <Heading level={3}>Preview</Heading>
                            <Text>
                              This panel can show a live preview or help text.
                            </Text>
                            <Text variation="subdued">
                              Fill out the form on the left to see changes.
                            </Text>
                          </Stack>
                        </Box>
                      </Card>
                    </SideKick>
                  </Box>
                </Card>
              </section>
            </Stack>
          </Stack>

          {/* Cover Examples */}
          <Stack>
            <Heading level={1}>Cover Examples</Heading>
            <Stack gap="large">
              {/* Basic Cover */}
              <section>
                <Text size="large">Basic Cover</Text>
                <Card>
                  <Box padding="base">
                    <Cover minHeight="30vh">
                      <Cover.Center>
                        <Stack>
                          <Heading level={3}>Centered Content</Heading>
                          <Text>
                            This content is vertically centered within the Cover
                            component.
                          </Text>
                          <Cluster justify="center">
                            <Button label="Click me" />
                          </Cluster>
                        </Stack>
                      </Cover.Center>
                    </Cover>
                  </Box>
                </Card>
              </section>

              {/* Cover with Top and Bottom Content */}
              <section>
                <Text size="large">Cover with Top and Bottom Content</Text>
                <Card>
                  <Box padding="base">
                    <Cover minHeight="40vh">
                      <Stack>
                        <Text>Content at the top</Text>
                        <Button label="Top Action" type="secondary" />
                      </Stack>
                      <Cover.Center>
                        <Stack>
                          <Heading level={3}>Centered Section</Heading>
                          <Text>
                            This content stays centered while other content
                            flows around it.
                          </Text>
                          <Cluster>
                            <Button label="Main Action" />
                          </Cluster>
                        </Stack>
                      </Cover.Center>
                      <Stack>
                        <Text>Content at the bottom</Text>
                        <Button label="Bottom Action" type="secondary" />
                      </Stack>
                    </Cover>
                  </Box>
                </Card>
              </section>

              {/* Cover with Different Heights */}
              <section>
                <Text size="large">Cover with Different Heights</Text>
                <Stack gap="base">
                  <Card>
                    <Box padding="base">
                      <Cover minHeight="20vh">
                        <Cover.Center>
                          <Text>Short Cover (20vh)</Text>
                        </Cover.Center>
                      </Cover>
                    </Box>
                  </Card>
                  <Card>
                    <Box padding="base">
                      <Cover minHeight="40vh">
                        <Cover.Center>
                          <Text>Medium Cover (40vh)</Text>
                        </Cover.Center>
                      </Cover>
                    </Box>
                  </Card>
                </Stack>
              </section>

              {/* Cover with Custom Spacing */}
              <section>
                <Text size="large">Cover with Custom Spacing</Text>
                <Card>
                  <Box>
                    <Cover minHeight="30vh" gap="large">
                      <Text>Top content with large spacing</Text>
                      <Cover.Center>
                        <Stack>
                          <Heading level={3}>Spaced Content</Heading>
                          <Text>
                            The space between elements is customized using the
                            space prop.
                          </Text>
                        </Stack>
                      </Cover.Center>
                      <Text>Bottom content with large spacing</Text>
                    </Cover>
                  </Box>
                </Card>
              </section>

              {/* Cover with Form Layout */}
              <section>
                <Text size="large">Cover with Form Layout</Text>
                <Card>
                  <Box padding="base">
                    <Cover minHeight="50vh">
                      <Text>Welcome back!</Text>
                      <Cover.Center>
                        <Stack gap="large">
                          <Heading level={2}>Sign In</Heading>
                          <Stack>
                            <InputText placeholder="Email" />
                            <InputText placeholder="Password" />
                            <Cluster>
                              <Button label="Sign In" />
                            </Cluster>
                          </Stack>
                          <Text variation="subdued">Forgot your password?</Text>
                        </Stack>
                      </Cover.Center>
                      <Text>Need help? Contact support</Text>
                    </Cover>
                  </Box>
                </Card>
              </section>
            </Stack>
          </Stack>

          {/* Frame Examples */}
          <Stack>
            <Heading level={1}>Frame Examples</Heading>
            {/* Basic Frame */}
            <ContentBlock maxWidth={"100%"}>
              <Tiles gap="base" minSize="50ch">
                <section>
                  <Text size="large">Basic Frame (16:9)</Text>
                  <Frame>
                    <img src="/img_collage.jpg" alt="Frame Example" />
                  </Frame>
                </section>
                <section>
                  <Text size="large">Square Frame (1:1)</Text>
                  <Frame aspectX={1} aspectY={1}>
                    <img src="/img_collage.jpg" alt="Frame Example" />
                  </Frame>
                </section>
                <section>
                  <Text size="large">Old Fashioned TV Frame (4:3)</Text>
                  <Frame aspectX={4} aspectY={3}>
                    <img src="/img_collage.jpg" alt="Frame Example" />
                  </Frame>
                </section>
                <section>
                  <Text size="large">Old Fashioned TV Frame (4:3)</Text>
                  <Box border="base">
                    <Frame>
                      <Box padding="base">
                        <Heading level={2}>Content works too</Heading>
                        <Text>Any children are centered within the frame</Text>
                      </Box>
                    </Frame>
                  </Box>
                </section>
              </Tiles>
            </ContentBlock>
          </Stack>

          {/* Tiles Examples */}
          <Stack>
            <Heading level={1}>Tiles Examples</Heading>
            <Stack gap="large">
              {/* Basic Tiles */}
              <section>
                <Text size="large">Basic Tiles</Text>
                <Card>
                  <Box padding="base">
                    <Tiles minSize="20ch" gap="base">
                      <Card>
                        <Box padding="base">
                          <Stack>
                            <Text>First Tile</Text>
                            <Cluster>
                              <Button label="Action" />
                            </Cluster>
                          </Stack>
                        </Box>
                      </Card>
                      <Card>
                        <Box padding="base">
                          <Stack>
                            <Text>Second Tile</Text>
                            <Cluster>
                              <Button label="Action" />
                            </Cluster>
                          </Stack>
                        </Box>
                      </Card>
                      <Card>
                        <Box padding="base">
                          <Stack>
                            <Text>Third Tile</Text>
                            <Cluster>
                              <Button label="Action" />
                            </Cluster>
                          </Stack>
                        </Box>
                      </Card>
                    </Tiles>
                  </Box>
                </Card>
              </section>

              {/* Tiles with Different Spacing */}
              <section>
                <Text size="large">Tiles with Different Spacing</Text>
                <Stack gap="base">
                  <Card>
                    <Box padding="base">
                      <Tiles minSize="20ch" gap="small">
                        <Card>
                          <Box padding="base">
                            <Stack>
                              <Text>Small Space</Text>
                              <Cluster>
                                <Button label="Action" />
                              </Cluster>
                            </Stack>
                          </Box>
                        </Card>
                        <Card>
                          <Box padding="base">
                            <Stack>
                              <Text>Between</Text>
                              <Cluster>
                                <Button label="Action" />
                              </Cluster>
                            </Stack>
                          </Box>
                        </Card>
                        <Card>
                          <Box padding="base">
                            <Stack>
                              <Text>Tiles</Text>
                              <Cluster>
                                <Button label="Action" />
                              </Cluster>
                            </Stack>
                          </Box>
                        </Card>
                      </Tiles>
                    </Box>
                  </Card>
                  <Card>
                    <Box padding="base">
                      <Tiles minSize="20ch" gap="large">
                        <Card>
                          <Box padding="base">
                            <Stack>
                              <Text>Large Space</Text>
                              <Cluster>
                                <Button label="Action" />
                              </Cluster>
                            </Stack>
                          </Box>
                        </Card>
                        <Card>
                          <Box padding="base">
                            <Stack>
                              <Text>Between</Text>
                              <Cluster>
                                <Button label="Action" />
                              </Cluster>
                            </Stack>
                          </Box>
                        </Card>
                        <Card>
                          <Box padding="base">
                            <Stack>
                              <Text>Tiles</Text>
                              <Cluster>
                                <Button label="Action" />
                              </Cluster>
                            </Stack>
                          </Box>
                        </Card>
                      </Tiles>
                    </Box>
                  </Card>
                </Stack>
              </section>

              {/* Tiles with Different Sizes */}
              <section>
                <Text size="large">Tiles with Different Sizes</Text>
                <Stack gap="base">
                  <Card>
                    <Box padding="base">
                      <Tiles minSize="15ch" gap="base">
                        <Card>
                          <Box padding="base">
                            <Stack>
                              <Text>Small Tiles</Text>
                              <Cluster>
                                <Button label="Action" />
                              </Cluster>
                            </Stack>
                          </Box>
                        </Card>
                        <Card>
                          <Box padding="base">
                            <Stack>
                              <Text>(15ch)</Text>
                              <Cluster>
                                <Button label="Action" />
                              </Cluster>
                            </Stack>
                          </Box>
                        </Card>
                        <Card>
                          <Box padding="base">
                            <Stack>
                              <Text>Minimum</Text>
                              <Cluster>
                                <Button label="Action" />
                              </Cluster>
                            </Stack>
                          </Box>
                        </Card>
                      </Tiles>
                    </Box>
                  </Card>
                  <Card>
                    <Box padding="base">
                      <Tiles minSize="30ch" gap="base">
                        <Card>
                          <Box padding="base">
                            <Stack>
                              <Text>Large Tiles</Text>
                              <Cluster>
                                <Button label="Action" />
                              </Cluster>
                            </Stack>
                          </Box>
                        </Card>
                        <Card>
                          <Box padding="base">
                            <Stack>
                              <Text>(30ch)</Text>
                              <Cluster>
                                <Button label="Action" />
                              </Cluster>
                            </Stack>
                          </Box>
                        </Card>
                        <Card>
                          <Box padding="base">
                            <Stack>
                              <Text>Minimum</Text>
                              <Cluster>
                                <Button label="Action" />
                              </Cluster>
                            </Stack>
                          </Box>
                        </Card>
                      </Tiles>
                    </Box>
                  </Card>
                </Stack>
              </section>

              {/* Tiles with Mixed Content */}
              <section>
                <Text size="large">Tiles with Mixed Content</Text>
                <Card>
                  <Box padding="base">
                    <Tiles minSize="25ch" gap="base">
                      <Card>
                        <Box padding="base">
                          <Stack>
                            <Heading level={3}>Feature 1</Heading>
                            <Text>
                              A short description of the first feature.
                            </Text>
                            <Cluster>
                              <Button label="Learn More" />
                            </Cluster>
                          </Stack>
                        </Box>
                      </Card>
                      <Card>
                        <Box padding="base">
                          <Stack>
                            <Heading level={3}>Feature 2</Heading>
                            <Text>
                              A longer description that shows how content of
                              different lengths works within tiles. The tiles
                              maintain their alignment regardless of content
                              length.
                            </Text>
                            <Cluster>
                              <Button label="Learn More" />
                            </Cluster>
                          </Stack>
                        </Box>
                      </Card>
                      <Card>
                        <Box padding="base">
                          <Stack>
                            <Heading level={3}>Feature 3</Heading>
                            <Text>
                              Another description with medium length to
                              demonstrate the flexibility of the tiles layout
                              system.
                            </Text>
                            <Cluster>
                              <Button label="Learn More" />
                            </Cluster>
                          </Stack>
                        </Box>
                      </Card>
                    </Tiles>
                  </Box>
                </Card>
              </section>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
