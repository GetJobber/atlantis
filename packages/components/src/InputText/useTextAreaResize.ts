import { RefObject } from "react";
import { RowRange } from "./InputText.types";

/**
 * Hook for resizing a textarea based on its content. The textarea will grow up to the max number of rows specified.
 */
export function useTextAreaResize(rows?: number | RowRange) {
  const rowRange = getRowRange(rows);

  function textAreaHeight(textArea: HTMLTextAreaElement) {
    const {
      lineHeight,
      borderBottomWidth,
      borderTopWidth,
      paddingBottom,
      paddingTop,
    } = window.getComputedStyle(textArea);

    const maxHeight =
      rowRange.max * parseFloat(lineHeight) +
      parseFloat(borderTopWidth) +
      parseFloat(borderBottomWidth) +
      parseFloat(paddingTop) +
      parseFloat(paddingBottom);

    const scrollHeight =
      textArea.scrollHeight +
      parseFloat(borderTopWidth) +
      parseFloat(borderBottomWidth);

    return Math.min(scrollHeight, maxHeight);
  }

  function resize(
    inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement>,
    wrapperRef: RefObject<HTMLDivElement>,
  ) {
    if (
      inputRef &&
      inputRef.current instanceof HTMLTextAreaElement &&
      wrapperRef &&
      wrapperRef?.current instanceof HTMLDivElement
    ) {
      if (rowRange.min === rowRange.max) return;

      inputRef.current.style.flexBasis = "auto";
      wrapperRef.current.style.height = "auto";
      inputRef.current.style.flexBasis =
        textAreaHeight(inputRef.current) + "px";
    }
  }

  return { resize, rowRange };
}

function getRowRange(rows?: number | RowRange): RowRange {
  if (rows === undefined) {
    return { min: 3, max: 3 };
  } else if (typeof rows === "object") {
    return { min: rows.min, max: rows.max };
  } else {
    return { min: rows, max: rows };
  }
}
