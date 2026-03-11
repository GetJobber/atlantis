import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import type {
  ComboboxCustomActivatorProps,
  ComboboxOption,
} from "@jobber/components/Combobox";
import { Combobox } from "@jobber/components/Combobox";
import { Text } from "@jobber/components/Text";
import { Button } from "@jobber/components/Button";
import { Typography } from "@jobber/components/Typography";
import { Chip } from "@jobber/components/Chip";
import { Icon } from "@jobber/components/Icon";
import { StatusIndicator } from "@jobber/components/StatusIndicator";
import { Content } from "@jobber/components/Content";
import { Card } from "@jobber/components/Card";
import { Heading } from "@jobber/components/Heading";
import { Flex } from "@jobber/components/Flex";
import { StatusLabel } from "@jobber/components/StatusLabel";
import { Avatar } from "@jobber/components/Avatar";
import { Box } from "@jobber/components/Box";
import { Emphasis } from "@jobber/components/Emphasis";

const meta = {
  title: "Components/Selections/Combobox",
  component: Combobox,
} satisfies Meta<typeof Combobox>;
export default meta;
type Story = StoryObj<Partial<React.ComponentProps<typeof Combobox>>>;

const ComboboxClearSelection = (args: Story["args"]) => {
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

const ComboboxCustomActivator = (args: Story["args"]) => {
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
              onClick={activatorAPI.open}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  activatorAPI.open();
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

const ComboboxEmptyState = (args: Story["args"]) => {
  return (
    <Combobox
      {...args}
      label="Teammates"
      subjectNoun="teammates"
      selected={[]}
      onSelect={() => undefined}
    >
      <Combobox.Action
        label="Add Teammate"
        onClick={() => {
          alert("Added a new teammate ✅");
        }}
      />
    </Combobox>
  );
};

const ComboboxPrefixOptions = (args: Story["args"]) => {
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

const ComboboxMultiSelection = (args: Story["args"]) => {
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

const ComboboxSingleSelection = (args: Story["args"]) => {
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

const DynamicButton = (args: Story["args"]) => {
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

const ComboboxCustomSearch = (args: Story["args"]) => {
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

const ComboboxInfiniteScroll = (args: Story["args"]) => {
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

const ComboboxKeepOpenOnClick = (args: Story["args"]) => {
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

const ComboboxCustomRenderOptions = (args: Story["args"]) => {
  const [selectedFellows, setSelectedFellows] = useState<ComboboxOption[]>([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<
    ComboboxOption[]
  >([]);
  const [selectedLineItems, setSelectedLineItems] = useState<ComboboxOption[]>(
    [],
  );
  const [selectedLineItems2, setSelectedLineItems2] = useState<
    ComboboxOption[]
  >([]);

  const teamMemberOptions = [
    {
      id: 1,
      name: "Ricardo Valenzuela",
      position: "Crew lead",
      timeToDestination: 25,
      availability: true,
    },
    {
      id: 2,
      name: "Frederic Vandelay",
      position: "Crew lead",
      timeToDestination: 30,
      availability: true,
    },
    {
      id: 3,
      name: "Matt Lewis",
      position: "Laborer",
      timeToDestination: 40,
      availability: true,
    },
    {
      id: 4,
      name: "Joshle Ford",
      position: "Laborer",
      timeToDestination: 0,
      availability: false,
    },
    {
      id: 5,
      name: "Dusty McCallaghan",
      position: "Laborer",
      timeToDestination: 25,
      availability: true,
    },
    {
      id: 6,
      name: "Tracy Holland",
      position: "Crew lead",
      timeToDestination: 30,
      availability: true,
    },
  ];

  const lineItemOptions = [
    {
      id: 1,
      label: "Ladder Hook",
      details: "Holds up to 25LB",
      price: "25.00",
    },
    {
      id: 2,
      label: "Garage Railing Track - 8'",
      details: "Holds up to 250LB",
      price: "150.00",
    },
    {
      id: 3,
      label: "Garage Railing Track - 16'",
      details: "Holds up to 500LB",
      price: "275.00",
    },
    {
      id: 4,
      label: "Premium Ladder Hook",
      details: "",
      price: "35.00",
    },
  ];

  return (
    <Box gap="large">
      <Combobox
        label="The Fellowship"
        subjectNoun="fellows"
        {...args}
        onSelect={setSelectedFellows}
        selected={selectedFellows}
      >
        <Combobox.Option
          id="1"
          label="Bilbo"
          customRender={({ id, isSelected, label }) => {
            return (
              <Flex template={["shrink", "grow", "shrink"]} gap="small">
                <Avatar
                  color={"var(--color-indigo)"}
                  initials={"BB"}
                  name={"Bilbo Baggins"}
                  size={"small"}
                />
                <div>{label}</div>
                <Box direction="row" alignItems="center" gap="smaller">
                  <StatusLabel label={`${id}`} status={"informative"} />
                  {isSelected && "✅"}
                </Box>
              </Flex>
            );
          }}
        />
        <Combobox.Option
          id="2"
          label="Samwise"
          customRender={({ id, isSelected, label }) => {
            return (
              <Flex template={["shrink", "grow", "shrink"]} gap="small">
                <Avatar
                  color={"var(--color-indigo)"}
                  initials={"SG"}
                  name={"Samwise Gamgee"}
                  size={"small"}
                />
                <div>{label}</div>
                <Box direction="row" alignItems="center" gap="smaller">
                  <StatusLabel label={`${id}`} status={"informative"} />
                  {isSelected && "✅"}
                </Box>
              </Flex>
            );
          }}
        />
        <Combobox.Option
          id="3"
          label="Pippin"
          customRender={({ id, isSelected, label }) => {
            return (
              <Flex template={["shrink", "grow", "shrink"]} gap="small">
                <Avatar
                  color={"var(--color-indigo)"}
                  initials={"PT"}
                  name={"Pippin Took"}
                  size={"small"}
                />
                <div>{label}</div>
                <Box direction="row" alignItems="center" gap="smaller">
                  <StatusLabel label={`${id}`} status={"informative"} />
                  {isSelected && "✅"}
                </Box>
              </Flex>
            );
          }}
        />
        <Combobox.Option
          id="4"
          label="Merry"
          customRender={({ id, isSelected, label }) => {
            return (
              <Flex template={["shrink", "grow", "shrink"]} gap="small">
                <Avatar
                  color={"var(--color-indigo)"}
                  initials={"MB"}
                  name={"Merry Brandybuck"}
                  size={"small"}
                />
                <div>{label}</div>
                <Box direction="row" alignItems="center" gap="smaller">
                  <StatusLabel label={`${id}`} status={"informative"} />
                  {isSelected && "✅"}
                </Box>
              </Flex>
            );
          }}
        />
        <Combobox.Option
          id="5"
          label="Legolas"
          customRender={({ id, isSelected, label }) => {
            return (
              <Flex template={["shrink", "grow", "shrink"]} gap="small">
                <Avatar
                  color={"var(--color-green)"}
                  initials={"LG"}
                  name={"Legolas Greenleaf"}
                  size={"small"}
                />
                <div>{label}</div>
                <Box direction="row" alignItems="center" gap="smaller">
                  <StatusLabel label={`${id}`} status={"informative"} />
                  {isSelected && "✅"}
                </Box>
              </Flex>
            );
          }}
        />
        <Combobox.Option
          id="6"
          label="Gandalf"
          customRender={({ id, isSelected, label }) => {
            return (
              <Flex template={["shrink", "grow", "shrink"]} gap="small">
                <Avatar
                  color={"var(--color-grey)"}
                  initials={"GG"}
                  name={"Gandalf the Grey"}
                  size={"small"}
                />
                <div>{label}</div>
                <Box direction="row" alignItems="center" gap="smaller">
                  <StatusLabel label={`${id}`} status={"informative"} />
                  {isSelected && "✅"}
                </Box>
              </Flex>
            );
          }}
        />
        <Combobox.Option
          id="7"
          label="Aragorn"
          customRender={({ id, isSelected, label }) => {
            return (
              <Flex template={["shrink", "grow", "shrink"]} gap="small">
                <Avatar
                  color={"var(--color-orange)"}
                  initials={"A"}
                  name={"Aragorn son of Arathorn"}
                  size={"small"}
                />
                <div>{label}</div>
                <Box direction="row" alignItems="center" gap="smaller">
                  <StatusLabel label={`${id}`} status={"informative"} />
                  {isSelected && "✅"}
                </Box>
              </Flex>
            );
          }}
        />
        <Combobox.Option
          id="8"
          label="Boromir"
          customRender={({ id, isSelected, label }) => {
            return (
              <Flex template={["shrink", "grow", "shrink"]} gap="small">
                <Avatar
                  color={"var(--color-orange)"}
                  initials={"B"}
                  name={"Boromir son of Denethor"}
                  size={"small"}
                />
                <div>{label}</div>
                <Box direction="row" alignItems="center" gap="smaller">
                  <StatusLabel label={`${id}`} status={"informative"} />
                  {isSelected && "✅"}
                </Box>
              </Flex>
            );
          }}
        />
        <Combobox.Option
          id="9"
          label="Gimli"
          customRender={({ id, isSelected, label }) => {
            return (
              <Flex template={["shrink", "grow", "shrink"]} gap="small">
                <Avatar
                  color={"var(--color-brown)"}
                  initials={"G"}
                  name={"Gimli son of Glóin"}
                  size={"small"}
                />
                <div>{label}</div>
                <Box direction="row" alignItems="center" gap="smaller">
                  <StatusLabel label={`${id}`} status={"informative"} />
                  {isSelected && "✅"}
                </Box>
              </Flex>
            );
          }}
        />
      </Combobox>

      <Combobox
        label="Assign team"
        subjectNoun="team"
        {...args}
        onSelect={setSelectedTeamMembers}
        selected={selectedTeamMembers}
      >
        {teamMemberOptions.map(o => {
          return (
            <Combobox.Option
              key={o.id}
              id={`${o.id}`}
              label={o.name}
              customRender={({ isSelected, label }) => {
                return (
                  <Flex template={["shrink", "grow"]} gap="small">
                    {isSelected ? (
                      <Icon name="checkmark" color="success" />
                    ) : (
                      <Avatar
                        initials={o.name[0]}
                        name={o.name}
                        size={"small"}
                      />
                    )}
                    <Box direction="column" gap="smaller">
                      <div>{label}</div>
                      <Box direction="row" justifyContent="space-between">
                        <Text variation="subdued">{o.position}</Text>
                        <Box direction="row" alignItems="center" gap="smaller">
                          {o.availability && (
                            <Icon
                              name="moveVisits"
                              color="textSecondary"
                              size="small"
                            />
                          )}
                          {o.availability ? (
                            <Text variation="subdued">
                              +{o.timeToDestination}min
                            </Text>
                          ) : (
                            <Text variation="error">Unavailable</Text>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Flex>
                );
              }}
            />
          );
        })}

        <Combobox.Action
          label="+ Add new member"
          onClick={() => {
            alert("Added a new teammate ✅");
          }}
        />
      </Combobox>

      <Combobox
        label="Add line item"
        subjectNoun="line items"
        {...args}
        onSelect={setSelectedLineItems}
        selected={selectedLineItems}
      >
        {lineItemOptions.map(o => {
          return (
            <Combobox.Option
              key={o.id}
              id={`${o.id}`}
              label={o.label}
              customRender={({ isSelected, label }) => {
                return (
                  <Flex template={["grow", "shrink"]} gap="small">
                    <Box gap="smaller">
                      <div>{label}</div>
                      <Text variation="subdued" size="small">
                        {o.details}
                      </Text>
                    </Box>
                    <Box direction="row" alignItems="center" gap="smaller">
                      <Emphasis variation="bold">${o.price}</Emphasis>
                      {isSelected && <Icon name="checkmark" color="success" />}
                    </Box>
                  </Flex>
                );
              }}
            />
          );
        })}

        <Combobox.Action
          label="+ Add new line item"
          onClick={() => {
            alert("Added a new line item ✅");
          }}
        />
      </Combobox>
      <Combobox
        label="Add line item with default content"
        subjectNoun="line items"
        {...args}
        onSelect={setSelectedLineItems2}
        selected={selectedLineItems2}
      >
        {lineItemOptions.map(o => {
          return (
            <Combobox.Option
              key={o.id}
              id={`${o.id}`}
              label={o.label}
              customRender={({ defaultContent }) => (
                <span style={{ display: "contents" }}>{defaultContent}</span>
              )}
            />
          );
        })}

        <Combobox.Action
          label="+ Add new line item"
          onClick={() => {
            alert("Added a new line item ✅");
          }}
        />
      </Combobox>
    </Box>
  );
};

export const CustomRenderOptions: Story = {
  render: ComboboxCustomRenderOptions,
  args: {
    multiSelect: true,
  },
};

export const KeepOpenOnClick: Story = {
  render: ComboboxKeepOpenOnClick,
  args: {},
};

export const ClearSelection: Story = {
  render: ComboboxClearSelection,
  args: {},
};

export const CustomActivator: Story = {
  render: ComboboxCustomActivator,
  args: {},
};

export const EmptyState: Story = {
  render: ComboboxEmptyState,
  args: {},
};

export const PrefixOptions: Story = {
  render: ComboboxPrefixOptions,
  args: {},
};

export const MultiSelect: Story = {
  render: ComboboxMultiSelection,
  args: {},
};

export const SingleSelect: Story = {
  render: ComboboxSingleSelection,
  args: {},
};

export const DynamicAction: Story = {
  render: DynamicButton,
  args: {},
};

export const CustomSearch: Story = {
  render: ComboboxCustomSearch,
  args: {},
};

export const InfiniteScroll: Story = {
  render: ComboboxInfiniteScroll,
  args: {},
};

interface ListQueryType {
  characters: {
    results: {
      name: string;
    }[];
  };
}
const LIST_QUERY = gql`
  query ListQuery($filter: FilterCharacter) {
    characters(filter: $filter) {
      results {
        name
      }
    }
  }
`;
const apolloClient = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

export function useFakeQuery(searchTerm: string) {
  return useQuery<ListQueryType>(LIST_QUERY, {
    variables: {
      filter: { name: searchTerm },
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    client: apolloClient,
  });
}
