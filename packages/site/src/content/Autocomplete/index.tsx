import { Autocomplete as AutocompleteRoot } from "@jobber/components";
import Content from "@atlantis/docs/components/Autocomplete/Autocomplete.stories.mdx";
import { PropsWithChildren, useState } from "react";
import { Option } from "@jobber/components/Autocomplete";
import Props from "./Autocomplete.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export const Autocomplete = (
  props: PropsWithChildren<{
    readonly value: Option;
    readonly onChange: () => void;
    readonly getOptions: () => [];
    readonly placeholder: string;
  }>,
) => {
  const [value, setValue] = useState<Option>();

  return <AutocompleteRoot {...props} value={value} onChange={setValue} />;
};
export default {
  content: Content,
  props: Props,
  component: {
    element: Autocomplete,
    defaultProps: {
      initialOptions: [],
      placeholder: "Autcomplete!",
      getOptions: () => [
        { value: 1, label: "Hobbits" },
        { value: 2, label: "Super heroes" },
        { value: 3, label: "Space wars and treks" },
      ],
    },
  },
  title: "Autocomplete",
  description: "Autocompletes are a ...",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-autocomplete-web--basic",
      ),
    },
  ],
} as ContentExport;
