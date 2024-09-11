import { PageBlock } from "../components/PageBlock";

export const ComponentsMobile = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Mobile components",
          body: "They are also the best",
        },
        body: {
          title: "Components",
          content: [
            {
              title: "Button",
              to: "/components/mobile/button",
            },
          ],
        },
      }}
    />
  );
};
