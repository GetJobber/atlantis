import { ContentExport } from "./content";

export interface ContentMapItem {
  intro: string;
  title: string;
  content: ContentExport["content"];
  noMaxWidth?: boolean;
  toc?: ContentExport["toc"];
}
export type ContentMapItems = Record<string, ContentMapItem>;
export type ContentMap = Record<string, ContentMapItems>;
