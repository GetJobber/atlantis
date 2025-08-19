import type { ReactElement } from "react";
import React from "react";

interface BodyProps {
  readonly children: ReactElement | ReactElement[];
}

export function Body({ children }: BodyProps) {
  return <tbody>{children}</tbody>;
}
