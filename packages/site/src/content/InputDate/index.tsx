import InputDateContent, { toc } from "./InputDate.stories.mdx";
import Props from "./InputDate.props.json";
import MobileProps from "./InputDate.props-mobile.json";
import RebuiltProps from "./InputDateV2.props.json";
import Notes from "./InputDateNotes.mdx";
import originalExample from "./exampleV1";
import rebuiltExample from "./exampleV2";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <InputDateContent />,
  toc,
  props: Props,
  mobileProps: MobileProps,
  webSupportedProps: RebuiltProps,
  component: {
    element: originalExample,
    webSupported: rebuiltExample,
    mobileElement: `const [date, setDate] = useState(new Date("11/11/2011"));

  return <InputDate value={date} onChange={setDate} />;`,
    defaultProps: {},
  },
  title: "InputDate",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-inputdate--basic",
        "web",
      ),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-inputdate--basic",
        "mobile",
      ),
    },
  ],
  webSupportedLinks: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-inputdate-v2--basic",
        "web",
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
