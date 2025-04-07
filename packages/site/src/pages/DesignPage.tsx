import { PageBlock } from "../components/PageBlock";
import { designList } from "../designList";

export const DesignPage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Design",
          body: "The foundation of Jobber's look and feel",
          imageURL: "/img-page-divider-collage.webp",
        },
        body: {
          content: designList,
        },
      }}
    />
  );
};
