import {
  Avatar,
  Banner,
  Box,
  Button,
  Card,
  Cluster,
  Heading,
  Stack,
  StatusIndicator,
  Text,
} from "@jobber/components";
import { PageWrapper } from "../layout/PageWrapper";

export const VisualTestComponentPage = () => {
  return (
    <PageWrapper>
      <main
        style={{
          boxShadow: "var(--shadow-base)",
          borderRadius: "var(--radius-base) var(--radius-base) 0 0",
          position: "relative",
          flexGrow: 1,
          backgroundColor: "var(--color-surface)",
          padding: "var(--space-large)",
        }}
      >
        <Stack space="extravagant">
          {/* Button Examples */}
          <Stack>
            <Heading level={1}>Button Examples</Heading>
            <Stack space="large">
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
            <Heading level={1}>Avatar Examples</Heading>
            <Stack space="large">
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
                    imageUrl="http://placehold.co/300x300"
                    name="John Doe"
                  />
                  <Avatar
                    imageUrl="http://placehold.co/300x300"
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
            <Heading level={1}>StatusIndicator Examples</Heading>
            <Stack space="large">
              {/* All Status Types */}
              <section>
                <Text size="large">All Status Types</Text>
                <Card>
                  <Box padding="base">
                    <Cluster>
                      <Cluster space="small">
                        <StatusIndicator status="success" />
                        <Text>Success</Text>
                      </Cluster>
                      <Cluster space="small">
                        <StatusIndicator status="warning" />
                        <Text>Warning</Text>
                      </Cluster>
                      <Cluster space="small">
                        <StatusIndicator status="critical" />
                        <Text>Critical</Text>
                      </Cluster>
                      <Cluster space="small">
                        <StatusIndicator status="inactive" />
                        <Text>Inactive</Text>
                      </Cluster>
                      <Cluster space="small">
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
                <Stack space="base">
                  <Card>
                    <Box padding="base">
                      <Cluster space="small" align="center">
                        <StatusIndicator status="success" />
                        <Text>System Status: Online</Text>
                      </Cluster>
                    </Box>
                  </Card>
                  <Card>
                    <Box padding="base">
                      <Cluster space="small" align="center">
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
            <Heading level={1}>Banner Examples</Heading>
            <Stack space="large">
              {/* Basic Banner Types */}
              <section>
                <Text size="large">Basic Banner Types</Text>
                <Stack space="base">
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
                <Stack space="base">
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
                <Stack space="base">
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
                <Stack space="base">
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
        </Stack>
      </main>
    </PageWrapper>
  );
};
