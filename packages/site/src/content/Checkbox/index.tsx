import CheckboxContent from "./Checkbox.stories.mdx";
import Props from "./Checkbox.props.json";
import MobileProps from "./Checkbox.props-mobile.json";
import Notes from "./CheckboxNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <CheckboxContent />,
  props: Props,
  mobileProps: MobileProps,
  component: {
    element: `const [checked, setChecked] = useState(true);

  return (
    <Checkbox
      label={"Save card for future use"}
      checked={checked}
      onChange={setChecked}
    />
  );`,
    mobileElement: `<Checkbox label={"Check me out"} name={"storyCheckbox"} />`,
  },
  title: "Checkbox",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl("?path=/docs/components-selections-checkbox--docs"),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
