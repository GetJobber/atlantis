import { ReactNode } from "react";

export interface ContentCardProps {
  readonly title: string;
  readonly to: string;
  readonly component?: () => ReactNode;
  readonly imageURL?: string;
  readonly sections?: string[];
  onClick?: () => void;
}

export interface ContentListItem {
  title: string;
  to: string;
  imageURL?: string;
  additionalMatches?: string[];
}
