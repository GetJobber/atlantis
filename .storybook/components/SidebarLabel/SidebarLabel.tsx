import React, { MouseEvent, useEffect, useRef } from "react";
import { useStorybookApi } from "@storybook/api";
import { alphaComponents } from "./alphaComponents";

export function SidebarLabel(label: Record<string, any>) {
  const ref = useRef<HTMLSpanElement>(null);
  const { selectStory, getCurrentStoryData } = useStorybookApi();
  const currentStory = getCurrentStoryData();

  useEffect(() => {
    const parentElement = ref.current?.parentElement;

    // Automatically expand the first level components group by initiating a
    // click that relies on event bubbling on component mount.
    if (
      label.id.startsWith("components") &&
      label.depth === 1 &&
      parentElement?.getAttribute("aria-expanded") === "false"
    ) {
      parentElement?.click();
    }
  }, []);

  return (
    <span ref={ref} onClick={handleClick}>
      {label.name}
      {alphaComponents.includes(label.name) && (
        <span
          style={{
            marginLeft: "var(--space-small)",
            padding: "var(--space-smallest)",
            backgroundColor: "var(--color-yellow--dark)",
            fontSize: "var(--typography--fontSize-small)",
            borderRadius: "var(--radius-large)",
          }}
        >
          Alpha
        </span>
      )}
    </span>
  );

  function handleClick(event: MouseEvent<HTMLSpanElement>) {
    if (!label.children) return;
    const targetID = label.children[0];

    if (
      label.type === "group" &&
      // Ensure we only trigger the selection when it's a second level (or deeper) group
      label.depth > 1 &&
      // Ensure we only trigger the selection when it's a doc page. This should
      // still allow Storybook's auto selecting the first story in a group.
      targetID?.endsWith("page") &&
      // Don't select the already selected story. This allows the collapsing of
      // the whole group again.
      currentStory.id !== targetID
    ) {
      // Don't trigger the parent click handler which stops the collapsing and
      // expanding again
      event.stopPropagation();

      selectStory(targetID);
    }
  }
}
