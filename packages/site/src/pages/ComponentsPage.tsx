import { componentList } from "../componentList";
import { PageBlock } from "../components/PageBlock";

export const ComponentsPage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Components",
          body: "The building blocks of Jobber's interfaces",
        },
        body: {
          title: "Components",
          content: componentList,
        },
      }}
    />
  );
};
