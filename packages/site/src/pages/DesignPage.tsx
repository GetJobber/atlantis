import { PageBlock } from "../components/PageBlock";
import { designList } from "../designList";

export const DesignPage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Design",
          body: "Design elements and concepts that apply across Jobber's ecosystem",
          imageURL:
            "https://images.unsplash.com/photo-1482731215275-a1f151646268?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        body: {
          title: "Design",
          content: designList,
        },
      }}
    />
  );
};
