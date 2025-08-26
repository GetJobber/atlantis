import { PropsWithChildren } from "react";

/**
 * Wraps the page in a main tag and sets the width and height to 100%.
 * @param param0 PropsWithChildren
 * @returns ReactNode
 */
export const PageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
      }}
    >
      {children}
    </div>
  );
};
