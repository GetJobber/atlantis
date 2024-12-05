import Content from "@atlantis/docs/components/InputTime/InputTime.stories.mdx";
import Props from "./InputTime.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `<InputTime defaultValue={{}} />`,
  },
  title: "InputTime",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputTime-web--docs",
    },
  ],
} as const satisfies ContentExport;
