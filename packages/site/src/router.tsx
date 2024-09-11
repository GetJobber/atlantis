import { createBrowserRouter, NonIndexRouteObject } from 'react-router-dom';
import { WelcomePage } from './pages/HomePage';
import { Layout } from './layout/Layout';
import { ComponentsWeb } from './pages/ComponentsWeb';
import { ComponentsMobile } from './pages/ComponentsMobile';
import { IconNames } from '@jobber/components';
import { WelcomeGuide } from './pages/WelcomeGuide';
import { Colors } from './pages/Colors';
import { WebComponentPage } from './components/WebComponentPage';
import { MobileComponentPage } from './components/MobileComponentPage';

interface MyRouteObject extends NonIndexRouteObject {
  icon: IconNames;
  children?: MyRouteObject[];
  inNav?: boolean;
}

export const routes: MyRouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    icon: 'addTag',
    children: [
      {
        path: '/',
        handle: 'Home',
        icon: 'home',
        element: <WelcomePage />,
      },
      {
        path: 'components',
        handle: 'Components',
        icon: 'compose',
        children: [
          {
            path: '/components/web',
            handle: 'Web',
            icon: 'company',
            element: <ComponentsWeb />,
            children: [
              {
                path: '/components/web/Button',
                handle: 'Button',
                icon: 'company',
              },
              {
                path: '/components/web/Chip',
                handle: 'Chip',
                icon: 'company',
              },
              {
                path: '/components/web/Disclosure',
                handle: 'Disclosure',
                icon: 'company',
              },
              {
                path: '/components/web/StatusLabel',
                handle: 'StatusLabel',
                icon: 'company',
              },
            ],
          },
          {
            path: '/components/mobile',
            handle: 'Mobile',
            icon: 'phone',
            element: <ComponentsMobile />,
          },
          {
            path: '/components/mobile/Button',
            handle: 'MobileButton',
            icon: 'phone',
            inNav: false,
            element: <MobileComponentPage />,
          },
          {
            path: '/components/web/:name',
            handle: 'Component',
            icon: 'component',
            inNav: false,
            element: <WebComponentPage />,
          },

        ],
      },
      {
        path: '/colors',
        handle: 'Colors',
        icon: 'paidInvoice',
        element: <Colors />,
      },

      {
        path: '/welcome-guide',
        handle: 'Welcome Guide',
        icon: 'checkbox',
        element: <WelcomeGuide />,
      },
    ],
  },
]

export const router = createBrowserRouter(
  [
    ...routes
  ],
  {},
);
