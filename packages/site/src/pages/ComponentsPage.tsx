import { PageBlock } from "../components/PageBlock";

export const ComponentsPage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Web components",
          body: "They are the best",
        },
        body: {
          title: "Components",
          content: [
            {
              title: "Button",
              to: "/components/web/Button",
              imageURL: "/Button.png",
            },
            {
              title: "Chip",
              to: "/components/web/Chip",
              imageURL: "/Chip.png",
            },
            {
              title: "StatusLabel",
              to: "/components/web/StatusLabel",
              imageURL: "/StatusLabel.png",
            },
            {
              title: "Switch",
              to: "/components/web/Switch",
              imageURL: "/Switch.png",
            },
            {
              title: "Disclosure",
              to: "/components/web/Disclosure",
              imageURL: "/Disclosure.png",
            },
          ],
        },
      }}
    />
  );
};
