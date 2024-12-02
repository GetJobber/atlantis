import { Form as FormRoot, InputText } from "@jobber/components";
import Content from "@atlantis/docs/components/Form/Form.stories.mdx";
import Props from "./Form.props.json";
import { ContentExport } from "../../types/content";

export const Form = () => {
  return (
    <FormRoot onSubmit={() => alert("submitted")}>
      <InputText name="name" />
      <InputText name="email" />
    </FormRoot>
  );
};

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: Form,
    defaultProps: {},
  },
  title: "Form",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-Form-web--docs",
    },
  ],
} as const satisfies ContentExport;
