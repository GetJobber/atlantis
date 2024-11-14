import { PageBlock } from "../components/PageBlock";
import { designList } from "../designList";

export const DesignPage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Design",
          body: "Design elements and concepts that apply across Jobber's ecosystem",
        },
        body: {
          title: "Design",
          content: designList,
        },
      }}
    />
  );
};
