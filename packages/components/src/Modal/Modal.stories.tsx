import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "@jobber/components/Modal";
import { Content } from "@jobber/components/Content";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";
import { InputText } from "@jobber/components/InputText";
import {
  Autocomplete,
  Banner,
  Box,
  Combobox,
  Flex,
  Heading,
  Icon,
  InputDate,
  Menu,
  Popover,
  Tooltip,
  useModalContext,
  useModalStyles,
} from "@jobber/components";
import type { Option as AutocompleteOption } from "@jobber/components/Autocomplete";
import { Option, Select } from "@jobber/components/Select";

const meta = {
  title: "Components/Overlays/Modal",
  component: Modal,
} satisfies Meta<typeof Modal>;
export default meta;
type Story = StoryObj<
  Pick<
    React.ComponentProps<typeof Modal>,
    "title" | "size" | "dismissible" | "ariaLabel"
  >
>;

const BasicTemplate = (args: Story["args"]) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Modal
        {...args}
        open={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <Content>
          <Text>It&apos;s harder, better, faster, and stronger! 🤖</Text>
        </Content>
      </Modal>
      <Button label="Open Modal" onClick={() => setModalOpen(true)} />
    </>
  );
};

export const Basic: Story = {
  render: BasicTemplate,
  args: {
    title: "We've updated Jobber",
  },
};

const ActionTemplate = (args: Story["args"]) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState<string>("");

  return (
    <>
      <Modal
        {...args}
        open={modalOpen}
        primaryAction={{ label: "Submit", onClick: handlePrimaryAction }}
        secondaryAction={{
          label: "Cancel",
          onClick: handleSecondaryAction,
        }}
        tertiaryAction={{ label: "Delete", onClick: handleTertiaryAction }}
        onRequestClose={toggleModal}
      >
        <Content>
          <Text>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe vero
            ratione praesentium quisquam non porro ullam maiores iure, sed odio?
          </Text>
          {value && <Text>{value}</Text>}
          <InputText value={value} onChange={(val: string) => setValue(val)} />
        </Content>
      </Modal>
      <Button label="Open Modal" onClick={toggleModal} />
    </>
  );

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function handlePrimaryAction() {
    alert(value + " ✅");
    setModalOpen(false);
  }

  function handleSecondaryAction() {
    setModalOpen(false);
  }

  function handleTertiaryAction() {
    alert("❌");
  }
};

export const ActionTypes: Story = {
  render: ActionTemplate,
  args: {
    title: "Atlantis Modals are Action Packed!",
  },
};

function CustomHeader() {
  const { header } = useModalStyles();
  const { onRequestClose } = useModalContext();

  return (
    <div className={header}>
      <Heading level={2}>Custom Header</Heading>
      <Menu
        items={[
          {
            actions: [
              { label: "Close Modal", onClick: onRequestClose },
              {
                label: "Another Action",
                onClick: () => alert("Another Action"),
              },
            ],
          },
        ]}
      />
    </div>
  );
}

const ModalWithProviderExampleTemplate = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<
    Array<{ id: string | number; label: string }>
  >([]);

  const options = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" },
    { id: "3", label: "Option 3" },
    { id: "4", label: "Option 4" },
  ];
  const [inputDateValue, setInputDateValue] = useState<Date | undefined>();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const buttonPopoverRef = useRef<HTMLDivElement>(null);
  const [autocompleteValue, setAutocompleteValue] = useState<
    AutocompleteOption | undefined
  >();

  return (
    <Content>
      <Text>
        This is an example of a modal using the modal provider for rendering the
        modal. This can be used to change where the modal will return focus to
        after it has been closed. This is done with the Modal.Activator
        component
      </Text>

      <Button
        label="Open Modal with Custom Focus"
        onClick={() => setModalOpen(true)}
      />
      <Modal.Provider
        open={modalOpen}
        onRequestClose={() => {
          setModalOpen(false);
          setPopoverOpen(false);
        }}
      >
        <Modal.Content>
          <Modal.Header>
            <CustomHeader />
          </Modal.Header>
          <Content>
            <Text>
              This is an example of a modal using the modal provider for
              rendering the modal. This modal also includes various components
              that &quot;float&quot; in the UI.
            </Text>
            <div ref={buttonPopoverRef}>
              <Button
                label="Show Information"
                onClick={() => setPopoverOpen(!popoverOpen)}
                type="secondary"
                fullWidth
              />
            </div>
            <Popover
              open={popoverOpen}
              attachTo={buttonPopoverRef}
              onRequestClose={() => setPopoverOpen(false)}
              preferredPlacement="right"
            >
              <Box padding="base">
                <Text>This is a popover that floats in the UI.</Text>
                <Text>
                  Popovers are useful for displaying context-specific
                  information without cluttering the interface.
                </Text>
              </Box>
            </Popover>
            <Combobox
              selected={selectedOptions}
              onSelect={selection => setSelectedOptions(selection)}
              multiSelect
              subjectNoun="options"
            >
              {options.map(option => (
                <Combobox.Option
                  key={option.id}
                  id={option.id}
                  label={option.label}
                />
              ))}
              <Combobox.Action
                label="Add Teammate"
                onClick={() => alert("Added a new teammate ✅")}
              />
              <Combobox.Action
                label="Manage Teammates"
                onClick={() => alert("Managed teammates 👍")}
                keepOpenOnClick
              />
            </Combobox>

            <InputDate
              onChange={setInputDateValue}
              value={inputDateValue}
              placeholder="Enter your date"
            />
            <Select>
              <Option value="1">Option 1</Option>
              <Option value="2">Option 2</Option>
              <Option value="3">Option 3</Option>
            </Select>
            <Autocomplete
              value={autocompleteValue}
              onChange={newValue => setAutocompleteValue(newValue)}
              getOptions={() => [
                { value: "option1", label: "First Option" },
                { value: "option2", label: "Second Option" },
                { value: "option3", label: "Third Option" },
              ]}
              placeholder="Search options..."
            />

            <Tooltip message="This field cannot be left empty">
              <Icon name="help" color="blue" />
            </Tooltip>
          </Content>
          <Modal.Actions
            primary={{ label: "Submit", onClick: () => setModalOpen(false) }}
            secondary={{ label: "Cancel", onClick: () => setModalOpen(false) }}
          />
        </Modal.Content>
        <Modal.Activator>
          <InputText placeholder="Modal will return focus here" />
        </Modal.Activator>
      </Modal.Provider>
    </Content>
  );
};
export const ModalWithProviderExample: Story = {
  render: ModalWithProviderExampleTemplate,
};

