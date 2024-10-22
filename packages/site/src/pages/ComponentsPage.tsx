import { componentList } from "../componentList";
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
          content: componentList,
        },
      }}
    />
  );
};
