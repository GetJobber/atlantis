import React, { ReactElement } from "react";

interface BodyProps {
  readonly children: ReactElement | ReactElement[];
}

export function Body({ children }: BodyProps) {
  return <tbody>{children}</tbody>;
}
