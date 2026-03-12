import Content, { toc } from "./InputTime.stories.mdx";
import Props from "./InputTime.props.json";
import MobileProps from "./InputTime.props-mobile.json";
import RebuiltProps from "./InputTimeV2.props.json";
import Notes from "./InputTimeNotes.mdx";
import originalExample from "./exampleV1";
import rebuiltExample from "./exampleV2";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  toc,
  props: Props,
  mobileProps: MobileProps,
  webSupportedProps: RebuiltProps,
  component: {
    element: originalExample,
    webSupported: rebuiltExample,
    mobileElement: `const [time, setTime] = useState(new Date("2023-07-21T16:36:34.873Z"));

  return <InputTime value={time} onChange={setTime} />;`,
  },
  title: "InputTime",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-inputtime--uncontrolled",
        "web",
      ),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-inputtime--basic",
        "mobile",
      ),
    },
  ],
  webSupportedLinks: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-forms-and-inputs-inputtime-v2--basic",
        "web",
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
