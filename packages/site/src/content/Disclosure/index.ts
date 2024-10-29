import { Disclosure } from "@jobber/components";
import Content from "@atlantis/docs/components/Disclosure/Disclosure.stories.mdx";
import Props from "./Disclosure.props.json";
import { getStorybookUrl } from "../../layout/getStorybookUrl";
import { ContentExport } from "../../types/content";

export default {
  content: Content,
  props: Props,
  component: {
    element: Disclosure,
    props: { label: "Disclosure" },
    defaultProps: { title: "Disclosure" },
  },
  title: "Disclosure",
  description: "Disclosure is neater.",
  links: [
    {
      label: "Disclosure Storybook",
      url: getStorybookUrl(
        "?path=/docs/components-layouts-and-structure-disclosure--docs",
      ),
    },
  ],
} as ContentExport;
