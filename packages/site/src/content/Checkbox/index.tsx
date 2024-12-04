import CheckboxContent from "@atlantis/docs/components/Checkbox/Checkbox.stories.mdx";
import Props from "./Checkbox.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <CheckboxContent />,
  props: Props,
  component: {
    element: `const [checked, setChecked] = useState(true);

  return (
    <Checkbox
      label={"Save card for future use"}
      checked={checked}
      onChange={setChecked}
    />
  );`,
  },
  title: "Checkbox",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl("?path=/docs/components-selections-checkbox--docs"),
    },
  ],
} as const satisfies ContentExport;
