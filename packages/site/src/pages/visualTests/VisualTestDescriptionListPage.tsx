import {
  Box,
  DescriptionList,
  Grid,
  Heading,
  Icon,
  Link,
  Stack,
  StatusIndicator,
  Text,
} from "@jobber/components";

export const VisualTestDescriptionListPage = () => {
  // Basic example data
  const basicData: [string, React.ReactNode][] = [
    ["Name", "John Smith"],
    ["Email", "john.smith@example.com"],
    ["Phone", "(555) 123-4567"],
    ["Address", "123 Main St, Anytown, USA"],
  ];

  // Job details example data
  const jobData: [string, React.ReactNode][] = [
    ["Job Type", "Maintenance"],
    ["Status", "In Progress"],
    ["Client", "Jane Doe"],
    ["Due Date", "2024-04-15"],
    ["Total", "$250.00"],
  ];

  // Invoice details with formatting
  const invoiceData: [string, React.ReactNode][] = [
    ["Invoice Number", "#INV-2024-001"],
    [
      "Status",
      <Stack key="status" align="center" gap="small">
        <StatusIndicator status="success" />
        <Text>Paid</Text>
      </Stack>,
    ],
    [
      "Client",
      <Link key="client" url="#" external={true}>
        View Client Profile
      </Link>,
    ],
    ["Issue Date", "2024-03-01"],
    ["Due Date", "2024-03-31"],
    [
      "Amount",
      <Text key="amount" variation="success">
        $1,250.00
      </Text>,
    ],
  ];

  // Property details with icons
  const propertyData: [string, React.ReactNode][] = [
    [
      "Property Type",
      <Stack key="propertyType" align="center" gap="small">
        <Icon name="home" />
        <Text>Residential</Text>
      </Stack>,
    ],
    [
      "Square Footage",
      <Stack key="squareFootage" align="center" gap="small">
        <Icon name="search" />
        <Text>2,500 sq ft</Text>
      </Stack>,
    ],
    [
      "Bedrooms",
      <Stack key="bedrooms" align="center" gap="small">
        <Icon name="user" />
        <Text>4</Text>
      </Stack>,
    ],
    [
      "Bathrooms",
      <Stack key="bathrooms" align="center" gap="small">
        <Icon name="help" />
        <Text>2.5</Text>
      </Stack>,
    ],
  ];

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>DescriptionList Examples</Heading>

        <Stack gap="large">
          {/* Basic Example */}
          <section>
            <Text size="large">Basic Contact Information</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <DescriptionList data={basicData} />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Job Details Example */}
          <section>
            <Text size="large">Job Details</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <DescriptionList data={jobData} />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Invoice Details with Formatting */}
          <section>
            <Text size="large">Invoice Details with Formatting</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <DescriptionList data={invoiceData} />
              </Grid.Cell>
            </Grid>
          </section>

          {/* Property Details with Icons */}
          <section>
            <Text size="large">Property Details with Icons</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <DescriptionList data={propertyData} />
              </Grid.Cell>
            </Grid>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
