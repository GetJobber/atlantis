import {Button, Chip, StatusLabel, Switch, Disclosure} from '@jobber/components';
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
              {
                title: 'Disclosure',
                to: '/components/web/Disclosure',
                component: () => <Disclosure title='Disclosure'>Here's the child content</Disclosure>,
              },
              {
                title: 'StatusLabel',
                to: '/components/web/StatusLabel',
                component: () => <StatusLabel status="success" label='StatusLabel' />,
              },
              {
                title: 'Switch',
                to: '/components/web/Switch',
                component: () => <Switch />,
              },
            ],
          },
        }}
      />
    </>
  );
};
