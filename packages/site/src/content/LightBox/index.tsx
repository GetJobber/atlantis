import Content from "@atlantis/docs/components/LightBox/LightBox.stories.mdx";
import Props from "./LightBox.props.json";
import Notes from "./LightBoxNotes.mdx";
import { ContentExport } from "../../types/content";
import { getStorybookUrl } from "../../layout/getStorybookUrl";

export default {
  content: () => <Content />,
  props: Props,
  component: {
    element: `const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button label="Click me!" onClick={() => setIsOpen(true)} />
      <LightBox
        images={[
          {
            title: "Victoria, BC, Canada",
            url: "https://images.unsplash.com/photo-1597201278257-3687be27d954?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            caption:
              "This was the view of Bushart Gardens in Victoria, BC, Canada in July from a hill.",
          },
          {
            title: "A house",
            url: "https://images.unsplash.com/photo-1592595896616-c37162298647?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            caption: "House with a garden.",
          },
          {
            url: "https://images.unsplash.com/photo-1532302780319-95689ab9d79a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          },
        ]}
        open={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
    </>
  );`,
    defaultProps: {},
  },
  title: "LightBox",
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl(
        `?path=/docs/components-images-and-icons-lightbox--docs`,
      ),
    },
  ],
  notes: () => <Notes />,
} as const satisfies ContentExport;
