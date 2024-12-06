import Content from "@atlantis/docs/components/InputSearch/InputSearch.stories.mdx";
import MobileProps from "./InputSearch.props-mobile.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  mobileProps: MobileProps,
  component: {
    mobileElement: `
    const [value, setValue] = useState("");
    return (<InputSearch
      placeholder={"Search"}
      prefix={{ icon: "search" }}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      onDebouncedChange={() => console.log('Debounced value:' + value)}
    />)`,
  },
  title: "InputSearch",
  links: [
    {
      label: "Storybook",
      url: "http://localhost:6006/?path=/docs/components-utilities-InputSearch-web--docs",
    },
  ],
} as const satisfies ContentExport;
