import { Card, Content, Heading } from '@jobber/components';
import {useNavigate} from 'react-router-dom';
import image from '../assets/dummy.png';
import {PropsWithChildren, ReactNode} from 'react';

interface ContentCardProps {
  title: string;
  to: string;
  component?: () => ReactNode;
}

export const ComponentWrapper = ({children}: PropsWithChildren) => {
  return (
    <div
      style={{
        width: '100%',
        padding: 'var(--space-large)',
        height: 'calc(100% - 57px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}>
      {children}
    </div>
  );
};

export const ContentCard = ({title, to, component}: ContentCardProps) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(to)}>
      {!component ? (
        <img style={{width: '100%'}} src={image} />
      ) : (
        <ComponentWrapper>{component()}</ComponentWrapper>
      )}
      <Content>
        <Heading level={4}>{title}</Heading>
      </Content>
    </Card>
  );
};
