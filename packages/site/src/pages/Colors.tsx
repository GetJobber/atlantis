import {Content, Page} from '@jobber/components';
import ColorsContent from '../content/Colors.content.mdx'

export const Colors = () => {
  return (
    <div style={{backgroundColor: 'var(--color-surface'}}>
      <Page intro='Color can provide visual cues for users to navigate and understand an
interface.' title='Colors'>
      <Content>
        <ColorsContent />
      </Content>
      </Page>
    </div>
  );
};
