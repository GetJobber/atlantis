import React, { PropsWithChildren } from "react";

interface LinkProps {
  readonly ariaLabel?: string;
  readonly ariaExpanded?: boolean;
  readonly external?: boolean;
  readonly url: string;
}

export function Link({
  ariaLabel,
  ariaExpanded,
  external = false,
  url,
  children,
}: PropsWithChildren<LinkProps>) {
  return (
    <a
      href={url}
      {...(external && { target: "_blank" })}
      {...(ariaLabel && { "aria-label": ariaLabel })}
      {...(ariaExpanded && { "aria-expanded": ariaExpanded })}
    >
      {children}
    </a>
  );
}
