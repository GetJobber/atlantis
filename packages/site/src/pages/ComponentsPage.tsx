import { componentList } from "../componentList";
import { PageBlock } from "../components/PageBlock";

export const ComponentsPage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Components",
          body: "The tools you'll use to build Jobber",
          imageURL: "/img-hero_collage-v2.004b0168.webp",
        },
        body: {
          content: componentList,
        },
        useCategories: true,
        showSegmentedControl: true,
      }}
    />
  );
};
