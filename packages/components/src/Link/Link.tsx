import React, { PropsWithChildren } from "react";

interface LinkProps {
  readonly ariaLabel?: string;
  readonly external?: boolean;
  readonly url: string;
}

export function Link({
  ariaLabel,
  external = false,
  url,
  children,
}: PropsWithChildren<LinkProps>) {
  return (
    <a
      href={url}
      {...(external && { target: "_blank" })}
      {...(ariaLabel && { "aria-label": ariaLabel })}
    >
      {children}
    </a>
  );
}
