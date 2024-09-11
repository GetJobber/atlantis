import { PropsWithChildren } from "react";

export const PageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <main
      style={{
        width: "100%",
        minHeight: "100%",
      }}
    >
      {children}
    </main>
  );
};
