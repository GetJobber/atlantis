import Content from "./Popover.stories.mdx";
import Props from "./Popover.props.json";
import Notes from "./PopoverNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

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
      url: getStorybookUrl(`?path=/docs/components-overlays-popover--docs`),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
