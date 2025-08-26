import { ContentExport } from "./content";

export interface ContentMapItem {
  intro: string;
  title: string;
  content: ContentExport["content"];
  noMaxWidth?: boolean;
}
export type ContentMapItems = Record<string, ContentMapItem>;
export type ContentMap = Record<string, ContentMapItems>;
