import React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "custom-elements": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
