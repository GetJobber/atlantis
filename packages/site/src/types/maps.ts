import { ContentExport } from "./content";

export interface ContentMapItem {
  intro: string;
  title: string;
  content: ContentExport["content"];
}
export type ContentMapItems = Record<string, ContentMapItem>;
export type ContentMap = Record<string, ContentMapItems>;
