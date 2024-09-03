import {createBrowserRouter,  NonIndexRouteObject} from 'react-router-dom';
import {WelcomePage} from './pages/WelcomePage';
import {Layout} from './layout/Layout';
import {ComponentsWeb} from './pages/ComponentsWeb';
import {ComponentsMobile} from './pages/ComponentsMobile';
import { IconNames } from '@jobber/components';
import { WelcomeGuide } from './pages/WelcomeGuide';
import { Colors } from './pages/Colors';
import { ButtonPage } from './pages/ButtonPage';
import { ButtonMobilePage } from './pages/ButtonMobilePage';

interface MyRouteObject extends NonIndexRouteObject {
  icon: IconNames;
  children?: MyRouteObject[];
  inNav?: boolean;
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
              path: '/components/mobile/button',
              handle: 'MobileButton',
              icon:'phone',
              inNav:false,
              element: <ButtonMobilePage />,
            },
            {
              path: '/components/web/button',
              handle: 'WebButton',
              icon:'addTag',
              inNav:false,
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
