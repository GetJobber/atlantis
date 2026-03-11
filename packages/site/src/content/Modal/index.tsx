import Content from "./Modal.stories.mdx";
import Props from "./Modal.props.json";
import Notes from "./ModalNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Modal
        title={"We've updated Jobber"}
        open={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <Content>
          <Text>It&apos;s harder, better, faster, and stronger! 🤖</Text>
        </Content>
      </Modal>
      <Button label="Open Modal" onClick={() => setModalOpen(true)} />
    </>
  );`,
    defaultProps: {},
  },
  title: "Modal",
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl(
        "?path=/story/components-overlays-modal--basic",
        "web",
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
