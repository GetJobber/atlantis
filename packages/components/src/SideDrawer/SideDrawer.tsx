import React, { useId, useState } from "react";
import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { SideDrawerActions } from "./SideDrawerActions";
import { SideDrawerContext } from "./SideDrawerContext";
import { SideDrawerTitle } from "./SideDrawerTitle";
import { SideDrawerToolbar } from "./SideDrawerToolbar";
import styles from "./SideDrawer.css";
import { Button } from "../Button";
import { Flex } from "../Flex";

interface SideDrawerProps extends PropsWithChildren {
  readonly onRequestClose: () => void;
  readonly open: boolean;
}

export function SideDrawer({
  children,
  onRequestClose,
  open,
}: SideDrawerProps) {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [toolbarPortalId, toolbarPortalSelector] = usePortalId();
  const [titlePortalId, titlePortalSelector] = usePortalId();
  const [actionsPortalId, actionsPortalSelector] = usePortalId();

  const container = globalThis.document?.body || null;

  if (!container || !open) return null;

  return createPortal(
    <SideDrawerContext.Provider
      value={{
        actionPortal: ref?.querySelector(actionsPortalSelector),
        titlePortal: ref?.querySelector(titlePortalSelector),
        toolbarPortal: ref?.querySelector(toolbarPortalSelector),
      }}
    >
      <div
        className={classNames(styles.container, open && styles.open)}
        ref={setRef}
        role="dialog"
      >
        <div className={styles.header}>
          <Flex template={["grow", "shrink"]}>
            <div data-portal-id={titlePortalId} />

            <div className={styles.headerActions}>
              <div
                className={styles.hideWhenEmpty}
                data-portal-id={actionsPortalId}
              />
              <Button
                ariaLabel="Close Message Center"
                icon="cross"
                onClick={onRequestClose}
                type="secondary"
                variation="subtle"
              />
            </div>
          </Flex>

          <div
            className={styles.hideWhenEmpty}
            data-portal-id={toolbarPortalId}
          />
        </div>

        {children}
      </div>
    </SideDrawerContext.Provider>,
    container,
  );
}

function usePortalId(): [string, string] {
  const id = useId();
  const portalId = `[data-portal-id="${id}"]`;

  return [id, portalId];
}

SideDrawer.Title = SideDrawerTitle;
SideDrawer.Toolbar = SideDrawerToolbar;
SideDrawer.Actions = SideDrawerActions;
