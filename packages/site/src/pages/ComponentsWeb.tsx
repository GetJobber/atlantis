import {Button} from '@jobber/components';
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
                to: '/components/web/button',
                component: () => <Button label="Button" />,
              },
              {
                title: 'Combobox',
                to: '/components/web/combobox',
              },
              {title: 'DataList', to: '/components/web/datalist'},
              {title: 'Chip', to: '/components/web/chip'},
            ],
          },
        }}
      />
    </>
  );
};
