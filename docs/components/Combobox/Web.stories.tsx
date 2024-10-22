import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  Combobox,
  ComboboxCustomActivatorProps,
  ComboboxOption,
} from "@jobber/components/Combobox";
import { Button } from "@jobber/components/Button";
import { Typography } from "@jobber/components/Typography";
import { Chip } from "@jobber/components/Chip";
import { Icon } from "@jobber/components/Icon";
import { StatusIndicator } from "@jobber/components/StatusIndicator";
import { Content } from "@jobber/components/Content";
import { Card } from "@jobber/components/Card";
import { Heading } from "@jobber/components/Heading";
import { useFakeQuery } from "./storyUtils";

export default {
  title: "Components/Selections/Combobox/Web",
  component: Combobox,
  parameters: {
    viewMode: "story",
    previewTabs: { code: { hidden: false } },
  },
  decorators: [
    // Workaround Storybook's wrapping flex parent that make everything full width
    story => <div>{story()}</div>,
  ],
} as ComponentMeta<typeof Combobox>;

const ComboboxClearSelection: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([
    {
      id: "1",
      label: "Bilbo Baggins",
    },
  ]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Button
        label="Clear Selection"
        type="primary"
        onClick={() => setSelected([])}
      />
      <Combobox
        {...args}
        label="Teammates"
        selected={selected}
        onSelect={setSelected}
      >
        <Combobox.Option id="1" label="Bilbo Baggins" />
        <Combobox.Option id="2" label="Frodo Baggins" />
        <Combobox.Option id="3" label="Pippin Took" />
        <Combobox.Option id="4" label="Merry Brandybuck" />
        <Combobox.Option id="5" label="Sam Gamgee" />
        <Combobox.Option id="6" label="Aragorn" />
        <Combobox.Option id="7" label="Galadriel" />
        <Combobox.Option id="8" label="Arwen" />
        <Combobox.Option id="9" label="Gandalf" />
        <Combobox.Option id="10" label="Legolas" />
        <Combobox.Option id="11" label="Gimli" />
        <Combobox.Option id="12" label="Samwise Gamgee" />
        <Combobox.Option id="14" label="Faramir" />

        <Combobox.Action
          label="Add Teammate"
          onClick={() => {
            alert("Added a new teammate ✅");
          }}
        />
        <Combobox.Action
          label="Manage Teammates"
          onClick={() => {
            alert("Managed teammates 👍");
          }}
        />
      </Combobox>
    </div>
  );
};

