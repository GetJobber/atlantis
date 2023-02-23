import React, { PropsWithChildren } from "react";
import { Heading } from "@jobber/components/Heading";

interface HeaderProps {
  readonly id: string;
  readonly level: number;
  readonly isTOC: boolean;
}

export function Header({
  id,
  level,
  children,
  isTOC = false,
}: PropsWithChildren<HeaderProps>) {
  return (
    <Heading level={level}>
      <a
        style={{
          color: "inherit",
          textDecoration: "none",
        }}
        href={`${window.parent.location.origin}/${window.parent.location.search}#${id}`}
        id={id}
        target="_parent"
        data-toc={isTOC}
        onClick={handleClick}
      >
        {children}
      </a>
    </Heading>
  );

  function handleClick(e) {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    window.parent.history.pushState("", "", `${window.location.search}#${id}`);
    navigator.clipboard.writeText(window.parent.location.href);
  }
}
