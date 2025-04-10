import { ReactNode } from "react";

export interface ContainerProps {
  readonly children: ReactNode;
  readonly name: string;
  readonly className?: string;
}
export interface ContainerApplyProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}
