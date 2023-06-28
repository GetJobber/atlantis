import React, { PropsWithChildren } from "react";

interface LinkProps {
  readonly url: string;
  readonly ariaLabel?: string;
  readonly ariaExpanded?: boolean;
  readonly external?: boolean;
}

export function Link({
  url,
  children,
  ariaLabel,
  ariaExpanded,
  external = false,
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
