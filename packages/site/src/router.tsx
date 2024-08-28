import {createBrowserRouter} from 'react-router-dom';
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

export const router = createBrowserRouter(
  [
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
              path: '/components/mobile',
              handle: 'Mobile',
              element: <ComponentsMobile />,
            },
            {
              path: '/components/web/button',
              handle: 'Button',
              element: <ButtonPage />,
            },
          ],
        },
        {
          path: '/patterns',
          handle: 'Patterns',
          element: <Patterns />,
        },
        {
          path: '/design-tokens',
          handle: 'Design Tokens',
          element: <DesignTokens />,
        },
        {
          path: '/content',
          handle: 'Content',
          element: <ContentComp />,
        },
        {
          path: '/hooks',
          handle: 'Hooks',
          element: <Hooks />,
        },
        {
          path: '/linters',
          handle: 'Linters',
          element: <Linters />,
        },
        {
          path: '/changelog',
          handle: 'Changelog',
          element: <Changelog />,
        },
      ],
    },
  ],
  {},
);
