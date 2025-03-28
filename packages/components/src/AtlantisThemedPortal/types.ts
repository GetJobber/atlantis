import { PropsWithChildren } from "react";

export interface AtlantisThemedPortalProps extends PropsWithChildren {
  /** The DOM element to render the portal within. Defaults to `document.body`. */
  container?: HTMLElement;
}