const ModalWithDatePickerTestTemplate = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputDateValue, setInputDateValue] = useState<Date | undefined>();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const buttonPopoverRef = useRef<HTMLDivElement>(null);

  return (
    <Content>
      <Button
        label="Open Modal with Custom Focus"
        onClick={() => setModalOpen(true)}
      />
      <Modal.Provider
        open={modalOpen}
        onRequestClose={() => {
          setModalOpen(false);
          setPopoverOpen(false);
        }}
      >
        <Modal.Content>
          <Modal.Header>
            <CustomHeader />
          </Modal.Header>
          <Content>
            <div ref={buttonPopoverRef}>
              <Button
                label="Show Information"
                onClick={() => setPopoverOpen(!popoverOpen)}
                type="secondary"
                fullWidth
              />
            </div>
            <Popover
              open={popoverOpen}
              attachTo={buttonPopoverRef}
              onRequestClose={() => setPopoverOpen(false)}
              preferredPlacement="right"
            >
              <Box padding="base">
                <Text>This is a popover that floats in the UI.</Text>
                <Text>
                  Popovers are useful for displaying context-specific
                  information without cluttering the interface.
                </Text>
              </Box>
            </Popover>

            <InputDate
              onChange={setInputDateValue}
              value={inputDateValue}
              placeholder="Enter your date"
            />
          </Content>
        </Modal.Content>
        <Modal.Activator>
          <InputText placeholder="Modal will return focus here" />
        </Modal.Activator>
      </Modal.Provider>
    </Content>
  );
};
export const ModalWithDatePickerTest: Story = {
  render: ModalWithDatePickerTestTemplate,
};

const NestedExampleTemplate = (args: Story["args"]) => {
  const [outerModalOpen, setOuterModalOpen] = useState(false);
  const [innerModalOpen, setInnerModalOpen] = useState(false);

  return (
    <Content>
      <Banner type="warning" dismissible={false}>
        <Banner.Content>
          Nesting Modals beyond two levels is strongly discouraged. It often
          leads to a poor user experience. This example is demonstrating how to
          do it, not necessarily recommending it.
        </Banner.Content>
      </Banner>
      <Button
        label="Open Outer Modal"
        onClick={() => setOuterModalOpen(true)}
      />

      <Modal.Provider
        open={outerModalOpen}
        onRequestClose={() => {
          setOuterModalOpen(false);
        }}
      >
        <Modal.Content>
          <Modal.Header title={args?.title ?? "Outer Modal"} />
          <Content>
            <Text>
              This is the outer modal. You can interact with components here and
              open another modal inside it.
            </Text>

            <Button
              label="Open Inner Modal"
              onClick={() => setInnerModalOpen(true)}
              type="secondary"
              fullWidth
            />
          </Content>
          <Modal.Provider
            open={innerModalOpen}
            onRequestClose={() => setInnerModalOpen(false)}
          >
            <Modal.Content>
              <Modal.Header title="Inner Modal" />
              <Content>
                <Flex template={["shrink", "shrink"]}>
                  <Text>This is the inner modal!</Text>
                  <Tooltip message="Exercise caution when nesting modals beyond this level.">
                    <Icon name="info" color="yellow" />
                  </Tooltip>
                </Flex>
                <Text>
                  You can close this modal independently, or close both modals
                  together.
                </Text>
              </Content>
              <Modal.Actions
                primary={{
                  label: "Close Inner Modal",
                  onClick: () => setInnerModalOpen(false),
                }}
                secondary={{
                  label: "Close Both Modals",
                  onClick: () => {
                    setInnerModalOpen(false);
                    setOuterModalOpen(false);
                  },
                }}
              />
            </Modal.Content>
          </Modal.Provider>
        </Modal.Content>
      </Modal.Provider>
    </Content>
  );
};
export const NestedExample: Story = {
  render: NestedExampleTemplate,
  args: {
    title: "Outer Modal",
  },
};

