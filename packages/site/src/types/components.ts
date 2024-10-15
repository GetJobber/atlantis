import { ReactNode } from "react";

export interface ContentCardProps {
  readonly title: string;
  readonly to: string;
  readonly component?: () => ReactNode;
  readonly imageURL?: string;
  onClick?: () => void;
}
