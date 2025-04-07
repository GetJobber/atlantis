import { PageBlock } from "../components/PageBlock";
import { guidesList } from "../guidesList";

export const GuidesPage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Guides",
          body: "Instruction manuals for working with our tools",
        },
        body: {
          content: guidesList,
        },
      }}
    />
  );
};
