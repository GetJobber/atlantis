import { BodyBlock } from "./BodyBlock";
import { ContentCard } from "./ContentCard";
import { HeaderBlock } from "./HeaderBlock";
import { ContentCardWrapper } from "./ContentCardWrapper";
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
        <ContentCardWrapper>
          {structure.body.content.map((content, index) => (
            <ContentCard {...content} key={index} />
          ))}
        </ContentCardWrapper>
      </BodyBlock>
    </PageWrapper>
  );
};
