import {Button, Chip} from '@jobber/components';
import {PageBlock} from '../components/PageBlock';
export const ComponentsWeb = () => {
  return (
    <>
      <PageBlock
        structure={{
          header: {
            title: 'Web components',
            body: 'They are the best',
          },
          body: {
            title: 'Components',
            content: [
              {
                title: 'Button',
                to: '/components/web/Button',
                component: () => <Button label="Button" />,
              },
              {
                title: 'Chip',
                to: '/components/web/Chip',
                component: () => <Chip label="Chip" />,
              },
            ],
          },
        }}
      />
    </>
  );
};
