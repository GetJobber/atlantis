import Content from "@atlantis/docs/components/FormField/FormField.stories.mdx";
import Props from "./FormField.props.json";
import MobileProps from "./FormField.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<FormField placeholder={"Words..."} type={"text"} />`,
    mobileElement: `<FormField name={"name"}>
      {(field) => {
        return <InputText value={field.value} placeholder="Enter name here" />;
      }}
    </FormField>`,
  },
  title: "FormField",
  links: [
    {
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }?path=/docs/components-private-formfield--docs`,
    },
  ],
} as const satisfies ContentExport;
