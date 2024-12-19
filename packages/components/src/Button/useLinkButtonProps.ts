import React, { useCallback } from "react";
import { useButtonNavigationProvider } from "./ButtonNavigationProvider";
import { ButtonProps } from "./Button.types";

export function useLinkButtonProps(props: ButtonProps) {
  const { routerOptions, onClick, url, useClientSideRouting } = props;
  const { openLink, buildLocationHref } = useButtonNavigationProvider();
  const routerHref = buildLocationHref(url, routerOptions);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      useClientSideRouting && event.preventDefault();

      onClick?.(event);
      useClientSideRouting &&
        url &&
        openLink(
          url,
          routerOptions,
          event as React.MouseEvent<HTMLAnchorElement>,
        );
    },
    [onClick, openLink, buildLocationHref, routerOptions],
  );

  return {
    handleClick,
    href: useClientSideRouting ? routerHref : url,
  };
}
