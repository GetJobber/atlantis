import ConfirmationModalContent from "./ConfirmationModal.stories.mdx";
import Props from "./ConfirmationModal.props.json";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <ConfirmationModalContent />,
  props: Props,
  component: {
    element: `const [open, setOpen] = useState(false);

    return (
      <>
        <Button label="Open" onClick={() => setOpen(true)} />
        <ConfirmationModal
          title={"Should we?"}
          message={"Let's do **something**!"}
          open={open}
          confirmLabel="Do it"
          onConfirm={() => alert("✅")}
          onCancel={() => alert("🙅‍♂️")}
          onRequestClose={() => setOpen(false)}
        />
      </>
    );
  `,
  },
  title: "ConfirmationModal",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-overlays-confirmationmodal--docs`,
      ),
    },
  ],
} as const satisfies ContentExport;
