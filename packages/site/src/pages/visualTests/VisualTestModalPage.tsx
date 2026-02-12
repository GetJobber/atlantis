import {
  Box,
  Button,
  Card,
  Cluster,
  Content,
  Heading,
  InputEmail,
  InputText,
  Modal,
  Stack,
  Tab,
  Tabs,
  Text,
} from "@jobber/components";
import { useState } from "react";

export const VisualTestModalPage = () => {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [largeModalOpen, setLargeModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [tabModalOpen, setTabModalOpen] = useState(false);
  const [narrowContentModalOpen, setNarrowContentModalOpen] = useState(false);
  const [overflowModalOpen, setOverflowModalOpen] = useState(false);

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        {/* Modal Examples */}
        <Stack>
          <Heading level={3}>Modal Examples</Heading>
          <Stack gap="large">
            {/* Basic Modal Types */}
            <section>
              <Text size="large">Basic Modal Types</Text>
              <Cluster>
                <Button
                  label="Open Basic Modal"
                  onClick={() => setBasicModalOpen(true)}
                />
                <Button
                  label="Open Confirmation Modal"
                  onClick={() => setConfirmationModalOpen(true)}
                  type="secondary"
                />
                <Button
                  label="Open Custom Modal"
                  onClick={() => setCustomModalOpen(true)}
                  variation="work"
                />
              </Cluster>

              {/* Basic Modal */}
              <Modal
                title="Basic Modal"
                open={basicModalOpen}
                onRequestClose={() => setBasicModalOpen(false)}
                primaryAction={{
                  label: "Primary Action",
                  onClick: () => setBasicModalOpen(false),
                }}
                secondaryAction={{
                  label: "Secondary Action",
                  onClick: () => setBasicModalOpen(false),
                }}
              >
                <Box padding="large">
                  <Text>
                    This is a basic modal with a title, content, and primary and
                    secondary actions.
                  </Text>
                </Box>
              </Modal>

              {/* Confirmation Modal */}
              <Modal
                title="Confirmation Modal"
                open={confirmationModalOpen}
                onRequestClose={() => setConfirmationModalOpen(false)}
                primaryAction={{
                  label: "Confirm",
                  onClick: () => setConfirmationModalOpen(false),
                  variation: "work",
                }}
                secondaryAction={{
                  label: "Cancel",
                  onClick: () => setConfirmationModalOpen(false),
                }}
                tertiaryAction={{
                  label: "Learn More",
                  onClick: () => window.open("https://example.com", "_blank"),
                }}
              >
                <Box padding="large">
                  <Text>
                    This is a confirmation modal with primary, secondary, and
                    tertiary actions.
                  </Text>
                </Box>
              </Modal>

              {/* Custom Modal */}
              <Modal
                title="Custom Modal"
                open={customModalOpen}
                onRequestClose={() => setCustomModalOpen(false)}
                primaryAction={{
                  label: "Acknowledge",
                  onClick: () => setCustomModalOpen(false),
                }}
              >
                <Box padding="large">
                  <Stack gap="base">
                    <Text>
                      This modal demonstrates customization options. It can
                      include various content and styling.
                    </Text>
                    <Text variation="subdued">
                      Custom styling can help provide visual context about the
                      purpose of the modal.
                    </Text>
                  </Stack>
                </Box>
              </Modal>
            </section>

            {/* Modal Sizes */}
            <section>
              <Text size="large">Modal Sizes</Text>
              <Cluster>
                <Button
                  label="Open Large Modal"
                  onClick={() => setLargeModalOpen(true)}
                />
              </Cluster>

              {/* Large Modal */}
              <Modal
                title="Large Modal"
                open={largeModalOpen}
                onRequestClose={() => setLargeModalOpen(false)}
                primaryAction={{
                  label: "Save",
                  onClick: () => setLargeModalOpen(false),
                }}
                secondaryAction={{
                  label: "Cancel",
                  onClick: () => setLargeModalOpen(false),
                }}
                size="large"
              >
                <Box padding="large">
                  <Stack gap="large">
                    <Text>
                      This is a large modal that provides more space for
                      content. It&apos;s useful for displaying complex
                      information or forms that require more real estate.
                    </Text>
                    <Card>
                      <Box padding="base">
                        <Text>
                          Large modals can contain more complex UI elements like
                          cards, tables, or multi-step forms.
                        </Text>
                      </Box>
                    </Card>
                    <Stack>
                      <Text>Some key features of large modals:</Text>
                      <Text>• More space for complex content</Text>
                      <Text>• Better for multi-step processes</Text>
                      <Text>• Can display more information at once</Text>
                      <Text>• Still maintains focus on a specific task</Text>
                    </Stack>
                  </Stack>
                </Box>
              </Modal>
            </section>

            {/* Modal with Form */}
            <section>
              <Text size="large">Modal with Form</Text>
              <Button
                label="Open Form Modal"
                onClick={() => setFormModalOpen(true)}
              />

              <Modal
                title="Form Modal"
                open={formModalOpen}
                onRequestClose={() => setFormModalOpen(false)}
                primaryAction={{
                  label: "Submit",
                  onClick: () => setFormModalOpen(false),
                }}
                secondaryAction={{
                  label: "Cancel",
                  onClick: () => setFormModalOpen(false),
                }}
              >
                <Box padding="large">
                  <Stack gap="large">
                    <Text>
                      Modals are commonly used to present forms that require
                      user input.
                    </Text>
                    <InputText placeholder="Enter your name" />
                    <InputEmail placeholder="Enter your email" />
                    <InputText
                      placeholder="Enter your message"
                      multiline
                      rows={3}
                    />
                  </Stack>
                </Box>
              </Modal>
            </section>

            {/* Modal with Tabs */}
            <section>
              <Text size="large">Modal with Tabs</Text>
              <Button
                label="Open Modal with Tabs"
                onClick={() => setTabModalOpen(true)}
              />

              <Modal
                title="Modal with Tabs"
                open={tabModalOpen}
                onRequestClose={() => setTabModalOpen(false)}
                primaryAction={{
                  label: "Save",
                  onClick: () => setTabModalOpen(false),
                }}
                secondaryAction={{
                  label: "Cancel",
                  onClick: () => setTabModalOpen(false),
                }}
                size="large"
              >
                <Stack gap="base">
                  <Box padding="large">
                    <Text>
                      Modals can contain tabs to organize content into different
                      sections.
                    </Text>
                  </Box>
                  <Tabs defaultTab={0}>
                    <Tab label="General">
                      <Box padding="base">
                        <Stack gap="base">
                          <Text>
                            This tab contains general settings or information.
                          </Text>
                          <InputText placeholder="Enter a name" />
                          <InputText
                            placeholder="Enter a description"
                            multiline
                            rows={2}
                          />
                        </Stack>
                      </Box>
                    </Tab>
                    <Tab label="Advanced">
                      <Box padding="base">
                        <Stack gap="base">
                          <Text>
                            This tab contains advanced settings or information.
                          </Text>
                          <Card>
                            <Box padding="base">
                              <Text>
                                Advanced options are separated into a different
                                tab to avoid overwhelming users.
                              </Text>
                            </Box>
                          </Card>
                        </Stack>
                      </Box>
                    </Tab>
                    <Tab label="Notifications">
                      <Box padding="base">
                        <Stack gap="base">
                          <Text>This tab contains notification settings.</Text>
                          <Text>
                            Using tabs in modals helps organize complex forms or
                            settings into logical groups.
                          </Text>
                        </Stack>
                      </Box>
                    </Tab>
                  </Tabs>
                </Stack>
              </Modal>
            </section>

            {/* Modal with Dismissible Option */}
            <section>
              <Text size="large">Modal with Dismissible Options</Text>
              <Card>
                <Box padding="base">
                  <Text>
                    Modals can be configured with different dismissal behaviors.
                    By default, modals can be dismissed by clicking outside or
                    pressing the ESC key. This can be controlled with the
                    dismissible prop.
                  </Text>
                </Box>
              </Card>
            </section>

            {/* Large modal with content that does not take up the whole width */}
            <section>
              <Text size="large">
                Large composable modal with narrow content
              </Text>
              <Button
                label="Open Large Modal with Narrow Content"
                onClick={() => setNarrowContentModalOpen(true)}
              />

              <Modal.Provider
                open={narrowContentModalOpen}
                size="large"
                onRequestClose={() => setNarrowContentModalOpen(false)}
              >
                <Modal.Content>
                  <Content>
                    <Text>
                      This is a large composable modal that demonstrates content
                      that doesn&apos;t take up the full width.
                    </Text>
                    <Text>
                      Rendered modal width stillrespects the Modal size prop
                    </Text>
                  </Content>
                </Modal.Content>
              </Modal.Provider>
            </section>

            {/* Modal with overflowing content */}
            <section>
              <Text size="large">Modal with Overflowing Content</Text>
              <Button
                label="Open Modal with Overflowing Content"
                onClick={() => setOverflowModalOpen(true)}
              />

              <Modal.Provider
                open={overflowModalOpen}
                onRequestClose={() => setOverflowModalOpen(false)}
              >
                <Modal.Content>
                  <Modal.Header title="Modal with Overflowing Content" />
                  <Content>
                    <Text>
                      This modal contains a lot of content to test that the
                      max-height constraint works correctly and the modal
                      content scrolls instead of overflowing the viewport.
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Text>
                    <Text>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </Text>
                    <Text>
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore veritatis et
                      quasi architecto beatae vitae dicta sunt explicabo.
                    </Text>
                    <Text>
                      Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                      aut odit aut fugit, sed quia consequuntur magni dolores
                      eos qui ratione voluptatem sequi nesciunt.
                    </Text>
                    <Text>
                      Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                      amet, consectetur, adipisci velit, sed quia non numquam
                      eius modi tempora incidunt ut labore et dolore magnam
                      aliquam quaerat voluptatem.
                    </Text>
                    <Text>
                      Ut enim ad minima veniam, quis nostrum exercitationem
                      ullam corporis suscipit laboriosam, nisi ut aliquid ex ea
                      commodi consequatur? Quis autem vel eum iure reprehenderit
                      qui in ea voluptate velit esse quam nihil molestiae
                      consequatur.
                    </Text>
                    <Text>
                      At vero eos et accusamus et iusto odio dignissimos ducimus
                      qui blanditiis praesentium voluptatum deleniti atque
                      corrupti quos dolores et quas molestias excepturi sint
                      occaecati cupiditate non provident.
                    </Text>
                    <Text>
                      Similique sunt in culpa qui officia deserunt mollitia
                      animi, id est laborum et dolorum fuga. Et harum quidem
                      rerum facilis est et expedita distinctio.
                    </Text>
                    <Text>
                      Nam libero tempore, cum soluta nobis est eligendi optio
                      cumque nihil impedit quo minus id quod maxime placeat
                      facere possimus, omnis voluptas assumenda est, omnis dolor
                      repellendus.
                    </Text>
                    <Text>
                      Temporibus autem quibusdam et aut officiis debitis aut
                      rerum necessitatibus saepe eveniet ut et voluptates
                      repudiandae sint et molestiae non recusandae.
                    </Text>
                    <Text>
                      Itaque earum rerum hic tenetur a sapiente delectus, ut aut
                      reiciendis voluptatibus maiores alias consequatur aut
                      perferendis doloribus asperiores repellat.
                    </Text>
                    <Text>
                      This is additional content to ensure the modal definitely
                      overflows. The modal should have a max-height set and show
                      a scrollbar when content exceeds that height.
                    </Text>
                    <Text>
                      More content here to push the boundaries. The scrollbar
                      should appear when the content height exceeds the
                      available viewport height minus the edge padding.
                    </Text>
                    <Text>
                      Even more content to make absolutely sure we test the
                      overflow behavior. This should be enough to trigger
                      scrolling in most viewport sizes.
                    </Text>
                    <Text>
                      Final paragraph to ensure we have sufficient content to
                      test the max-height constraint and scrolling behavior of
                      the modal component.
                    </Text>
                  </Content>
                  <Modal.Actions
                    primary={{
                      label: "Save",
                      onClick: () => setOverflowModalOpen(false),
                    }}
                    secondary={{
                      label: "Cancel",
                      onClick: () => setOverflowModalOpen(false),
                    }}
                  />
                </Modal.Content>
              </Modal.Provider>
            </section>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
