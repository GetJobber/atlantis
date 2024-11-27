import { Combobox as ComboboxRoot, Flex, Avatar, Box, StatusLabel } from "@jobber/components";
import ComboboxContent from "@atlantis/docs/components/Combobox/Combobox.stories.mdx";
import Props from "./Combobox.props.json";
import { ContentExport } from "../../types/content";
import { ComboboxOptionProps, ComboboxProps, ComboboxOption } from "../../types/combobox"
import { useState, PropsWithChildren } from "react";

export const Combobox = (props: ComboboxProps<{
    readonly onSelect: (selection: ComboboxOptionProps[]) => void;
    readonly selected: ComboboxOptionProps[];
  }>,) => {
    const [selectedFellows, setSelectedFellows] = useState<ComboboxOption[]>([]);
    
    <ComboboxRoot
        label="The Fellowship"
        subjectNoun="fellows"
        multiSelect={true}
        onSelect={setSelectedFellows}
        selected={selectedFellows}
      >
        <ComboboxOption
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
      </ComboboxRoot>
};

export default {
  content: () => <ComboboxContent />,
  props: Props,
  component: {
    element: Combobox,
    defaultProps: {  },
  },
  title: "Combobox",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Combobox-web--docs",
    },
  ],
} as const satisfies ContentExport;