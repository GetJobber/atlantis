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
  const linkProps = {
    ...(external && { target: "_blank" }),
    href: url,
    ...(ariaLabel && { "aria-label": ariaLabel }),
  };

  return <a {...linkProps}>{children}</a>;
}
