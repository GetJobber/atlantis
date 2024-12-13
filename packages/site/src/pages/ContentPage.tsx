import { PageBlock } from "../components/PageBlock";
import { contentList } from "../contentList";

export const ContentPage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Content",
          body: "Before you start building, make sure you’re organized",
        },
        body: {
          content: contentList,
        },
      }}
    />
  );
};
