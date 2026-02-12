import Content, { toc } from "./InputSearch.stories.mdx";
import MobileProps from "./InputSearch.props-mobile.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  toc,
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
      url: getStorybookUrl(
        `?path=/docs/components-forms-and-inputs-inputsearch--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
