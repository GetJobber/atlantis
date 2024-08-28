import {PropsWithChildren} from 'react';

export const PageWrapper = ({children}: PropsWithChildren) => {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
      }}>
      {children}
    </div>
  );
};
