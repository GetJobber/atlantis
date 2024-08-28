import React from 'react';
import ReactDOM from 'react-dom/client';
import '@jobber/design/foundation.css';
import '@jobber/components/dist/styles.css';
import './index.css';

import { RouterProvider } from 'react-router';
import { router } from './router.tsx';
import { MDXProvider } from '@mdx-js/react';

function renderApp() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <MDXProvider>
        <RouterProvider router={router} />
      </MDXProvider>
    </React.StrictMode>,
  );
}
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    renderApp()
  },200)
});