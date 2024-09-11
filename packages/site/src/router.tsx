import { createBrowserRouter, NonIndexRouteObject } from 'react-router-dom';
import { WelcomePage } from './pages/HomePage';
import { Layout } from './layout/Layout';
import { ComponentsWeb } from './pages/ComponentsWeb';
import { ComponentsMobile } from './pages/ComponentsMobile';
import { WelcomeGuide } from './pages/WelcomeGuide';
import { Colors } from './pages/Colors';
import { WebComponentPage } from './components/WebComponentPage';
import { MobileComponentPage } from './components/MobileComponentPage';

interface MyRouteObject extends NonIndexRouteObject {
  children?: MyRouteObject[];
  inNav?: boolean;
}

export const routes: MyRouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        handle: 'Home',
        element: <WelcomePage />,
      },
      {
        path: 'components',
        handle: 'Components',
        children: [
          {
            path: '/components/web',
            handle: 'Web',
            element: <ComponentsWeb />,
          },
          {
            path: '/components/web/Button',
            handle: 'Button',
          },
          {
            path: '/components/web/Chip',
            handle: 'Chip',
          },
          {
            path: '/components/web/Disclosure',
            handle: 'Disclosure',
          },
          {
            path: '/components/web/StatusLabel',
            handle: 'StatusLabel',
          },
          {
            path: '/components/mobile',
            handle: 'Mobile',
            element: <ComponentsMobile />,
          },
          {
            path: '/components/mobile/Button',
            handle: 'MobileButton',
            inNav: false,
            element: <MobileComponentPage />,
          },
          {
            path: '/components/web/:name',
            handle: 'Component',
            inNav: false,
            element: <WebComponentPage />,
          },

        ],
      },
      {
        path: '/colors',
        handle: 'Colors',
        element: <Colors />,
      },

      {
        path: '/welcome-guide',
        handle: 'Welcome Guide',
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
