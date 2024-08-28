import {Typography, Content} from '@jobber/components';

export const ContentComp = () => {
  return (
    <div style={{backgroundColor: 'var(--color-surface'}}>
      <Content>
        <Typography size="largest" fontWeight="bold" fontFamily="display">
          Content
        </Typography>
      </Content>
    </div>
  );
};
