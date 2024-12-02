import InputPhoneNumberContent from "@atlantis/docs/components/InputPhoneNumber/InputPhoneNumber.stories.mdx";
import Props from "./InputPhoneNumber.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <InputPhoneNumberContent />,
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
    defaultProps: {},
  },
  title: "InputPhoneNumber",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputPhoneNumber-web--docs",
    },
  ],
} as const satisfies ContentExport;
