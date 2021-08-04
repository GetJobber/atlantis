import React from "react";
import { Button } from "../Button";
import { Icon } from "../Icon";

export interface Breadcrumb {
  label: string;
  url?: string;
  onClick?(): void;
}

export interface BreadcrumbProps {
  breadcrumbs: Breadcrumb[];
}

export function Breadcrumb({ breadcrumbs }: BreadcrumbProps) {
  const { length } = breadcrumbs;

  return (
    <>
      {breadcrumbs.map((crumb, index) => {
        if (length > 1) {
          return index + 1 == length ? (
            <Button
              url={crumb.url}
              label={crumb.label}
              onClick={crumb.onClick}
              type="tertiary"
              size="small"
            />
          ) : (
            <>
              <Button
                url={crumb.url}
                label={crumb.label}
                onClick={crumb.onClick}
                type="tertiary"
                size="small"
              />
              <Icon color="greyBlue" name="arrowRight" />
            </>
          );
        } else {
          return (
            <Button
              icon="backArrow"
              url={crumb.url}
              label={crumb.label}
              onClick={crumb.onClick}
              type="tertiary"
              size="small"
            />
          );
        }
      })}
    </>
  );
}
