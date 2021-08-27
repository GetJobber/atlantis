import React, { ReactNode } from "react";

interface LinkCardProps {
  className: string;
  url: string;
  readonly children: ReactNode | ReactNode[];
}

export function Cardlink({ className, url, children }: LinkCardProps) {
  return (
    <a className={className} href={url}>
      {children}
    </a>
  );
}