const ModalBodyTemplate = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Modal.Provider
        open={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <Modal.Content>
          <Modal.Header title="Modal with Body" />
          <Modal.Body>
            <Content>
              <Text>
                This content is inside Modal.Body, which owns its own padding
                and scroll behavior. The header and actions stay fixed while
                this area scrolls.
              </Text>
              <InputText placeholder="First field" />
              <InputText placeholder="Second field" />
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
              <InputText placeholder="Third field" />
              <Text>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </Text>
              <InputText placeholder="Fourth field" />
              <InputText placeholder="Fifth field" />
              <Text>
                More content to demonstrate scrolling within the Modal.Body
                while the header and action bar remain fixed.
              </Text>
            </Content>
          </Modal.Body>
          <Modal.Actions
            primary={{ label: "Save", onClick: () => setModalOpen(false) }}
            secondary={{ label: "Cancel", onClick: () => setModalOpen(false) }}
          />
        </Modal.Content>
      </Modal.Provider>
      <Button label="Open Modal with Body" onClick={() => setModalOpen(true)} />
    </>
  );
};

export const WithBody: Story = {
  render: ModalBodyTemplate,
};

const ModalBodyFullWidthTemplate = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Modal.Provider
        open={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        spacing="none"
      >
        <Modal.Content>
          <Modal.Header title="Full Width Content" />
          <Modal.Body>
            <Box padding="base" background="surface--background">
              <Text>
                This section spans the full width of the modal. Useful for
                images, tables, or other content that should go edge-to-edge.
              </Text>
            </Box>
            <Content>
              <Text>
                With spacing set to &quot;none&quot;, the Modal.Body removes its
                internal padding. Individual sections can manage their own
                spacing as needed using Box or Content.
              </Text>
              <InputText placeholder="An input inside a padded section" />
            </Content>
          </Modal.Body>
          <Modal.Actions
            primary={{ label: "Done", onClick: () => setModalOpen(false) }}
            secondary={{ label: "Cancel", onClick: () => setModalOpen(false) }}
          />
        </Modal.Content>
      </Modal.Provider>
      <Button
        label="Open Full Width Modal"
        onClick={() => setModalOpen(true)}
      />
    </>
  );
};

export const WithBodyFullWidth: Story = {
  render: ModalBodyFullWidthTemplate,
};

function ScrollComparisonBody() {
  return (
    <Content>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
      <InputText placeholder="First field" />
      <InputText placeholder="Second field" />
      <Text>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur.
      </Text>
      <InputText placeholder="Third field" />
      <InputText placeholder="Fourth field" />
      <Text>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde
        omnis iste natus error sit voluptatem.
      </Text>
      <InputText placeholder="Fifth field" />
      <InputText placeholder="Sixth field" />
    </Content>
  );
}

const ScrollBehaviorComparisonTemplate = () => {
  const [innerOpen, setInnerOpen] = useState(false);
  const [outerOpen, setOuterOpen] = useState(false);

  return (
    <Flex template={["shrink", "shrink"]} gap="base">
      <Button
        label="Inner scroll (default)"
        onClick={() => setInnerOpen(true)}
      />
      <Modal.Provider
        open={innerOpen}
        onRequestClose={() => setInnerOpen(false)}
      >
        <Modal.Content>
          <Modal.Header title="Inner Scroll" />
          <Modal.Body>
            <ScrollComparisonBody />
          </Modal.Body>
          <Modal.Actions
            primary={{ label: "Save", onClick: () => setInnerOpen(false) }}
            secondary={{ label: "Cancel", onClick: () => setInnerOpen(false) }}
          />
        </Modal.Content>
      </Modal.Provider>

      <Button
        label="Outer scroll"
        onClick={() => setOuterOpen(true)}
        type="secondary"
      />
      <Modal.Provider
        open={outerOpen}
        onRequestClose={() => setOuterOpen(false)}
        scrollBehavior="outer"
      >
        <Modal.Content>
          <Modal.Header title="Outer Scroll" />
          <Modal.Body>
            <ScrollComparisonBody />
          </Modal.Body>
          <Modal.Actions
            primary={{ label: "Save", onClick: () => setOuterOpen(false) }}
            secondary={{ label: "Cancel", onClick: () => setOuterOpen(false) }}
          />
        </Modal.Content>
      </Modal.Provider>
    </Flex>
  );
};

export const ScrollBehaviorComparison: Story = {
  render: ScrollBehaviorComparisonTemplate,
};
