import {
  Cluster,
  Heading,
  Rectangle,
  ResponsiveSwitcher,
  SideKick,
  Stack,
  Text,
} from "@jobber/components";

export const LayoutPage = () => {
  return (
    <Rectangle padding="large" colorSurface="color-surface-subtle">
      <Stack space="large">
        {/* Header Section */}
        <Rectangle padding="base" colorSurface="color-surface">
          <Stack space="base">
            <Cluster justify="between" align="center">
              <Heading level={1}>Backyard hardscape</Heading>
              <Cluster space="small">
                <Rectangle padding="small" borderWidth="1px">
                  More
                </Rectangle>
                <Rectangle padding="small" colorSurface="color-interactive">
                  Convert to Quote
                </Rectangle>
              </Cluster>
            </Cluster>

            {/* Client Info */}
            <Rectangle padding="base" borderWidth="1px">
              <Stack space="small">
                <Text>&lt;Client name&gt;</Text>
                <Text>&lt;Client address&gt;</Text>
                <Cluster>
                  <Text>&lt;Client phone&gt;</Text>
                  <Text>&lt;Client email&gt;</Text>
                </Cluster>
                <Cluster>
                  <Text>Lead source:</Text>
                  <Text>Google Ad</Text>
                </Cluster>
              </Stack>
            </Rectangle>

            {/* Request Info */}
            <Cluster space="large">
              <Cluster space="small">
                <Text>Requested</Text>
                <Text>Aug 28, 2024</Text>
              </Cluster>
              <Cluster space="small">
                <Text>Referral source</Text>
                <Text>Website</Text>
              </Cluster>
              <Cluster space="small">
                <Text>Used for</Text>
                <Text>Job #23</Text>
              </Cluster>
            </Cluster>
          </Stack>
        </Rectangle>

        {/* Main Content */}
        <SideKick>
          {/* Left Side */}
          <Rectangle padding="base" colorSurface="color-surface">
            <Stack space="large">
              <Stack space="base">
                <Heading level={2}>Overview</Heading>
                <Stack space="small">
                  <Heading level={3}>Service details</Heading>
                  <Text>Please provide as much information as you can</Text>
                  <Text>
                    Client just bought a new house and is looking to re-pave the
                    front driveway
                  </Text>
                </Stack>
                <Stack space="base">
                  <Heading level={3}>Your availability</Heading>
                  <Stack space="small">
                    <Text>
                      Which day would be best for an assessment of the work?
                    </Text>
                    <Text>Aug 29, 2024</Text>
                    <Text>What is another day that works for you?</Text>
                    <Text>Aug 30, 2024</Text>
                    <Text>What are your preferred arrival times?</Text>
                    <Text>Any time</Text>
                    <Stack space="minuscule">
                      <Text>Morning</Text>
                      <Text>Afternoon</Text>
                      <Text>Evening</Text>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Rectangle>

          {/* Right Side */}
          <Rectangle padding="base" colorSurface="color-surface">
            <Stack space="base">
              <Heading level={2}>On-site assessment</Heading>
              <Text>
                Visit the property to assess the job before you do the work
              </Text>
            </Stack>
          </Rectangle>
        </SideKick>

        {/* Notes Section */}
        <Rectangle padding="base" colorSurface="color-surface">
          <Stack space="base">
            <Cluster justify="between" align="center">
              <Heading level={2}>Notes</Heading>
              <Rectangle padding="small" borderWidth="1px">
                Add
              </Rectangle>
            </Cluster>
            <Rectangle padding="base" borderWidth="1px">
              <Stack space="small">
                <Cluster align="center" space="small">
                  <Text>Chris Murray</Text>
                  <Text>Created: Dec 12, 2024 1:29PM</Text>
                </Cluster>
                <Text>
                  Remember to get photos of the foundation where we&apos;d tie
                  in
                </Text>
                <ResponsiveSwitcher threshold="sm" space="small">
                  <Rectangle borderWidth="1px" padding="small">
                    Image 1
                  </Rectangle>
                  <Rectangle borderWidth="1px" padding="small">
                    Image 2
                  </Rectangle>
                  <Rectangle borderWidth="1px" padding="small">
                    Image 3
                  </Rectangle>
                  <Rectangle borderWidth="1px" padding="small">
                    Image 4
                  </Rectangle>
                </ResponsiveSwitcher>
              </Stack>
            </Rectangle>
          </Stack>
        </Rectangle>
      </Stack>
    </Rectangle>
  );
};
