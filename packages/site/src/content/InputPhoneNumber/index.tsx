import Content from "@atlantis/docs/components/InputPhoneNumber/InputPhoneNumber.stories.mdx";
import Props from "./InputPhoneNumber.props.json";
import { ContentExport } from "../../types/content";

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
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }/?path=/docs/components-utilities-InputPhoneNumber-web--docs`,
    },
  ],
} as const satisfies ContentExport;
