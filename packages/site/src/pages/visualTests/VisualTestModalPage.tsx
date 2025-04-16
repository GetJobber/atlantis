import {
  Box,
  Button,
  Card,
  Cluster,
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

  return (
    <Box padding="large">
      <Stack gap="extravagant">
        {/* Modal Examples */}
        <Stack>
          <Heading level={1}>Modal Examples</Heading>
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
              <Modal
                version={2}
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
                version={2}
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
                version={2}
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
                version={2}
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
                version={2}
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
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
