import { BodyBlock } from "./BodyBlock";
import { ContentCard } from "./ContentCard";
import { HeaderBlock } from "./HeaderBlock";
import { PageWrapper } from "../layout/PageWrapper";
import { ContentCardProps } from "../types/components";

interface PageBlockProps {
  readonly structure: {
    header: {
      title: string;
      body: string;
      ctaLabel?: string;
      to?: string;
    };
    body: {
      title: string;
      content: ContentCardProps[];
    };
  };
}

export const PageBlock = ({ structure }: PageBlockProps) => {
  return (
    <PageWrapper>
      <HeaderBlock {...structure.header} />
      <BodyBlock title={structure.body.title}>
        <div
          style={{
            display: "grid",
            width: "100%",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gridTemplateRows: "auto",
            gap: "var(--space-base)",
          }}
        >
          {structure.body.content.map((content, index) => (
            <ContentCard {...content} key={index} />
          ))}
        </div>
      </BodyBlock>
    </PageWrapper>
  );
};
