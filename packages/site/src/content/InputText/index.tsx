import { InputText as InputTextRoot } from "@jobber/components";
import Content from "@atlantis/docs/components/InputText/InputText.stories.mdx";
import Props from "./InputText.props.json";
import { ContentExport } from "../../types/content";

export const InputText = () => {
  return <InputTextRoot name="age" placeholder="Age in words" />;
};

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: InputText,
    defaultProps: {},
  },
  title: "InputText",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputText-web--docs",
    },
  ],
} as const satisfies ContentExport;
