export interface ContentMapItem {
  intro: string;
  title: string;
  content: typeof import("*.md");
}
export type ContentMapItems = Record<string, ContentMapItem>;
export type ContentMap = Record<string, ContentMapItems>;
