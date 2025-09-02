import React, { useRef, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Modal } from "@jobber/components/Modal";
import { Content } from "@jobber/components/Content";
import type { ModalProps } from "@jobber/components/Modal";
import { Button } from "@jobber/components/Button";
import { Text } from "@jobber/components/Text";
import { InputText } from "@jobber/components/InputText";
import { Form } from "@jobber/components/Form";
import {
  Autocomplete,
  Box,
  Combobox,
  ConfirmationModal,
  Heading,
  Icon,
  InputDate,
  Menu,
  Popover,
  Tab,
  Tabs,
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
        </Modal.Content>
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

interface TabValues {
  name: string;
  description: string;
}

function TabsDirtyModal(args: ModalProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [savedValues, setSavedValues] = useState<Array<TabValues>>([
    { name: "", description: "" },
    { name: "", description: "" },
    { name: "", description: "" },
  ]);
  const [editingValues, setEditingValues] = useState<Array<TabValues>>([
    { name: "", description: "" },
    { name: "", description: "" },
    { name: "", description: "" },
  ]);
  const [tabsDirty, setTabsDirty] = useState<boolean[]>([false, false, false]);
  const [formKeys, setFormKeys] = useState<number[]>([0, 0, 0]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingTab, setPendingTab] = useState<number | null>(null);
  const [closeAfterConfirm, setCloseAfterConfirm] = useState(false);

  function isTabDirty(index: number) {
    const edit = editingValues[index];
    const save = savedValues[index];

    return (
      tabsDirty[index] ||
      edit.name !== save.name ||
      edit.description !== save.description
    );
  }

  return (
    <>
      <Modal
        {...args}
        open={modalOpen}
        onRequestClose={() => {
          if (isTabDirty(activeTab)) {
            setCloseAfterConfirm(true);
            setConfirmOpen(true);

            return;
          }
          setModalOpen(false);
        }}
      >
        <Content>
          <Tabs
            activeTab={activeTab}
            onTabChange={(nextTabIndex: number) => {
              if (nextTabIndex === activeTab) return;

              if (isTabDirty(activeTab)) {
                setPendingTab(nextTabIndex);
                setConfirmOpen(true);

                return;
              }
              setActiveTab(nextTabIndex);
            }}
          >
            <Tab label="General">
              <Content>
                <Form
                  key={formKeys[0]}
                  onStateChange={({ isDirty }) =>
                    setTabsDirty(prev => {
                      const next = [...prev];
                      next[0] = isDirty;

                      return next;
                    })
                  }
                  onSubmit={() => {
                    setSavedValues(prev => {
                      const next = [...prev];
                      next[0] = { ...editingValues[0] };

                      return next;
                    });

                    setFormKeys(prev => {
                      const next = [...prev];
                      next[0] += 1;

                      return next;
                    });

                    setTabsDirty(prev => {
                      const next = [...prev];
                      next[0] = false;

                      return next;
                    });
                  }}
                >
                  <InputText
                    name="name"
                    defaultValue={savedValues[0].name}
                    value={editingValues[0].name}
                    onChange={(val: string) =>
                      setEditingValues(prev => {
                        const next = [...prev];
                        next[0] = { ...next[0], name: val };

                        return next;
                      })
                    }
                    placeholder="Name"
                  />
                  <InputText
                    name="description"
                    defaultValue={savedValues[0].description}
                    value={editingValues[0].description}
                    onChange={(val: string) =>
                      setEditingValues(prev => {
                        const next = [...prev];
                        next[0] = { ...next[0], description: val };

                        return next;
                      })
                    }
                    placeholder="Description"
                  />
                  <Button submit={true} disabled={!tabsDirty[0]}>
                    {tabsDirty[0] ? "Save changes" : "Saved"}
                  </Button>
                </Form>
              </Content>
            </Tab>
            <Tab label="Details">
              <Content>
                <Form
                  key={formKeys[1]}
                  onStateChange={({ isDirty }) =>
                    setTabsDirty(prev => {
                      const next = [...prev];
                      next[1] = isDirty;

                      return next;
                    })
                  }
                  onSubmit={() => {
                    setSavedValues(prev => {
                      const next = [...prev];
                      next[1] = { ...editingValues[1] };

                      return next;
                    });

                    setFormKeys(prev => {
                      const next = [...prev];
                      next[1] += 1;

                      return next;
                    });

                    setTabsDirty(prev => {
                      const next = [...prev];
                      next[1] = false;

                      return next;
                    });
                  }}
                >
                  <InputText
                    name="name"
                    defaultValue={savedValues[1].name}
                    value={editingValues[1].name}
                    onChange={(val: string) =>
                      setEditingValues(prev => {
                        const next = [...prev];
                        next[1] = { ...next[1], name: val };

                        return next;
                      })
                    }
                    placeholder="Name"
                  />
                  <InputText
                    name="description"
                    defaultValue={savedValues[1].description}
                    value={editingValues[1].description}
                    onChange={(val: string) =>
                      setEditingValues(prev => {
                        const next = [...prev];
                        next[1] = { ...next[1], description: val };

                        return next;
                      })
                    }
                    placeholder="Description"
                  />
                  <Button submit={true} disabled={!tabsDirty[1]}>
                    {tabsDirty[1] ? "Save changes" : "Saved"}
                  </Button>
                </Form>
              </Content>
            </Tab>
            <Tab label="Advanced">
              <Content>
                <Form
                  key={formKeys[2]}
                  onStateChange={({ isDirty }) =>
                    setTabsDirty(prev => {
                      const next = [...prev];
                      next[2] = isDirty;

                      return next;
                    })
                  }
                  onSubmit={() => {
                    setSavedValues(prev => {
                      const next = [...prev];
                      next[2] = { ...editingValues[2] };

                      return next;
                    });

                    setFormKeys(prev => {
                      const next = [...prev];
                      next[2] += 1;

                      return next;
                    });

                    setTabsDirty(prev => {
                      const next = [...prev];
                      next[2] = false;

                      return next;
                    });
                  }}
                >
                  <InputText
                    name="name"
                    defaultValue={savedValues[2].name}
                    value={editingValues[2].name}
                    onChange={(val: string) =>
                      setEditingValues(prev => {
                        const next = [...prev];
                        next[2] = { ...next[2], name: val };

                        return next;
                      })
                    }
                    placeholder="Name"
                  />
                  <InputText
                    name="description"
                    defaultValue={savedValues[2].description}
                    value={editingValues[2].description}
                    onChange={(val: string) =>
                      setEditingValues(prev => {
                        const next = [...prev];
                        next[2] = { ...next[2], description: val };

                        return next;
                      })
                    }
                    placeholder="Description"
                  />
                  <Button submit={true} disabled={!tabsDirty[2]}>
                    {tabsDirty[2] ? "Save changes" : "Saved"}
                  </Button>
                </Form>
              </Content>
            </Tab>
          </Tabs>
        </Content>
      </Modal>

      <Button label="Open Modal" onClick={() => setModalOpen(true)} />

      <ConfirmationModal
        open={confirmOpen}
        title="Discard unsaved changes?"
        message="You have unsaved changes. Continuing will discard them."
        confirmLabel="Discard changes"
        cancelLabel="Cancel"
        variation="destructive"
        onConfirm={() => {
          setEditingValues(prev => {
            const next = [...prev];
            next[activeTab] = { ...savedValues[activeTab] };

            return next;
          });
          setFormKeys(prev => {
            const next = [...prev];
            next[activeTab] += 1;

            return next;
          });
          setTabsDirty(prev => {
            const next = [...prev];
            next[activeTab] = false;

            return next;
          });

          if (pendingTab !== null) {
            setActiveTab(pendingTab);
            setPendingTab(null);
          }

          if (closeAfterConfirm) {
            setModalOpen(false);
            setCloseAfterConfirm(false);
          }

          setConfirmOpen(false);
        }}
        onCancel={() => {
          setConfirmOpen(false);
          setPendingTab(null);
          setCloseAfterConfirm(false);
        }}
      />
    </>
  );
}

const ModalWithTabsDirtyGuardTemplate: ComponentStory<typeof Modal> = args => (
  <TabsDirtyModal {...args} />
);

export const WithTabsAndDirtyGuard = ModalWithTabsDirtyGuardTemplate.bind({});
WithTabsAndDirtyGuard.args = {
  title: "Edit preferences",
  size: "large",
};

interface RHFTabValues {
  tabs: Array<{ name: string; description: string }>;
}

function RHFTabsDirtyModal(args: ModalProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingTab, setPendingTab] = useState<number | null>(null);
  const [closeAfterConfirm, setCloseAfterConfirm] = useState(false);

  const [baseline, setBaseline] = useState<RHFTabValues>({
    tabs: [
      { name: "", description: "" },
      { name: "", description: "" },
      { name: "", description: "" },
    ],
  });

  const methods = useForm<RHFTabValues>({
    mode: "onTouched",
    defaultValues: baseline,
    shouldUnregister: false,
  });

  const {
    control,
    reset,
    setValue,
    getValues,
    formState: { dirtyFields },
  } = methods;

  return (
    <>
      <Modal
        {...args}
        open={modalOpen}
        onRequestClose={() => {
          if (isCurrentTabDirty()) {
            setCloseAfterConfirm(true);
            setConfirmOpen(true);

            return;
          }
          setModalOpen(false);
        }}
      >
        <Content>
          <FormProvider {...methods}>
            <Tabs
              activeTab={activeTab}
              onTabChange={(nextTabIndex: number) => {
                if (nextTabIndex === activeTab) return;

                if (isCurrentTabDirty()) {
                  setPendingTab(nextTabIndex);
                  setConfirmOpen(true);

                  return;
                }

                setActiveTab(nextTabIndex);
              }}
            >
              <Tab label="General">
                <Content>
                  {renderTabFields(0)}
                  <Button
                    submit={true}
                    disabled={!isTabDirty(0)}
                    onMouseDown={saveActiveTab(0)}
                  >
                    {isTabDirty(0) ? "Save changes" : "Saved"}
                  </Button>
                </Content>
              </Tab>
              <Tab label="Details">
                <Content>
                  {renderTabFields(1)}
                  <Button
                    submit={true}
                    disabled={!isTabDirty(1)}
                    onMouseDown={saveActiveTab(1)}
                  >
                    {isTabDirty(1) ? "Save changes" : "Saved"}
                  </Button>
                </Content>
              </Tab>
              <Tab label="Advanced">
                <Content>
                  {renderTabFields(2)}
                  <Button
                    submit={true}
                    disabled={!isTabDirty(2)}
                    onMouseDown={saveActiveTab(2)}
                  >
                    {isTabDirty(2) ? "Save changes" : "Saved"}
                  </Button>
                </Content>
              </Tab>
            </Tabs>
          </FormProvider>
        </Content>
      </Modal>

      <Button label="Open Modal (RHF)" onClick={() => setModalOpen(true)} />

      <ConfirmationModal
        open={confirmOpen}
        title="Discard unsaved changes?"
        message="You have unsaved changes. Continuing will discard them."
        confirmLabel="Discard changes"
        cancelLabel="Cancel"
        variation="destructive"
        onConfirm={() => {
          // revert current tab's values back to baseline and clear dirty
          const i = activeTab;
          setValue(`tabs.${i}.name` as const, baseline.tabs[i].name, {
            shouldDirty: false,
          });
          setValue(
            `tabs.${i}.description` as const,
            baseline.tabs[i].description,
            {
              shouldDirty: false,
            },
          );

          reset(baseline, { keepValues: true });

          if (pendingTab !== null) {
            setActiveTab(pendingTab);
            setPendingTab(null);
          }

          if (closeAfterConfirm) {
            setModalOpen(false);
            setCloseAfterConfirm(false);
          }

          setConfirmOpen(false);
        }}
        onCancel={() => {
          setConfirmOpen(false);
          setPendingTab(null);
          setCloseAfterConfirm(false);
        }}
      />
    </>
  );

  function renderTabFields(index: number) {
    return (
      <>
        <Controller
          control={control}
          name={`tabs.${index}.name` as const}
          render={({ field: { value, onChange } }) => (
            <InputText
              value={value ?? ""}
              onChange={onChange}
              placeholder="Name"
            />
          )}
        />
        <Controller
          control={control}
          name={`tabs.${index}.description` as const}
          render={({ field: { value, onChange } }) => (
            <InputText
              value={value ?? ""}
              onChange={onChange}
              placeholder="Description"
            />
          )}
        />
      </>
    );
  }

  function isTabDirty(index: number) {
    const df = (
      dirtyFields as unknown as {
        tabs?: Array<{ name?: boolean; description?: boolean }>;
      }
    )?.tabs?.[index];

    return Boolean(df?.name || df?.description);
  }

  function isCurrentTabDirty() {
    return isTabDirty(activeTab);
  }

  function saveActiveTab(index: number) {
    return () => {
      const current = getValues();
      const nextBaseline: RHFTabValues = {
        tabs: [...baseline.tabs],
      };
      nextBaseline.tabs[index] = { ...current.tabs[index] };

      setBaseline(nextBaseline);
      reset(nextBaseline, { keepValues: true });
    };
  }
}

const RHFTabsDirtyModalTemplate: ComponentStory<typeof Modal> = args => (
  <RHFTabsDirtyModal {...args} />
);

export const WithTabsUsingReactHookForm = RHFTabsDirtyModalTemplate.bind({});
WithTabsUsingReactHookForm.args = {
  title: "Edit preferences (RHF)",
  size: "large",
};
