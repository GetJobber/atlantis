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
      imageURL?: string;
    };
    body: {
      title: string;
      content: ContentCardProps[];
    };
  };
}

/**
 * Opinionated layout for a page. Has a Header, Body and list of content cards.
 * @param param0 PageBlockProps
 * @returns
 */
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
