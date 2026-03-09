import { PageBlock } from "../components/PageBlock";
import { proposalsList } from "../proposalsList";

export const ProposalsPage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: "Proposals",
          body: "Historical and in-progress proposal documents for Atlantis components and patterns",
        },
        body: {
          content: proposalsList,
        },
      }}
    />
  );
};
