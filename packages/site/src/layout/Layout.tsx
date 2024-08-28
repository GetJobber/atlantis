import {PropsWithChildren} from 'react';
import {NavMenu} from './NavMenu';
import {Outlet} from 'react-router-dom';

export const Layout = () => {
  return (
    <LayoutWrapper>
      <NavMenu />
      <div style={{overflow: 'auto', width: '100%', minHeight: '100%'}}>
        <Outlet />
      </div>
    </LayoutWrapper>
  );
};

export const LayoutWrapper = ({children}: PropsWithChildren) => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100dvh',
        background: 'var(--color-surface)',
      }}>
      {children}
    </div>
  );
};
