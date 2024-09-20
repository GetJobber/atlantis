export interface ContentMapItem {
  intro: string;
  title: string;
  content: string;
}
export type ContentMapItems = Record<string, ContentMapItem>;
export type ContentMap = Record<string, ContentMapItems>;
