import Content from "@atlantis/docs/components/Popover/Popover.stories.mdx";
import Props from "./Popover.props.json";
import { ContentExport } from "../../types/content";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `const divRef = useRef<HTMLSpanElement>(null);
  const [showPopover, setShowPopover] = useState(undefined);

  return (
    <>
      <span ref={divRef}>
        <Button
          label="Toggle Popover"
          onClick={() => setShowPopover(!showPopover)}
        />
      </span>
      <Popover
        attachTo={divRef}
        open={showPopover}
        onRequestClose={() => setShowPopover(false)}
      >
        <Content>Here is your first Popover</Content>
      </Popover>
    </>
  );`,
    defaultProps: {},
  },
  title: "Popover",
  links: [
    {
      label: "Storybook",
      url: `${
        (window as AtlantisWindow)?.env?.VITE_STORYBOOK_URL
      }/?path=/docs/components-utilities-Popover-web--docs`,
    },
  ],
} as const satisfies ContentExport;
