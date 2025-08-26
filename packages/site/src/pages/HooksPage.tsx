import { PageBlock } from "../components/PageBlock";
import { hooksList } from "../hooksList";

export const HooksPage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Hooks",
          body: "Save yourself some time on wiring up common experiences and functionality",
          imageURL: "/img-page-divider-collage.webp",
        },
        body: {
          content: hooksList,
        },
        useCategories: true,
        showSegmentedControl: true,
      }}
    />
  );
};
