import { PageBlock } from "../components/PageBlock";
import { patternsList } from "../patternsList.ts";

export const PatternsPage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Patterns",
          body: "UI elements and associated guidelines that can be used to solve similar problems in a consistent fashion",
          imageURL: "/img-page-divider-collage.webp",
        },
        body: {
          content: patternsList,
        },
      }}
    />
  );
};
