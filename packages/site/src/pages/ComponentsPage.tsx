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
              title: "AnimatedPresence",
              to: "/components/AnimatedPresence",
              imageURL: "/Animation.png",
            },
            {
              title: "AnimatedSwitcher",
              to: "/components/AnimatedSwitcher",
              imageURL: "/Animation.png",
            },
            {
              title: "Autocomplete",
              to: "/components/Autocomplete",
              imageURL: "/Autocomplete.png",
            },
            {
              title: "Button",
              to: "/components/Button",
              imageURL: "/Button.png",
            },
            {
              title: "Checkbox",
              to: "/components/Checkbox",
              imageURL: "/Checkbox.png",
            },
            {
              title: "Chip",
              to: "/components/Chip",
              imageURL: "/Chip.png",
            },
            {
              title: "Disclosure",
              to: "/components/Disclosure",
              imageURL: "/Disclosure.png",
            },
            {
              title: "StatusLabel",
              to: "/components/StatusLabel",
              imageURL: "/StatusLabel.png",
            },
            {
              title: "Switch",
              to: "/components/Switch",
              imageURL: "/Switch.png",
            },
          ],
        },
      }}
    />
  );
};
