import {ReactNode} from 'react';
import {PageWrapper} from '../layout/PageWrapper';
import {BodyBlock} from './BodyBlock';
import {ContentCard} from './ContentCard';
import {HeaderBlock} from './HeaderBlock';

interface PageBlockProps {
  structure: {
    header: {
      title: string;
      body: string;
      ctaLabel?: string;
      to?: string;
    };
    body: {
      title: string;
      content: Array<{title: string; to: string; component?: () => ReactNode}>;
    };
  };
}
export const PageBlock = ({structure}: PageBlockProps) => {
  return (
    <PageWrapper>
      <HeaderBlock {...structure.header} />
      <BodyBlock title={structure.body.title}>
        {structure.body.content.map(content => (
          <ContentCard {...content} />
        ))}
      </BodyBlock>
    </PageWrapper>
  );
};
