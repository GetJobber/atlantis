import {
  Avatar,
  Banner,
  Box,
  Button,
  Card,
  Checkbox,
  Cluster,
  Emphasis,
  Heading,
  Menu,
  Stack,
  StatusIndicator,
  Text,
} from "@jobber/components";

export const VisualTestComponentPage = () => {
  return (
    <Box padding="large">
      <Stack gap="extravagant">
        {/* Button Examples */}
        <Stack>
          <Heading level={3}>Button Examples</Heading>
          <Stack gap="large">
            {/* Basic Button Types */}
            <section>
              <Text size="large">Basic Button Types</Text>
              <Cluster>
                <Button label="Primary Button" type="primary" />
                <Button label="Secondary Button" type="secondary" />
                <Button label="Tertiary Button" type="tertiary" />
              </Cluster>
            </section>

            {/* Button Variations */}
            <section>
              <Text size="large">Button Variations</Text>
              <Cluster>
                <Button label="Work Button" variation="work" />
                <Button label="Learning Button" variation="learning" />
                <Button label="Subtle Button" variation="subtle" />
                <Button label="Destructive Button" variation="destructive" />
              </Cluster>
            </section>

            {/* Button Sizes */}
            <section>
              <Text size="large">Button Sizes</Text>
              <Cluster>
                <Button label="Small Button" size="small" />
                <Button label="Base Button" size="base" />
                <Button label="Large Button" size="large" />
              </Cluster>
            </section>

            {/* Buttons with Icons */}
            <section>
              <Text size="large">Buttons with Icons</Text>
              <Cluster>
                <Button label="Left Icon" icon="plus" />
                <Button label="Right Icon" icon="plus" iconOnRight />
                <Button icon="plus" ariaLabel="Icon Only Button" />
              </Cluster>
            </section>

            {/* Button States */}
            <section>
              <Text size="large">Button States</Text>
              <Cluster>
                <Button label="Disabled Button" disabled />
                <Button label="Loading Button" loading />
                <Button label="Full Width Button" fullWidth />
              </Cluster>
            </section>

            {/* Link Buttons */}
            <section>
              <Text size="large">Link Buttons</Text>
              <Cluster>
                <Button label="URL Button" url="https://example.com" />
                <Button
                  label="External Link"
                  url="https://example.com"
                  external
                />
              </Cluster>
            </section>

            {/* Form Buttons */}
            <section>
              <Text size="large">Form Buttons</Text>
              <Cluster>
                <Button
                  label="Submit Button"
                  submit
                  name="submit-button"
                  value="submitted"
                />
                <Button
                  label="Interactive Button"
                  onClick={() => alert("Clicked!")}
                  ariaControls="controlled-element"
                  ariaHaspopup
                  ariaExpanded={false}
                />
              </Cluster>
            </section>
          </Stack>
        </Stack>

        {/* Avatar Examples */}
        <Stack>
          <Heading level={3}>Avatar Examples</Heading>
          <Stack gap="large">
            {/* Avatar Sizes */}
            <section>
              <Text size="large">Avatar Sizes</Text>
              <Cluster>
                <Avatar size="small" initials="ST" />
                <Avatar size="base" initials="ST" />
                <Avatar size="large" initials="ST" />
              </Cluster>
            </section>

            {/* Avatar with Images */}
            <section>
              <Text size="large">Avatar with Images</Text>
              <Cluster>
                <Avatar
                  imageUrl="https://placehold.co/300x300?text=John+Doe"
                  name="John Doe"
                />
                <Avatar
                  imageUrl="https://placehold.co/300x300?text=Jane+Smith"
                  name="Jane Smith"
                  color="#6B4CD5"
                />
              </Cluster>
            </section>

            {/* Avatar with Initials and Colors */}
            <section>
              <Text size="large">Avatar with Initials and Colors</Text>
              <Cluster>
                <Avatar initials="JD" color="#007ACE" />
                <Avatar initials="MS" color="#00A656" />
                <Avatar initials="RW" color="#EC4C47" />
                <Avatar initials="ABC" color="#6B4CD5" />
              </Cluster>
            </section>

            {/* Avatar Fallbacks */}
            <section>
              <Text size="large">Avatar Fallbacks</Text>
              <Cluster>
                <Avatar initials="" name="Default Icon Fallback" />
                <Avatar
                  initials=""
                  name="Empty Initials with Color"
                  color="#007ACE"
                />
              </Cluster>
            </section>
          </Stack>
        </Stack>

        {/* StatusIndicator Examples */}
        <Stack>
          <Heading level={3}>StatusIndicator Examples</Heading>
          <Stack gap="large">
            {/* All Status Types */}
            <section>
              <Text size="large">All Status Types</Text>
              <Card>
                <Box padding="base">
                  <Cluster>
                    <Cluster gap="small">
                      <StatusIndicator status="success" />
                      <Text>Success</Text>
                    </Cluster>
                    <Cluster gap="small">
                      <StatusIndicator status="warning" />
                      <Text>Warning</Text>
                    </Cluster>
                    <Cluster gap="small">
                      <StatusIndicator status="critical" />
                      <Text>Critical</Text>
                    </Cluster>
                    <Cluster gap="small">
                      <StatusIndicator status="inactive" />
                      <Text>Inactive</Text>
                    </Cluster>
                    <Cluster gap="small">
                      <StatusIndicator status="informative" />
                      <Text>Informative</Text>
                    </Cluster>
                  </Cluster>
                </Box>
              </Card>
            </section>

            {/* Status Indicators in Context */}
            <section>
              <Text size="large">Status Indicators in Context</Text>
              <Stack gap="base">
                <Card>
                  <Box padding="base">
                    <Cluster gap="small" align="center">
                      <StatusIndicator status="success" />
                      <Text>System Status: Online</Text>
                    </Cluster>
                  </Box>
                </Card>
                <Card>
                  <Box padding="base">
                    <Cluster gap="small" align="center">
                      <StatusIndicator status="critical" />
                      <Text>System Status: Error</Text>
                    </Cluster>
                  </Box>
                </Card>
              </Stack>
            </section>
          </Stack>
        </Stack>

        {/* Banner Examples */}
        <Stack>
          <Heading level={3}>Banner Examples</Heading>
          <Stack gap="large">
            {/* Basic Banner Types */}
            <section>
              <Text size="large">Basic Banner Types</Text>
              <Stack gap="base">
                <Banner type="notice">
                  This is a notice banner with default icon
                </Banner>
                <Banner type="success">
                  This is a success banner with default icon
                </Banner>
                <Banner type="warning">
                  This is a warning banner with default icon
                </Banner>
                <Banner type="error">
                  This is an error banner with default icon
                </Banner>
              </Stack>
            </section>

            {/* Banners with Actions */}
            <section>
              <Text size="large">Banners with Actions</Text>
              <Stack gap="base">
                <Banner
                  type="notice"
                  primaryAction={{
                    label: "Learn More",
                    onClick: () => console.log("Clicked Learn More"),
                  }}
                >
                  A notice banner with a primary action button
                </Banner>
                <Banner
                  type="success"
                  primaryAction={{
                    label: "View Details",
                    onClick: () => console.log("Clicked View Details"),
                  }}
                >
                  A success banner with a primary action button
                </Banner>
              </Stack>
            </section>

            {/* Banners with Custom Icons */}
            <section>
              <Text size="large">Banners with Custom Icons</Text>
              <Stack gap="base">
                <Banner type="notice" icon="calendar">
                  A notice banner with a custom calendar icon
                </Banner>
                <Banner type="success" icon="checkmark">
                  A success banner with an explicit checkmark icon
                </Banner>
              </Stack>
            </section>

            {/* Non-dismissible Banners */}
            <section>
              <Text size="large">Non-dismissible Banners</Text>
              <Stack gap="base">
                <Banner type="warning" dismissible={false}>
                  This warning banner cannot be dismissed
                </Banner>
                <Banner type="error" dismissible={false}>
                  This error banner cannot be dismissed
                </Banner>
              </Stack>
            </section>
          </Stack>
        </Stack>

        {/* Checkbox Examples */}
        <Stack>
          <Heading level={3}>Checkbox Examples</Heading>
          <Stack gap="large">
            {/* Basic Checkbox Types */}
            <section>
              <Text size="large">Basic Checkbox Types</Text>
              <Stack gap="base">
                <Checkbox label="Basic Checkbox" />
                <Checkbox label="Pre-checked Checkbox" defaultChecked />
                <Checkbox
                  label="Controlled Checkbox"
                  checked
                  onChange={newValue =>
                    console.log("Checkbox changed:", newValue)
                  }
                />
              </Stack>
            </section>

            {/* Checkbox States */}
            <section>
              <Text size="large">Checkbox States</Text>
              <Stack gap="base">
                <Checkbox label="Disabled Checkbox" disabled />
                <Checkbox
                  label="Disabled Checked Checkbox"
                  disabled
                  defaultChecked
                />
                <Checkbox label="Indeterminate Checkbox" indeterminate />
              </Stack>
            </section>

            {/* Checkbox with Description */}
            <section>
              <Text size="large">Checkbox with Description</Text>
              <Stack gap="base">
                <Checkbox
                  label="Checkbox with Description"
                  description="This is a helpful description that provides more context"
                />
                <Checkbox
                  label="Checkbox with Long Description"
                  description="This is a longer description that might wrap to multiple lines. It's useful for providing detailed information about what selecting this checkbox means."
                />
              </Stack>
            </section>

            {/* Checkbox with Children */}
            <section>
              <Text size="large">Checkbox with Children</Text>
              <Stack gap="base">
                <Checkbox>
                  <Text>
                    Custom label with a{" "}
                    <Text variation="success">highlighted</Text> emphasis
                  </Text>
                </Checkbox>
                <Checkbox defaultChecked>
                  <Text>
                    Another custom label with{" "}
                    <Text variation="subdued">subdued</Text> text
                  </Text>
                </Checkbox>
              </Stack>
            </section>
          </Stack>
        </Stack>

        {/* Card Examples */}
        <Stack>
          <Heading level={3}>Card Examples</Heading>
          <Stack gap="large">
            {/* Basic Cards */}
            <section>
              <Text size="large">Basic Cards</Text>
              <Stack gap="base">
                <Card>
                  <Box padding="base">
                    <Text>Basic card with no header or special styling</Text>
                  </Box>
                </Card>
                <Card header="Simple Header Card">
                  <Box padding="base">
                    <Text>Card with a simple text header</Text>
                  </Box>
                </Card>
                <Card
                  header={{
                    title: "Card with Action",
                    action: {
                      type: Button,
                      key: "card-action",
                      props: {
                        label: "Action",
                        onClick: () => console.log("Card action clicked"),
                      },
                    },
                  }}
                >
                  <Box padding="base">
                    <Text>
                      Card with a header that includes an action button
                    </Text>
                  </Box>
                </Card>
              </Stack>
            </section>

            {/* Card Elevations */}
            <section>
              <Text size="large">Card Elevations</Text>
              <Stack gap="base">
                <Card elevation="none">
                  <Box padding="base">
                    <Text>Card with no elevation</Text>
                  </Box>
                </Card>
                <Card elevation="base">
                  <Box padding="base">
                    <Text>Card with base elevation</Text>
                  </Box>
                </Card>
                <Card elevation="high">
                  <Box padding="base">
                    <Text>Card with high elevation</Text>
                  </Box>
                </Card>
              </Stack>
            </section>

            {/* Interactive Cards */}
            <section>
              <Text size="large">Interactive Cards</Text>
              <Stack gap="base">
                <Card
                  onClick={() => console.log("Clicked!")}
                  header="Clickable Card"
                >
                  <Box padding="base">
                    <Text>Click me! I&apos;m an interactive card</Text>
                  </Box>
                </Card>
                <Card url="https://example.com" header="Link Card">
                  <Box padding="base">
                    <Text>I&apos;m a card that links to a URL</Text>
                  </Box>
                </Card>
                <Card
                  url="https://example.com"
                  external
                  header="External Link Card"
                >
                  <Box padding="base">
                    <Text>
                      I&apos;m a card that links to an external URL (opens in
                      new tab)
                    </Text>
                  </Box>
                </Card>
              </Stack>
            </section>

            {/* Cards with Accent Colors */}
            <section>
              <Text size="large">Cards with Accent Colors</Text>
              <Stack gap="base">
                <Card accent="green" header="Work Card">
                  <Box padding="base">
                    <Text>Card with green accent color</Text>
                  </Box>
                </Card>
                <Card accent="purple" header="Learning Card">
                  <Box padding="base">
                    <Text>Card with purple accent color</Text>
                  </Box>
                </Card>
                <Card accent="blue" header="Success Card">
                  <Box padding="base">
                    <Text>Card with blue accent color</Text>
                  </Box>
                </Card>
              </Stack>
            </section>

            {/* Complex Card Example */}
            <section>
              <Text size="large">Complex Card Example</Text>
              <Card
                elevation="high"
                accent="yellow"
                header={{
                  title: "Complex Card",
                  action: {
                    type: Menu,
                    key: "card-menu",
                    props: {
                      items: [
                        {
                          actions: [
                            {
                              label: "Edit",
                              onClick: () => console.log("Edit"),
                            },
                            {
                              label: "Delete",
                              onClick: () => console.log("Delete"),
                              destructive: true,
                            },
                          ],
                        },
                      ],
                    },
                  },
                }}
              >
                <Box padding="base">
                  <Stack>
                    <Text>This card combines multiple features:</Text>
                    <Text>• High elevation</Text>
                    <Text>• Work accent color</Text>
                    <Text>• Header with menu actions</Text>
                  </Stack>
                </Box>
              </Card>
            </section>
          </Stack>
        </Stack>

        {/* Box Examples */}
        <Stack>
          <Heading level={3}>Box Examples</Heading>
          <Stack gap="large">
            {/* Basic Box Usage */}
            <section>
              <Text size="large">Basic Box Usage</Text>
              <Stack gap="base">
                <Box>
                  <Text>Default Box - display: flex with column direction</Text>
                </Box>
                <Box border="base" padding="base">
                  <Text>Box with base border and padding</Text>
                </Box>
                <Box border="thick" padding="large">
                  <Text>Box with thick border and large padding</Text>
                </Box>
              </Stack>
            </section>

            {/* Box with Border and Margin */}
            <section>
              <Text size="large">Box with Border and Margin</Text>
              <Stack gap="base">
                <Box margin="largest" border="thickest" padding="extravagant">
                  <Text>
                    Box with largest margin, thickest border, and extravagant
                    padding
                  </Text>
                </Box>
                <Box margin={{ left: "large" }} border="base" padding="base">
                  <Text>Box with left margin only</Text>
                </Box>
                <Box padding={{ top: "large" }} border="thick">
                  <Text>Box with top padding only</Text>
                </Box>
              </Stack>
            </section>

            {/* Box Layout Examples */}
            <section>
              <Text size="large">Box Layout Examples</Text>
              <Stack gap="base">
                <Box direction="row">
                  <Box padding="base" width="grow" border="base">
                    <Text>Left column (grow)</Text>
                  </Box>
                  <Box padding="base" width="grow" border="base">
                    <Text>Right column (grow)</Text>
                  </Box>
                </Box>
                <Box direction="row" alignItems="center">
                  <Box padding="base" width={200} border="base">
                    <Text>Fixed width (200px)</Text>
                  </Box>
                  <Box padding="base" height={75} border="base">
                    <Text>Fixed height (75px)</Text>
                  </Box>
                </Box>
              </Stack>
            </section>

            {/* Box with Gap */}
            <section>
              <Text size="large">Box with Gap</Text>
              <Box
                direction="row"
                alignItems="center"
                gap="large"
                border="base"
                padding="base"
              >
                <Box padding="base" width={100} border="base">
                  <Text>Left</Text>
                </Box>
                <Box padding="base" width={100} border="base">
                  <Text>Center</Text>
                </Box>
                <Box padding="base" width={100} border="base">
                  <Text>Right</Text>
                </Box>
              </Box>
            </section>

            {/* Box with Overflow */}
            <section>
              <Text size="large">Box with Overflow</Text>
              <Box
                height={100}
                width={200}
                overflow="auto"
                border="base"
                padding="base"
              >
                <Text>
                  This box has fixed dimensions and will show scrollbars when
                  content exceeds the available space. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Nullam euismod, nisl eget
                  ultricies ultrices, nunc nisl aliquam nunc, vitae aliquam nisl
                  nunc vitae nisl.
                </Text>
              </Box>
            </section>

            {/* Box with Position */}
            <section>
              <Text size="large">Box with Position</Text>
              <Box
                position="relative"
                height={150}
                border="base"
                padding="base"
              >
                <Text>Parent Box (relative)</Text>
              </Box>
            </section>
          </Stack>
        </Stack>
        {/* Menu Examples */}
        <Stack>
          <Heading level={3}>Menu Examples</Heading>
          <Stack gap="large">
            {/* Basic Menu Types */}
            <section>
              <Text size="large">Basic Menu Types</Text>
              <Stack gap="base">
                <Card>
                  <Box padding="base">
                    <Menu
                      items={[
                        {
                          actions: [
                            {
                              label: "View Details",
                              onClick: () =>
                                console.log("View Details clicked"),
                            },
                            {
                              label: "Edit",
                              onClick: () => console.log("Edit clicked"),
                            },
                            {
                              label: "Delete",
                              onClick: () => console.log("Delete clicked"),
                              destructive: true,
                              icon: "trash",
                            },
                          ],
                        },
                      ]}
                    />
                  </Box>
                </Card>

                <Card>
                  <Box padding="base">
                    <Menu
                      items={[
                        {
                          actions: [
                            {
                              label: "View Details",
                              onClick: () =>
                                console.log("View Details clicked"),
                            },
                            {
                              label: "Edit",
                              onClick: () => console.log("Edit clicked"),
                            },
                          ],
                        },
                      ]}
                    />
                  </Box>
                </Card>
              </Stack>
            </section>

            {/* Menu with Sections */}
            <section>
              <Text size="large">Menu with Sections</Text>
              <Card>
                <Box padding="base">
                  <Menu
                    items={[
                      {
                        actions: [
                          {
                            label: "View",
                            onClick: () => console.log("View clicked"),
                            icon: "eye",
                          },
                          {
                            label: "Edit",
                            onClick: () => console.log("Edit clicked"),
                          },
                        ],
                      },
                      {
                        actions: [
                          {
                            label: "Archive",
                            onClick: () => console.log("Archive clicked"),
                            icon: "archive",
                          },
                          {
                            label: "Delete",
                            onClick: () => console.log("Delete clicked"),
                            destructive: true,
                            icon: "trash",
                          },
                        ],
                      },
                    ]}
                  />
                </Box>
              </Card>
            </section>

            {/* Menu Variations */}
            <section>
              <Text size="large">Menu Variations</Text>
              <Stack gap="base">
                <Card>
                  <Box padding="base">
                    <Cluster>
                      <Menu
                        items={[
                          {
                            actions: [
                              {
                                label: "Option 1",
                                onClick: () => console.log("Option 1 clicked"),
                              },
                              {
                                label: "Option 2",
                                onClick: () => console.log("Option 2 clicked"),
                              },
                            ],
                          },
                        ]}
                      />

                      <Menu
                        items={[
                          {
                            actions: [
                              {
                                label: "Option 1",
                                onClick: () => console.log("Option 1 clicked"),
                              },
                              {
                                label: "Option 2",
                                onClick: () => console.log("Option 2 clicked"),
                              },
                            ],
                          },
                        ]}
                      />
                    </Cluster>
                  </Box>
                </Card>
              </Stack>
            </section>

            {/* Menu with Icons */}
            <section>
              <Text size="large">Menu with Icons</Text>
              <Card>
                <Box padding="base">
                  <Menu
                    items={[
                      {
                        actions: [
                          {
                            label: "Account Settings",
                            onClick: () =>
                              console.log("Account Settings clicked"),
                            icon: "user",
                          },
                          {
                            label: "Notifications",
                            onClick: () => console.log("Notifications clicked"),
                          },
                          {
                            label: "Security",
                            onClick: () => console.log("Security clicked"),
                            icon: "lock",
                          },
                          {
                            label: "Help",
                            onClick: () => console.log("Help clicked"),
                            icon: "help",
                          },
                          {
                            label: "Logout",
                            onClick: () => console.log("Logout clicked"),
                            icon: "logout",
                          },
                        ],
                      },
                    ]}
                  />
                </Box>
              </Card>
            </section>

            {/* Menu with URLs */}
            <section>
              <Text size="large">Menu with URLs</Text>
              <Card>
                <Box padding="base">
                  <Menu
                    items={[
                      {
                        actions: [
                          {
                            label: "Dashboard",
                            icon: "home",
                          },
                          {
                            label: "Profile",
                            icon: "user",
                          },
                          {
                            label: "Settings",
                            icon: "alert",
                          },
                          {
                            label: "External Link",
                            icon: "link",
                          },
                        ],
                      },
                    ]}
                  />
                </Box>
              </Card>
            </section>

            {/* Menu with Disabled Items */}
            <section>
              <Text size="large">Menu with Disabled Items</Text>
              <Card>
                <Box padding="base">
                  <Menu
                    items={[
                      {
                        actions: [
                          {
                            label: "Available Action",
                            onClick: () =>
                              console.log("Available Action clicked"),
                          },
                          {
                            label: "Disabled Action",
                            onClick: () =>
                              console.log("This should not trigger"),
                          },
                          {
                            label: "Another Available Action",
                            onClick: () =>
                              console.log("Another Available Action clicked"),
                          },
                          {
                            label: "Another Disabled Action",
                            onClick: () =>
                              console.log("This should not trigger either"),
                          },
                        ],
                      },
                    ]}
                  />
                </Box>
              </Card>
            </section>

            {/* Menu in Context */}
            <section>
              <Text size="large">Menu in Context</Text>
              <Card
                header={{
                  title: "User Profile",
                  action: {
                    type: Menu,
                    key: "profile-menu",
                    props: {
                      icon: "more",
                      items: [
                        {
                          actions: [
                            {
                              label: "Edit Profile",
                              onClick: () =>
                                console.log("Edit Profile clicked"),
                            },
                            {
                              label: "Change Password",
                              onClick: () =>
                                console.log("Change Password clicked"),
                              icon: "lock",
                            },
                            {
                              label: "Delete Account",
                              onClick: () =>
                                console.log("Delete Account clicked"),
                              destructive: true,
                              icon: "trash",
                            },
                          ],
                        },
                      ],
                    },
                  },
                }}
              >
                <Box padding="base">
                  <Stack>
                    <Cluster gap="small" align="center" autoWidth>
                      <Avatar initials="JS" size="large" />
                      <Stack gap="tight" autoWidth>
                        <Text size="large">John Smith</Text>
                        <Text variation="subdued">john.smith@example.com</Text>
                      </Stack>
                    </Cluster>
                    <Text>
                      This card shows a Menu component used in a Card header
                      context.
                    </Text>
                  </Stack>
                </Box>
              </Card>
            </section>
          </Stack>
        </Stack>
        {/* Text Examples */}
        <Stack>
          <Heading level={3}>Text Examples</Heading>
          <Stack gap="large">
            {/* Text Sizes */}
            <section>
              <Text size="large">Text Sizes</Text>
              <Stack gap="base">
                <Text size="small">This is small text</Text>
                <Text size="base">This is base text (default)</Text>
                <Text size="large">This is large text</Text>
              </Stack>
            </section>

            {/* Text Variations */}
            <section>
              <Text size="large">Text Variations</Text>
              <Stack gap="base">
                <Text variation="default">Default text variation</Text>
                <Text variation="subdued">Subdued text variation</Text>
                <Text variation="success">Success text variation</Text>
                <Text variation="error">Error text variation</Text>
              </Stack>
            </section>

            {/* Text Weights */}
            <section>
              <Text size="large">Text Weights</Text>
              <Stack gap="base">
                <Emphasis variation="bold">Bold weight text</Emphasis>
                <Text>Normal weight text</Text>
              </Stack>
            </section>

            {/* Text Alignment */}
            <section>
              <Text size="large">Text Alignment</Text>
              <Stack gap="base">
                <Text align="start">Left aligned text (default)</Text>
                <Text align="center">Center aligned text</Text>
                <Text align="end">Right aligned text</Text>
              </Stack>
            </section>

            {/* Text Truncation */}
            <section>
              <Text size="large">Text Truncation</Text>
              <Box width={200} border="base" padding="base">
                <Text>
                  This text is truncated because it&apos;s too long to fit in
                  the container and has the truncate property set.
                </Text>
              </Box>
            </section>

            {/* Text with HTML Tags */}
            <section>
              <Text size="large">Text with HTML Tags</Text>
              <Stack gap="base">
                <Text>
                  Text can have <strong>bold parts</strong> and{" "}
                  <em>emphasized parts</em> using HTML tags.
                </Text>
                <Text>
                  You can also use <a href="https://example.com">links</a>{" "}
                  within Text components.
                </Text>
              </Stack>
            </section>

            {/* Text with Inline Elements */}
            <section>
              <Text size="large">Text with Inline Elements</Text>
              <Stack gap="base">
                <Text>
                  Normal text with <Text variation="success">success text</Text>{" "}
                  inline.
                </Text>
                <Emphasis variation="bold">
                  Base text with <Text size="large">large text</Text> and{" "}
                  <Emphasis variation="bold">bold text</Emphasis> inline.
                </Emphasis>
              </Stack>
            </section>
          </Stack>
        </Stack>
        {/* Heading Examples */}
        <Stack>
          <Heading level={3}>Heading Examples</Heading>
          <Stack gap="large">
            {/* Heading Levels */}
            <section>
              <Text size="large">Heading Levels</Text>
              <Stack gap="base">
                <Heading level={3}>Heading Level 3</Heading>
                <Heading level={4}>Heading Level 4</Heading>
                <Heading level={5}>Heading Level 5</Heading>
                <Heading level={6}>Heading Level 6</Heading>
              </Stack>
            </section>

            {/* Custom Elements */}
            <section>
              <Text size="large">Custom Elements</Text>
              <Stack gap="base">
                <Card>
                  <Box padding="base">
                    <Heading level={2} element="span">
                      This is a Level 2 Heading rendered as a span
                    </Heading>
                  </Box>
                </Card>
                <Card>
                  <Box padding="base">
                    <Heading level={4} element="p">
                      This is a Level 4 Heading rendered as a paragraph
                    </Heading>
                  </Box>
                </Card>
              </Stack>
            </section>

            {/* Headings in Context */}
            <section>
              <Text size="large">Headings in Context</Text>
              <Card>
                <Box padding="base">
                  <Stack>
                    <Heading level={2}>Article Title</Heading>
                    <Text variation="subdued">Published on April 11, 2025</Text>
                    <Heading level={3}>Introduction</Heading>
                    <Text>
                      This is a sample article introduction paragraph showing
                      headings in context.
                    </Text>
                    <Heading level={4}>Key Points</Heading>
                    <Text>• This demonstrates proper heading hierarchy</Text>
                    <Text>• Multiple heading levels create structure</Text>
                    <Text>• Content becomes more scannable and accessible</Text>
                    <Heading level={4}>Conclusion</Heading>
                    <Text>
                      This example shows how headings of different levels can be
                      used to create structure in content.
                    </Text>
                  </Stack>
                </Box>
              </Card>
            </section>

            {/* Heading with Other Components */}
            <section>
              <Text size="large">Heading with Other Components</Text>
              <Stack gap="base">
                <Card>
                  <Box padding="base">
                    <Stack>
                      <Cluster align="center" gap="small">
                        <Heading level={3}>Section Title</Heading>
                        <StatusIndicator status="success" />
                      </Cluster>
                      <Text>
                        This example shows a heading paired with a
                        StatusIndicator component.
                      </Text>
                    </Stack>
                  </Box>
                </Card>

                <Card>
                  <Box padding="base">
                    <Stack>
                      <Cluster
                        align="center"
                        gap="base"
                        justify="space-between"
                      >
                        <Heading level={3}>Dashboard Overview</Heading>
                        <Button
                          label="Refresh"
                          icon="recurring"
                          type="secondary"
                          size="small"
                        />
                      </Cluster>
                      <Text>
                        This example shows a heading with an accompanying action
                        button.
                      </Text>
                    </Stack>
                  </Box>
                </Card>
              </Stack>
            </section>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