const ComboboxCustomActivator: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography element={"h3"} fontFamily={"display"}>
          Custom Activators using Button:
        </Typography>{" "}
        <Combobox {...args} onSelect={setSelected} selected={selected}>
          <Combobox.Activator>
            <Button label={"Tax Rate"} icon={"dropdown"} iconOnRight={true} />
          </Combobox.Activator>
          <Combobox.Option id="1" label="13%" />
          <Combobox.Option id="2" label="15%" />
          <Combobox.Option id="3" label="20%" />

          <Combobox.Action
            label="Add Tax Rate"
            onClick={() => {
              alert("Added a new tax rate ✅");
            }}
          />
        </Combobox>
        <br />
        <Combobox {...args} onSelect={setSelected} selected={selected}>
          <Combobox.Activator>
            <Button
              label={"Tax Rate"}
              icon={"plus"}
              type={"primary"}
              variation={"subtle"}
            />
          </Combobox.Activator>
          <Combobox.Option id="1" label="13%" />
          <Combobox.Option id="2" label="15%" />
          <Combobox.Option id="3" label="20%" />

          <Combobox.Action
            label="Add Tax Rate"
            onClick={() => {
              alert("Added a new tax rate ✅");
            }}
          />
        </Combobox>
        <br />
        <Combobox {...args} onSelect={setSelected} selected={selected}>
          <Combobox.Activator>
            <Button
              label={""}
              icon={"percent"}
              size={"large"}
              type={"secondary"}
            />
          </Combobox.Activator>
          <Combobox.Option id="1" label="13%" />
          <Combobox.Option id="2" label="15%" />
          <Combobox.Option id="3" label="20%" />

          <Combobox.Action
            label="Add Tax Rate"
            onClick={() => {
              alert("Added a new tax rate ✅");
            }}
          />
        </Combobox>
      </div>
      <br />
      <Typography element={"h3"} fontFamily={"display"}>
        Custom Activator using Chip:
      </Typography>
      <Combobox {...args} onSelect={setSelected} selected={selected}>
        <Combobox.Activator>
          <Chip label="" heading={"Tax Rate"} variation={"subtle"}>
            <Chip.Prefix>
              <Icon name={"percent"} size={"small"} />
            </Chip.Prefix>
            <Chip.Suffix>
              <Icon name={"arrowDown"} size={"large"} />
            </Chip.Suffix>
          </Chip>
        </Combobox.Activator>
        <Combobox.Option id="1" label="13%" />
        <Combobox.Option id="2" label="15%" />
        <Combobox.Option id="3" label="20%" />

        <Combobox.Action
          label="Add Tax Rate"
          onClick={() => {
            alert("Added a new tax rate ✅");
          }}
        />
      </Combobox>
      <br />
      <Typography element={"h3"} fontFamily={"display"}>
        Custom Activator using div and render function
      </Typography>
      <Combobox {...args} onSelect={setSelected} selected={selected}>
        <Combobox.Activator>
          {(activatorAPI: ComboboxCustomActivatorProps) => (
            <div
              role={activatorAPI.role}
              tabIndex={0}
              aria-controls={activatorAPI.ariaControls}
              aria-expanded={activatorAPI.ariaExpanded}
              onClick={activatorAPI.toggleOpen}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  activatorAPI.toggleOpen();
                }
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <Heading level={2}>Heading Two</Heading>
              <Icon name={"arrowDown"} />
            </div>
          )}
        </Combobox.Activator>
        <Combobox.Option id="1" label="13%" />
        <Combobox.Option id="2" label="15%" />
        <Combobox.Option id="3" label="20%" />

        <Combobox.Action
          label="Add Tax Rate"
          onClick={() => {
            alert("Added a new tax rate ✅");
          }}
        />
      </Combobox>
    </>
  );
};

const ComboboxEmptyState: ComponentStory<typeof Combobox> = args => {
  return (
    <Combobox {...args} label="Teammates" subjectNoun="teammates" selected={[]}>
      <Combobox.Action
        label="Add Teammate"
        onClick={() => {
          alert("Added a new teammate ✅");
        }}
      />
    </Combobox>
  );
};

const ComboboxPrefixOptions: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);

  return (
    <Combobox
      {...args}
      label="The Fellowship"
      subjectNoun="fellows"
      onSelect={setSelected}
      selected={selected}
    >
      <Combobox.Option
        id="1"
        label="Bilbo"
        prefix={<StatusIndicator status="success" />}
      />
      <Combobox.Option
        id="2"
        label="Samwise"
        prefix={<StatusIndicator status="success" />}
      />
      <Combobox.Option
        id="3"
        label="Pippin"
        prefix={<StatusIndicator status="success" />}
      />
      <Combobox.Option
        id="4"
        label="Merry"
        prefix={<StatusIndicator status="success" />}
      />
      <Combobox.Option
        id="5"
        label="Legolas"
        prefix={<StatusIndicator status="warning" />}
      />
      <Combobox.Option id="6" label="Gandalf" />
      <Combobox.Option id="7" label="Aragorn" />-
      <Combobox.Option
        id="8"
        label="Boromir"
        prefix={<StatusIndicator status="informative" />}
      />
      <Combobox.Option
        id="9"
        label="Gimli"
        prefix={<StatusIndicator status="critical" />}
      />
    </Combobox>
  );
};

