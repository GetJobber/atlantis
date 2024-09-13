export interface ContentMapItem {
  intro: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
}
export type ContentMapItems = Record<string, ContentMapItem>;
export type ContentMap = Record<string, ContentMapItems>;
