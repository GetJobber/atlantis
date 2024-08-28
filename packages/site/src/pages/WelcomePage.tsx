import {PageBlock} from '../components/PageBlock';
export const WelcomePage = () => {
  return (
    <PageBlock
      structure={{
        header: {
          title: 'Atlantis',
          body: 'Design and build consumer-grade products with this world-class design system',
          ctaLabel: 'Get Started',
          to: '/web/components',
        },
        body: {
          title: 'Packages',
          content: [
            {title: 'Web', to: '/components/web'},
            {title: 'Mobile', to: '/components/mobile'},
            {title: 'Design Tokens', to: '/design-tokens'},
            {title: 'Content', to: '/content'},
          ],
        },
      }}
    />
  );
};
