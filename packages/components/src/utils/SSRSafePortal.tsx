import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface SSRSafePortalProps extends PropsWithChildren {
  /**
   * The target element where your component will be rendered.
   *
   * Defaults to `document.body`.
   */
  readonly target?: HTMLElement;
}

export function SSRSafePortal({ children, target }: SSRSafePortalProps) {
  const [container, setContainer] = useState<HTMLElement>();

  useEffect(() => {
    setContainer(target ?? globalThis.document.body);
  }, []);

  if (!container) return null;

  return createPortal(children, container);
}