const ComboboxMultiSelection: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);

  return (
    <Combobox
      {...args}
      multiSelect
      label="Teammates"
      onSelect={selection => {
        setSelected(selection);
      }}
      selected={selected}
    >
      <Combobox.Option id="1" label="Bilbo Baggins" />
      <Combobox.Option id="2" label="Frodo Baggins" />
      <Combobox.Option id="3" label="Pippin Took" />
      <Combobox.Option id="4" label="Merry Brandybuck" />
      <Combobox.Option id="5" label="Sam Gamgee" />
      <Combobox.Option id="6" label="Aragorn" />
      <Combobox.Option id="7" label="Gimli" />
      <Combobox.Option id="8" label="Legolas" />
      <Combobox.Option id="9" label="Gandalf" />
      <Combobox.Option id="10" label="Gollum" />
      <Combobox.Option id="11" label="Sauron" />
      <Combobox.Option id="12" label="Saruman" />
      <Combobox.Option id="13" label="Elrond" />
      <Combobox.Option id="14" label="Galadriel" />

      <Combobox.Action
        label="Add Teammate"
        onClick={() => {
          alert("Added a new teammate ✅");
        }}
      />
      <Combobox.Action
        label="Manage Teammates"
        onClick={() => {
          alert("Managed teammates 👍");
        }}
      />
    </Combobox>
  );
};

const ComboboxSingleSelection: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);

  return (
    <Combobox
      {...args}
      onSelect={setSelected}
      selected={selected}
      label="Teammates"
    >
      <Combobox.Option id="1" label="Bilbo Baggins" />
      <Combobox.Option id="2" label="Frodo Baggins" />
      <Combobox.Option id="3" label="Pippin Took" />
      <Combobox.Option id="4" label="Merry Brandybuck" />
      <Combobox.Option id="5" label="Sam Gamgee" />

      <Combobox.Action
        label="Add Teammate"
        onClick={() => {
          alert("Added a new teammate ✅");
        }}
      />
      <Combobox.Action
        label="Manage Teammates"
        onClick={() => {
          alert("Managed teammates 👍");
        }}
      />
    </Combobox>
  );
};

const DynamicButton: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);

  return (
    <Combobox
      {...args}
      onSelect={setSelected}
      selected={selected}
      label="Teammates"
    >
      <Combobox.Option id="1" label="Search" />
      <Combobox.Option id="2" label="Something" />
      <Combobox.Option id="3" label="That's not" />
      <Combobox.Option id="4" label="There" />

      <Combobox.Action
        visible={({ searchValue }) => Boolean(searchValue)}
        label={({ searchValue }) => `Add ${searchValue} as teammate`}
        onClick={(_, { searchValue }) => {
          alert(`Added ${searchValue} as teammate`);
        }}
      />
    </Combobox>
  );
};

const ComboboxCustomSearch: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, loading } = useFakeQuery(searchTerm);

  return (
    <Combobox
      {...args}
      onSelect={setSelected}
      selected={selected}
      label="Teammates"
      multiSelect
      onSearch={setSearchTerm}
      loading={loading}
    >
      {data?.characters?.results?.map(({ name }) => {
        return <Combobox.Option key={name} id={name} label={name} />;
      })}
    </Combobox>
  );
};

const infiniteScrollComboboxOptions = {
  pageInfo: {
    totalPages: 2,
  },
  pages: [
    [
      { id: "1", label: "Bilbo Baggins" },
      { id: "2", label: "Frodo Baggins" },
      { id: "3", label: "Pippin Took" },
      { id: "4", label: "Merry Brandybuck" },
      { id: "5", label: "Sam Gamgee" },
      { id: "6", label: "Aragorn" },
      { id: "7", label: "Galadriel" },
      { id: "8", label: "Arwen" },
      { id: "9", label: "Gandalf" },
      { id: "10", label: "Legolas" },
      { id: "11", label: "Gimli" },
      { id: "12", label: "Samwise Gamgee" },
      { id: "14", label: "Faramir" },
    ],
    [
      { id: "15", label: "Spiderman" },
      { id: "16", label: "Batman" },
      { id: "17", label: "Superman" },
      { id: "18", label: "Wonder Woman" },
      { id: "19", label: "Iron Man" },
      { id: "20", label: "Captain America" },
      { id: "21", label: "Thor" },
      { id: "22", label: "Hulk" },
      { id: "23", label: "Black Widow" },
      { id: "24", label: "Spider-Woman" },
    ],
  ],
};

