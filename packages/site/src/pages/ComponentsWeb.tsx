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
                imageURL: '../public/Button.png',
              },
              {
                title: 'Chip',
                to: '/components/web/Chip',
                imageURL: '../public/Chip.png',
              },
              {
                title: 'Disclosure',
                to: '/components/web/Disclosure',
                imageURL: '../public/Disclosure.png',
              },
              {
                title: 'StatusLabel',
                to: '/components/web/StatusLabel',
                imageURL: '../public/StatusLabel.png',
              },
              {
                title: 'Switch',
                to: '/components/web/Switch',
                imageURL: '../public/Switch.png',
              },
            ],
          },
        }}
      />
    </>
  );
};
