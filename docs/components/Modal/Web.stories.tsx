import React, { useRef, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Modal } from "@jobber/components/Modal";
import { Content } from "@jobber/components/Content";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";
import { InputText } from "@jobber/components/InputText";
import {
  AtlantisThemeContextProvider,
  Autocomplete,
  Box,
  Combobox,
  Heading,
  Icon,
  InputDate,
  Menu,
  Popover,
  Tooltip,
  useModalContext,
  useModalStyles,
} from "@jobber/components";
import { Option as AutocompleteOption } from "@jobber/components/Autocomplete";
import { Option, Select } from "@jobber/components/Select";

export default {
  title: "Components/Overlays/Modal/Web",
  component: Modal,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
} as ComponentMeta<typeof Modal>;

const BasicTemplate: ComponentStory<typeof Modal> = args => {
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

export const Basic = BasicTemplate.bind({});
Basic.args = {
  title: "We've updated Jobber",
};

const ActionTemplate: ComponentStory<typeof Modal> = args => {
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

export const ActionTypes = ActionTemplate.bind({});
ActionTypes.args = {
  title: "Atlantis Modals are Action Packed!",
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

const ModalWithProviderExampleTemplate: ComponentStory<typeof Modal> = () => {
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
        <Modal.Wrapper>
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
        </Modal.Wrapper>
        <Modal.Activator>
          <InputText placeholder="Modal will return focus here" />
        </Modal.Activator>
      </Modal.Provider>
    </Content>
  );
};
export const ModalWithProviderExample = ModalWithProviderExampleTemplate.bind(
  {},
);

const ModalCustomThemeTemplate: ComponentStory<typeof Modal> = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Content>
      <Text>
        This is a modal that will always use the dark theme. The modal is
        wrapped in an AtlantisThemeContextProvider with a dark theme and when it
        is opened it will use dark mode
      </Text>
      <Button
        label="Open Modal with Custom Theme"
        onClick={() => setModalOpen(true)}
      />
      <AtlantisThemeContextProvider dangerouslyOverrideTheme="dark">
        <Modal open={modalOpen} onRequestClose={() => setModalOpen(false)}>
          <Content>
            <Text>This is a modal with a custom theme</Text>
          </Content>
        </Modal>
      </AtlantisThemeContextProvider>
    </Content>
  );
};
export const ModalCustomTheme = ModalCustomThemeTemplate.bind({});
