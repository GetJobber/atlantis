import {
  Box,
  Cluster,
  Grid,
  Heading,
  Icon,
  IconNames,
  Stack,
  Text,
} from "@jobber/components";

export const VisualTestIconPage = () => {
  return (
    <Box padding="large">
      <Stack gap="extravagant">
        <Heading level={3}>Icon Examples</Heading>

        <Stack gap="large">
          {/* Icon Sizes */}
          <section>
            <Text size="large">Icon Sizes</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Stack gap="small" align="start">
                  <Cluster gap="small" align="center">
                    <Icon name="star" size="small" />
                    <Text>Small Icon</Text>
                  </Cluster>
                  <Cluster gap="small" align="center">
                    <Icon name="star" size="base" />
                    <Text>Base Icon (Default)</Text>
                  </Cluster>
                  <Cluster gap="small" align="center">
                    <Icon name="star" size="large" />
                    <Text>Large Icon</Text>
                  </Cluster>
                </Stack>
              </Grid.Cell>
            </Grid>
          </section>

          {/* System Colors */}
          <section>
            <Text size="large">System Colors</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Cluster gap="small">
                  <Box padding="base">
                    <Stack gap="small" align="center">
                      <Icon name="star" color="blue" />
                      <Text>Blue</Text>
                    </Stack>
                  </Box>
                  <Box padding="base">
                    <Stack gap="small" align="center">
                      <Icon name="star" color="green" />
                      <Text>Green</Text>
                    </Stack>
                  </Box>
                  <Box padding="base">
                    <Stack gap="small" align="center">
                      <Icon name="star" color="red" />
                      <Text>Red</Text>
                    </Stack>
                  </Box>
                  <Box padding="base">
                    <Stack gap="small" align="center">
                      <Icon name="star" color="yellow" />
                      <Text>Yellow</Text>
                    </Stack>
                  </Box>
                  <Box padding="base">
                    <Stack gap="small" align="center">
                      <Icon name="star" color="orange" />
                      <Text>Orange</Text>
                    </Stack>
                  </Box>
                </Cluster>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Common Icons */}
          <section>
            <Text size="large">Common Icons</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Cluster gap="small">
                  <Box padding="base">
                    <Stack gap="small" align="center">
                      <Icon name="add" />
                      <Text>Add</Text>
                    </Stack>
                  </Box>
                  <Box padding="base">
                    <Stack gap="small" align="center">
                      <Icon name="edit" />
                      <Text>Edit</Text>
                    </Stack>
                  </Box>
                  <Box padding="base">
                    <Stack gap="small" align="center">
                      <Icon name="trash" />
                      <Text>Trash</Text>
                    </Stack>
                  </Box>
                  <Box padding="base">
                    <Stack gap="small" align="center">
                      <Icon name="search" />
                      <Text>Search</Text>
                    </Stack>
                  </Box>
                  <Box padding="base">
                    <Stack gap="small" align="center">
                      <Icon name="checkmark" />
                      <Text>Checkmark</Text>
                    </Stack>
                  </Box>
                </Cluster>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Status Icons */}
          <section>
            <Text size="large">Status Icons</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Cluster gap="small">
                  <Box padding="base">
                    <Stack gap="small" align="center">
                      <Icon name="info" color="blue" />
                      <Text>Info</Text>
                    </Stack>
                  </Box>
                  <Box padding="base">
                    <Stack gap="small" align="center">
                      <Icon name="alert" color="red" />
                      <Text>Alert</Text>
                    </Stack>
                  </Box>
                  <Box padding="base">
                    <Stack gap="small" align="center">
                      <Icon name="warning" color="yellow" />
                      <Text>Warning</Text>
                    </Stack>
                  </Box>
                  <Box padding="base">
                    <Stack gap="small" align="center">
                      <Icon name="help" color="greyBlue" />
                      <Text>Help</Text>
                    </Stack>
                  </Box>
                </Cluster>
              </Grid.Cell>
            </Grid>
          </section>

          {/* Custom Color */}
          <section>
            <Text size="large">Custom Color</Text>
            <Grid>
              <Grid.Cell size={{ xs: 12, md: 6 }}>
                <Cluster gap="small">
                  <Box padding="base">
                    <Stack gap="small" align="center">
                      <Icon name="star" customColor="#9C27B0" />
                      <Text>Custom Purple</Text>
                    </Stack>
                  </Box>
                  <Box padding="base">
                    <Stack gap="small" align="center">
                      <Icon name="star" customColor="#FF4081" />
                      <Text>Custom Pink</Text>
                    </Stack>
                  </Box>
                  <Box padding="base">
                    <Stack gap="small" align="center">
                      <Icon name="star" customColor="#795548" />
                      <Text>Custom Brown</Text>
                    </Stack>
                  </Box>
                </Cluster>
              </Grid.Cell>
            </Grid>
          </section>

          {/* All Available Icons */}
          <section>
            <Text size="large">All Available Icons</Text>

            {/* Arrows */}
            <Stack gap="small">
              <Heading level={2}>Arrows</Heading>
              <Cluster gap="small">
                {(
                  [
                    "arrowDown",
                    "arrowLeft",
                    "arrowRight",
                    "arrowUp",
                    "longArrowDown",
                    "longArrowLeft",
                    "longArrowRight",
                    "longArrowUp",
                  ] as IconNames[]
                ).map(name => (
                  <Box key={name} padding="base">
                    <Stack gap="small" align="center">
                      <Icon name={name} />
                      <Text>{name}</Text>
                    </Stack>
                  </Box>
                ))}
              </Cluster>
            </Stack>

            {/* Calendar & Scheduling */}
            <Stack gap="small">
              <Heading level={2}>Calendar & Scheduling</Heading>
              <Grid>
                <Grid.Cell size={{ xs: 12, md: 12 }}>
                  <Cluster gap="small">
                    {(
                      [
                        "afterDate",
                        "availability",
                        "beforeDate",
                        "calendar",
                        "clearFilters",
                        "event",
                        "onlineBooking",
                        "schedule",
                        "task",
                        "timeline",
                        "today",
                        "recurring",
                        "sliderStart",
                        "sliderCenter",
                      ] as IconNames[]
                    ).map(name => (
                      <Box key={name} padding="base">
                        <Stack gap="small" align="center">
                          <Icon name={name} />
                          <Text>{name}</Text>
                        </Stack>
                      </Box>
                    ))}
                  </Cluster>
                </Grid.Cell>
              </Grid>
            </Stack>

            {/* Files */}
            <Stack gap="small">
              <Heading level={2}>Files</Heading>
              <Grid>
                <Grid.Cell size={{ xs: 12, md: 12 }}>
                  <Cluster gap="small">
                    {(
                      [
                        "addNote",
                        "archive",
                        "excel",
                        "file",
                        "note",
                        "pdf",
                        "video",
                        "word",
                        "upload",
                        "image",
                        "paperclip",
                      ] as IconNames[]
                    ).map(name => (
                      <Box key={name} padding="base">
                        <Stack gap="small" align="center">
                          <Icon name={name} />
                          <Text>{name}</Text>
                        </Stack>
                      </Box>
                    ))}
                  </Cluster>
                </Grid.Cell>
              </Grid>
            </Stack>

            {/* Forms */}
            <Stack gap="small">
              <Heading level={2}>Forms</Heading>
              <Grid>
                <Grid.Cell size={{ xs: 12, md: 12 }}>
                  <Cluster gap="small">
                    {(
                      [
                        "checkbox",
                        "edit",
                        "star",
                        "starHalf",
                        "starFill",
                        "textBox",
                        "textField",
                        "dropdown",
                        "trash",
                      ] as IconNames[]
                    ).map(name => (
                      <Box key={name} padding="base">
                        <Stack gap="small" align="center">
                          <Icon name={name} />
                          <Text>{name}</Text>
                        </Stack>
                      </Box>
                    ))}
                  </Cluster>
                </Grid.Cell>
              </Grid>
            </Stack>

            {/* Status and Support */}
            <Stack gap="small">
              <Heading level={2}>Status and Support</Heading>
              <Grid>
                <Grid.Cell size={{ xs: 12, md: 12 }}>
                  <Cluster gap="small">
                    {(
                      [
                        "alert",
                        "warning",
                        "info",
                        "help",
                        "knot",
                      ] as IconNames[]
                    ).map(name => (
                      <Box key={name} padding="base">
                        <Stack gap="small" align="center">
                          <Icon name={name} />
                          <Text>{name}</Text>
                        </Stack>
                      </Box>
                    ))}
                  </Cluster>
                </Grid.Cell>
              </Grid>
            </Stack>

            {/* Map */}
            <Stack gap="small">
              <Heading level={2}>Map</Heading>
              <Grid>
                <Grid.Cell size={{ xs: 12, md: 12 }}>
                  <Cluster gap="small">
                    {(
                      [
                        "address",
                        "moveMarker",
                        "property",
                        "directions",
                      ] as IconNames[]
                    ).map(name => (
                      <Box key={name} padding="base">
                        <Stack gap="small" align="center">
                          <Icon name={name} />
                          <Text>{name}</Text>
                        </Stack>
                      </Box>
                    ))}
                  </Cluster>
                </Grid.Cell>
              </Grid>
            </Stack>

            {/* Messaging */}
            <Stack gap="small">
              <Heading level={2}>Messaging</Heading>
              <Grid>
                <Grid.Cell size={{ xs: 12, md: 12 }}>
                  <Cluster gap="small">
                    {(
                      [
                        "chat",
                        "email",
                        "markSent",
                        "reminder",
                        "sms",
                        "sms2",
                        "sendMessage",
                        "compose",
                        "marketing",
                      ] as IconNames[]
                    ).map(name => (
                      <Box key={name} padding="base">
                        <Stack gap="small" align="center">
                          <Icon name={name} />
                          <Text>{name}</Text>
                        </Stack>
                      </Box>
                    ))}
                  </Cluster>
                </Grid.Cell>
              </Grid>
            </Stack>

            {/* User */}
            <Stack gap="small">
              <Heading level={2}>User</Heading>
              <Grid>
                <Grid.Cell size={{ xs: 12, md: 12 }}>
                  <Cluster gap="small">
                    {(
                      [
                        "clients",
                        "person",
                        "company",
                        "user",
                        "userSwitch",
                        "userUnassigned",
                        "vcard",
                      ] as IconNames[]
                    ).map(name => (
                      <Box key={name} padding="base">
                        <Stack gap="small" align="center">
                          <Icon name={name} />
                          <Text>{name}</Text>
                        </Stack>
                      </Box>
                    ))}
                  </Cluster>
                </Grid.Cell>
              </Grid>
            </Stack>

            {/* Social Media */}
            <Stack gap="small">
              <Heading level={2}>Social Media</Heading>
              <Grid>
                <Grid.Cell size={{ xs: 12, md: 12 }}>
                  <Cluster gap="small">
                    {(
                      [
                        "angieslist",
                        "facebook",
                        "googlePlay",
                        "google",
                        "instagram",
                        "linkedIn",
                        "twitter",
                        "yelp",
                        "youtube",
                        "embed",
                      ] as IconNames[]
                    ).map(name => (
                      <Box key={name} padding="base">
                        <Stack gap="small" align="center">
                          <Icon name={name} />
                          <Text>{name}</Text>
                        </Stack>
                      </Box>
                    ))}
                  </Cluster>
                </Grid.Cell>
              </Grid>
            </Stack>

            {/* Transaction */}
            <Stack gap="small">
              <Heading level={2}>Transaction</Heading>
              <Grid>
                <Grid.Cell size={{ xs: 12, md: 12 }}>
                  <Cluster gap="small">
                    {(
                      [
                        "bank",
                        "payment",
                        "percent",
                        "wallet",
                        "money",
                        "transfer",
                      ] as IconNames[]
                    ).map(name => (
                      <Box key={name} padding="base">
                        <Stack gap="small" align="center">
                          <Icon name={name} />
                          <Text>{name}</Text>
                        </Stack>
                      </Box>
                    ))}
                  </Cluster>
                </Grid.Cell>
              </Grid>
            </Stack>

            {/* Work */}
            <Stack gap="small">
              <Heading level={2}>Work</Heading>
              <Grid>
                <Grid.Cell size={{ xs: 12, md: 12 }}>
                  <Cluster gap="small">
                    {(
                      [
                        "chemical",
                        "clockIn",
                        "clockOut",
                        "expense",
                        "timer",
                        "work",
                        "runningTimer",
                      ] as IconNames[]
                    ).map(name => (
                      <Box key={name} padding="base">
                        <Stack gap="small" align="center">
                          <Icon name={name} />
                          <Text>{name}</Text>
                        </Stack>
                      </Box>
                    ))}
                  </Cluster>
                </Grid.Cell>
              </Grid>
            </Stack>

            {/* Request, Quote, Job */}
            <Stack gap="small">
              <Heading level={2}>Request, Quote & Job</Heading>
              <Grid>
                <Grid.Cell size={{ xs: 12, md: 12 }}>
                  <Cluster gap="small">
                    {(
                      [
                        "request",
                        "quote",
                        "job",
                        "jobOnHold",
                        "moveVisits",
                        "visit",
                      ] as IconNames[]
                    ).map(name => (
                      <Box key={name} padding="base">
                        <Stack gap="small" align="center">
                          <Icon name={name} />
                          <Text>{name}</Text>
                        </Stack>
                      </Box>
                    ))}
                  </Cluster>
                </Grid.Cell>
              </Grid>
            </Stack>

            {/* Invoice */}
            <Stack gap="small">
              <Heading level={2}>Invoice</Heading>
              <Grid>
                <Grid.Cell size={{ xs: 12, md: 12 }}>
                  <Cluster gap="small">
                    {(
                      [
                        "badInvoice",
                        "invoice",
                        "invoiceLater",
                        "paidInvoice",
                        "sendInvoice",
                      ] as IconNames[]
                    ).map(name => (
                      <Box key={name} padding="base">
                        <Stack gap="small" align="center">
                          <Icon name={name} />
                          <Text>{name}</Text>
                        </Stack>
                      </Box>
                    ))}
                  </Cluster>
                </Grid.Cell>
              </Grid>
            </Stack>

            {/* Fleet Management */}
            <Stack gap="small">
              <Heading level={2}>Fleet Management</Heading>
              <Grid>
                <Grid.Cell size={{ xs: 12, md: 12 }}>
                  <Cluster gap="small">
                    {(["truck", "fuel", "engine"] as IconNames[]).map(name => (
                      <Box key={name} padding="base">
                        <Stack gap="small" align="center">
                          <Icon name={name} />
                          <Text>{name}</Text>
                        </Stack>
                      </Box>
                    ))}
                  </Cluster>
                </Grid.Cell>
              </Grid>
            </Stack>

            {/* System Actions */}
            <Stack gap="small">
              <Heading level={2}>System Actions</Heading>
              <Grid>
                <Grid.Cell size={{ xs: 12, md: 12 }}>
                  <Cluster gap="small">
                    {(
                      [
                        "add",
                        "addTag",
                        "automate",
                        "batch",
                        "condition",
                        "copy",
                        "customize",
                        "download",
                        "drag",
                        "embed",
                        "export",
                        "filter",
                        "future",
                        "import",
                        "redo",
                        "remove",
                        "search",
                        "sort",
                        "sync",
                        "syncAlert",
                        "tag",
                        "updateStatus",
                      ] as IconNames[]
                    ).map(name => (
                      <Box key={name} padding="base">
                        <Stack gap="small" align="center">
                          <Icon name={name} />
                          <Text>{name}</Text>
                        </Stack>
                      </Box>
                    ))}
                  </Cluster>
                </Grid.Cell>
              </Grid>
            </Stack>

            {/* Other */}
            <Stack gap="small">
              <Heading level={2}>Other</Heading>
              <Grid>
                <Grid.Cell size={{ xs: 12, md: 12 }}>
                  <Cluster gap="small">
                    {(
                      [
                        "headset",
                        "apps",
                        "camera",
                        "checkmark",
                        "cog",
                        "dashboard",
                        "eye",
                        "eyeCrossed",
                        "gift",
                        "grid",
                        "happyFace",
                        "home",
                        "link",
                        "loadingCheck",
                        "lock",
                        "logout",
                        "menu",
                        "microphone",
                        "microphoneMuted",
                        "more",
                        "offline",
                        "phone",
                        "pinned",
                        "presentation",
                        "quickbooks",
                        "reports",
                        "signature",
                        "sneaker",
                        "sparkles",
                        "starburst",
                        "sun",
                        "tableColumns",
                        "thumbsUp",
                        "thumbsDown",
                        "unPinned",
                        "xero",
                      ] as IconNames[]
                    ).map(name => (
                      <Box key={name} padding="base">
                        <Stack gap="small" align="center">
                          <Icon name={name} />
                          <Text>{name}</Text>
                        </Stack>
                      </Box>
                    ))}
                  </Cluster>
                </Grid.Cell>
              </Grid>
            </Stack>

            {/* Legacy */}
            <Stack gap="small">
              <Heading level={2}>Legacy</Heading>
              <Grid>
                <Grid.Cell size={{ xs: 12, md: 12 }}>
                  <Cluster gap="small">
                    {(
                      [
                        "apple",
                        "cross",
                        "list",
                        "minus",
                        "minus2",
                        "plus",
                        "plus2",
                      ] as IconNames[]
                    ).map(name => (
                      <Box key={name} padding="base">
                        <Stack gap="small" align="center">
                          <Icon name={name} />
                          <Text>{name}</Text>
                        </Stack>
                      </Box>
                    ))}
                  </Cluster>
                </Grid.Cell>
              </Grid>
            </Stack>
          </section>
        </Stack>
      </Stack>
    </Box>
  );
};
