import { Checkbox } from "@jobber/components";
import Content from "@atlantis/docs/components/Checkbox/Checkbox.stories.mdx";
import Props from "./Checkbox.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: Content,
  props: Props,
  component: {
    element: Checkbox,
    defaultProps: { label: "Checkbox" },
  },
  title: "Checkbox",
  description:
    "A checkbox lets a user select one or more items from a set of options.",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl("?path=/docs/components-selections-checkbox--docs"),
    },
  ],
} as ContentExport;
