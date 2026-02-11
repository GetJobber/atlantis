import Content, { toc } from "./FormField.stories.mdx";
import Props from "./FormField.props.json";
import MobileProps from "./FormField.props-mobile.json";
import Notes from "./FormFieldNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  toc,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `<FormField placeholder={"Words..."} type={"text"} />`,
    mobileElement: `<FormField name={"name"}>
      {(field) =>       <InputText value={field.value} placeholder="Enter name here" />      }
    </FormField>`,
  },
  title: "FormField",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(`?path=/docs/components-private-formfield--docs`),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
