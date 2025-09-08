import {
  Box,
  Button,
  Card,
  Content,
  Flex,
  Grid,
  Heading,
  Icon,
  InputGroup,
  InputText,
  Stack,
  Text,
} from "@jobber/components";

export function VisualTestCardPage() {
  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={1}>Card Visual Tests</Heading>

        {/* Basic Cards */}
        <section>
          <Heading level={2}>Basic Cards</Heading>
          <Grid>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Card header="Basic Card">
                <Content>
                  <Text>
                    This is a basic card with a simple header and content.
                  </Text>
                </Content>
              </Card>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Card>
                <Content>
                  <Heading level={4}>Card without Header</Heading>
                  <Text>This card has no header prop, just content.</Text>
                </Content>
              </Card>
            </Grid.Cell>
          </Grid>
        </section>

        {/* Elevation Variants */}
        <section>
          <Heading level={2}>Elevation Variants</Heading>
          <Grid>
            <Grid.Cell size={{ xs: 12, md: 6, lg: 3 }}>
              <Card header="No Elevation" elevation="none">
                <Content>
                  <Text>Card with no elevation (flat).</Text>
                </Content>
              </Card>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 12, md: 6, lg: 3 }}>
              <Card header="Base Elevation" elevation="base">
                <Content>
                  <Text>Card with base elevation.</Text>
                </Content>
              </Card>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 12, md: 6, lg: 3 }}>
              <Card header="High Elevation" elevation="high">
                <Content>
                  <Text>Card with high elevation.</Text>
                </Content>
              </Card>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 12, md: 6, lg: 3 }}>
              <Card header="Low Elevation" elevation="low">
                <Content>
                  <Text>Card with low elevation.</Text>
                </Content>
              </Card>
            </Grid.Cell>
          </Grid>
        </section>

        {/* Accent Colors */}
        <section>
          <Heading level={2}>Accent Colors</Heading>
          <Grid>
            <Grid.Cell size={{ xs: 12, md: 4 }}>
              <Card header="Blue Accent" accent="blue" elevation="base">
                <Content>
                  <Text>Card with blue accent color.</Text>
                </Content>
              </Card>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 12, md: 4 }}>
              <Card header="Green Accent" accent="green" elevation="base">
                <Content>
                  <Text>Card with green accent color.</Text>
                </Content>
              </Card>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 12, md: 4 }}>
              <Card header="Purple Accent" accent="purple" elevation="base">
                <Content>
                  <Text>Card with purple accent color.</Text>
                </Content>
              </Card>
            </Grid.Cell>
          </Grid>
        </section>

        {/* Clickable Cards */}
        <section>
          <Heading level={2}>Clickable Cards</Heading>
          <Grid>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Card url="/dashboard" header="Link Card">
                <Content>
                  <Flex template={["grow", "shrink"]} align="center">
                    <Text>This card navigates to a URL when clicked.</Text>
                    <Icon size="small" name="arrowRight" />
                  </Flex>
                </Content>
              </Card>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Card
                onClick={() => console.log("Card clicked")}
                header="Clickable Card"
              >
                <Content>
                  <Flex template={["grow", "shrink"]} align="center">
                    <Text>This card has an onClick handler.</Text>
                    <Icon size="small" name="checkmark" />
                  </Flex>
                </Content>
              </Card>
            </Grid.Cell>
          </Grid>
        </section>

        {/* Header Actions */}
        <section>
          <Heading level={2}>Header Actions</Heading>
          <Grid>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Card
                header={{
                  title: "Settings",
                  action: (
                    <Button
                      icon="cog"
                      type="tertiary"
                      ariaLabel="Configure settings"
                    />
                  ),
                }}
                elevation="base"
              >
                <Content>
                  <InputGroup>
                    <InputText placeholder="Company name" />
                    <InputText placeholder="Email address" />
                  </InputGroup>
                </Content>
              </Card>
            </Grid.Cell>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Card
                header={
                  <Box padding="base">
                    <Flex template={["grow", "shrink"]} align="center">
                      <Heading level={3}>Custom Header</Heading>
                      <Button type="secondary" icon="cross" ariaLabel="Close" />
                    </Flex>
                  </Box>
                }
                elevation="base"
              >
                <Content>
                  <Text>
                    This card uses a custom React element as the header.
                  </Text>
                </Content>
              </Card>
            </Grid.Cell>
          </Grid>
        </section>

        {/* Compound Components */}
        <section>
          <Heading level={2}>Compound Components</Heading>
          <Grid>
            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Card elevation="base">
                <Card.Header>
                  <Box padding="base">
                    <Flex template={["grow", "shrink"]} align="center">
                      <Heading level={4}>Profile Settings</Heading>
                      <Button
                        type="tertiary"
                        icon="more"
                        ariaLabel="More options"
                      />
                    </Flex>
                  </Box>
                </Card.Header>
                <Card.Body>
                  <Content>
                    <InputGroup>
                      <InputText placeholder="First name" />
                      <InputText placeholder="Last name" />
                      <InputText placeholder="Email" />
                    </InputGroup>
                  </Content>
                </Card.Body>
              </Card>
            </Grid.Cell>

            <Grid.Cell size={{ xs: 12, md: 6 }}>
              <Card accent="green" elevation="high">
                <Content>
                  <Card.Header>
                    <Flex template={["grow", "shrink"]} align="center">
                      <Heading level={4}>Success Story</Heading>
                      <Icon name="checkmark" color="green" />
                    </Flex>
                  </Card.Header>
                  <Card.Body>
                    <Text>
                      Your changes have been saved successfully! All your
                      settings are now active.
                    </Text>
                    <Button label="Continue" type="primary" />
                  </Card.Body>
                </Content>
              </Card>
            </Grid.Cell>
          </Grid>
        </section>
      </Stack>
    </Box>
  );
}
