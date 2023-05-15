import React, { useRef } from "react";
import { v1 } from "uuid";
import { InternalGridContext } from "./InternalGridContext";

export function InternalGridProvider({
  children,
}: React.PropsWithChildren): JSX.Element {
  const gridNameRef = useRef(`grid${v1()}`);
  return (
    <InternalGridContext.Provider value={{ gridName: gridNameRef.current }}>
      {children}
    </InternalGridContext.Provider>
  );
}
