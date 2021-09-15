import React, { PropsWithChildren, useEffect, useState } from "react";

export const DeferRender = ({ children }: PropsWithChildren<{}>) => {
  const [ssrComplete, setSsrComplete] = useState(false);
  useEffect(() => {
    setSsrComplete(true);
  });

  if (ssrComplete) {
    return <>{children}</>;
  }

  return <></>;
};
