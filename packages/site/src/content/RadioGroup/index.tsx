import Content from "@atlantis/docs/components/RadioGroup/RadioGroup.stories.mdx";
import Props from "./RadioGroup.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `const [company, setCompany] = useState("apple");

  return (
    <RadioGroup
      onChange={(value: string) => setCompany(value)}
      value={company}
      ariaLabel="Companies"
    >
      <RadioOption value="apple" label="Apple" />
      <RadioOption value="google" label="Google" />
      <RadioOption value="microsoft" label="Microsoft" />
    </RadioGroup>
  );`,
    defaultProps: {},
  },
  title: "RadioGroup",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-RadioGroup-web--docs",
    },
  ],
} as const satisfies ContentExport;
