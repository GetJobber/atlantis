import Content from "@atlantis/docs/components/InputPhoneNumber/InputPhoneNumber.stories.mdx";
import Props from "./InputPhoneNumber.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `const [value, setValue] = useState(undefined);
  return (
    <InputPhoneNumber
      placeholder={"Enter your phone number"}
      value={value}
      onChange={setValue}
    />
  );`,
  },
  title: "InputPhoneNumber",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-forms-and-inputs-inputphonenumber--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
