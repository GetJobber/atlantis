import {Content, Page} from '@jobber/components';
import ColorsContent from './content/Colors.content.mdx'

export const Colors = () => {
  return (
    <div style={{backgroundColor: 'var(--color-surface'}}>
      <Page intro='A bit of info about our colors' title='Colors'>
      <Content>
        <ColorsContent />
      </Content>
      </Page>
    </div>
  );
};
