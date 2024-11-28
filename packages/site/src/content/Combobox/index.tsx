import { Combobox as ComboboxRoot } from "@jobber/components";
import ComboboxContent from "@atlantis/docs/components/Combobox/Combobox.stories.mdx";
import { PropsWithChildren, useState } from "react";
import Props from "./Combobox.props.json";
import { ContentExport } from "../../types/content";
import { ComboboxOption } from "../../types/combobox";

export const Combobox = (props: PropsWithChildren) => {
  const [selectedFellows, setSelectedFellows] = useState<ComboboxOption[]>([]);

  return (
    <ComboboxRoot
      {...props}
      label="The Fellowship"
      subjectNoun="fellows"
      onSelect={setSelectedFellows}
      selected={selectedFellows}
    >
      <ComboboxRoot.Option id="1" label="Bilbo Baggins" />
      <ComboboxRoot.Option id="2" label="Frodo Baggins" />
      <ComboboxRoot.Option id="3" label="Pippin Took" />
      <ComboboxRoot.Option id="4" label="Merry Brandybuck" />
      <ComboboxRoot.Option id="5" label="Sam Gamgee" />
    </ComboboxRoot>
  );
};

export default {
  content: () => <ComboboxContent />,
  props: Props,
  component: {
    element: Combobox,
    defaultProps: {},
  },
  title: "Combobox",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Combobox-web--docs",
    },
  ],
} as const satisfies ContentExport;
