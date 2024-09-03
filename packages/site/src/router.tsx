import {createBrowserRouter,  NonIndexRouteObject} from 'react-router-dom';
import {WelcomePage} from './pages/WelcomePage';
import {Layout} from './layout/Layout';
import {ComponentsWeb} from './pages/ComponentsWeb';
import {ComponentsMobile} from './pages/ComponentsMobile';
import {Patterns} from './pages/Patterns';
import {DesignTokens} from './pages/DesignTokens';
import {Hooks} from './pages/Hooks';
import {ContentComp} from './pages/Content';
import {Linters} from './pages/Linters';
import {Changelog} from './pages/Changelog';
import {ButtonPage} from './pages/ButtonPage';
import { IconNames } from '@jobber/components';
import { WelcomeGuide } from './pages/WelcomeGuide';
import { Colors } from './pages/Colors';

interface MyRouteObject extends NonIndexRouteObject {
  icon: IconNames;
  children?: MyRouteObject[];
}

export const routes: MyRouteObject[] = [
 {
      path: '/',
      element: <Layout />,
      icon:'addTag',
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
          icon:'compose',
          children: [
            {
              path: '/components/web',
              handle: 'Web',
              icon: 'company',
              element: <ComponentsWeb />,
            },
            {
              path: '/components/mobile',
              handle: 'Mobile',
              icon:'phone',
              element: <ComponentsMobile />,
            },
            {
              path: '/components/web/button',
              handle: 'Button',
              icon: 'checkbox',
              element: <ButtonPage />,
            },
          ],
        },
        {
          path: '/colors',
          handle: 'Colors',
          icon:'paidInvoice',
          element: <Colors />,
        },
        {
          path: '/design-tokens',
          handle: 'Design Tokens',
          icon:'directions',
          element: <DesignTokens />,
        },
        {
          path: '/content',
          handle: 'Content',
          icon:'condition',
          element: <ContentComp />,
        },
        {
          path: '/hooks',
          handle: 'Hooks',
          icon:'import',
          element: <Hooks />,
        },
        {
          path: '/linters',
          handle: 'Linters',
          icon:'link',
          element: <Linters />,
        },
        {
          path: '/changelog',
          handle: 'Changelog',
          icon:'checkbox',
          element: <Changelog />,
        },
        {
          path: '/welcome-guide',
          handle: 'Welcome Guide',
          icon:'checkbox',
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