const ComboboxInfiniteScroll: ComponentStory<typeof Combobox> = args => {
  const [page, setPage] = useState<number>(1);
  const [selected, setSelected] = useState<ComboboxOption[]>([]);
  const [options, setOptions] = useState<ComboboxOption[]>(
    infiniteScrollComboboxOptions.pages[0],
  );
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const hasNextPage = page < infiniteScrollComboboxOptions.pageInfo.totalPages;

  const addMoreOptions = () => {
    if (!hasNextPage || loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setOptions([...options, ...infiniteScrollComboboxOptions.pages[page]]);
      setPage(page + 1);
      setLoadingMore(false);
    }, 1000);
  };

  return (
    <Combobox
      {...args}
      label="Teammates"
      onSelect={selection => {
        setSelected(selection);
      }}
      selected={selected}
      onLoadMore={addMoreOptions}
      loading={loadingMore}
    >
      {options.map(option => (
        <Combobox.Option key={option.id} id={option.id} label={option.label} />
      ))}
    </Combobox>
  );
};

const ComboboxKeepOpenOnClick: ComponentStory<typeof Combobox> = args => {
  const [selected, setSelected] = useState<ComboboxOption[]>([]);
  const [chips, setChips] = useState<string[]>([]);

  const handleActionClick = (searchValue: string) => {
    setChips([...chips, searchValue]);
  };

  return (
    <Card header="Add more friends">
      <Content>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Combobox
            {...args}
            onSelect={setSelected}
            selected={selected}
            label="Add Chip"
          >
            <Combobox.Option id="1" label="Search" />
            <Combobox.Option id="2" label="for a" />
            <Combobox.Option id="3" label="friend" />

            <Combobox.Action
              visible={({ searchValue }) => Boolean(searchValue)}
              label={({ searchValue }) => `Add "${searchValue}" as Chip`}
              onClick={(_, { searchValue }) => handleActionClick(searchValue)}
              keepOpenOnClick
            />
          </Combobox>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {chips.map((chip, index) => (
              <Chip key={index} label={chip} />
            ))}
          </div>
        </div>
      </Content>
    </Card>
  );
};

export const KeepOpenOnClick = ComboboxKeepOpenOnClick.bind({});
KeepOpenOnClick.args = {};

export const ClearSelection = ComboboxClearSelection.bind({});
ClearSelection.args = {};

export const CustomActivator = ComboboxCustomActivator.bind({});
CustomActivator.args = {};

export const EmptyState = ComboboxEmptyState.bind({});
EmptyState.args = {};

export const PrefixOptions = ComboboxPrefixOptions.bind({});
PrefixOptions.args = {};

export const MultiSelect = ComboboxMultiSelection.bind({});
MultiSelect.args = {};

export const SingleSelect = ComboboxSingleSelection.bind({});
SingleSelect.args = {};

export const DynamicAction = DynamicButton.bind({});
DynamicAction.args = {};

export const CustomSearch = ComboboxCustomSearch.bind({});
CustomSearch.args = {};

export const InfiniteScroll = ComboboxInfiniteScroll.bind({});
InfiniteScroll.args = {};

InfiniteScroll.parameters = {
  previewTabs: {
    code: {
      hidden: true,
    },
  },
};

CustomSearch.parameters = {
  previewTabs: {
    code: {
      hidden: true,
      extraImports: {
        "./useFakeQuery": ["useFakeQuery"],
      },
      files: {
        "/useFakeQuery.ts": require("./storyUtils").default,
      },
    },
  },
};
