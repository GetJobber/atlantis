import {Content, Page} from '@jobber/components';
import WelcomeGuideContent from '../content/WelcomeGuideContent.mdx'
export const WelcomeGuide = () => {
  return (
    <div style={{backgroundColor: 'var(--color-surface'}}>
        <Page intro='The content below is our README file. ' title='Welcome Guide'>
      <Content>
        <WelcomeGuideContent />
      </Content>
      </Page>
    </div>
  );
};
