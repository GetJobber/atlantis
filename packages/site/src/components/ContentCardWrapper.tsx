import { PropsWithChildren } from "react";

/**
 * A very cool grid-based wrapper to make the contents auto-scale.
 *
 * @param param0 {children: ReactNode}
 * @returns ReactNode
 */
export const ContentCardWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="contentCardWrapper" data-elevation="elevated">
      {children}
    </div>
  );
};
