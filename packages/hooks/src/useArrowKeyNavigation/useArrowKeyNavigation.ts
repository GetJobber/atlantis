import { useOnKeyDown } from "..";

export function useArrowKeyNavigation({
  onUpArrow,
  onDownArrow,
  onRightArrow,
  onLeftArrow,
  onTabNavigation,
}: {
  onUpArrow?(event: KeyboardEvent): void;
  onDownArrow?(event: KeyboardEvent): void;
  onRightArrow?(event: KeyboardEvent): void;
  onLeftArrow?(event: KeyboardEvent): void;
  onTabNavigation?(event: KeyboardEvent): void;
}) {
  useOnKeyDown(
    // eslint-disable-next-line max-statements
    event => {
      switch (event.key) {
        case "ArrowUp": {
          if (onUpArrow) {
            event.preventDefault();
            onUpArrow(event);
          }
          break;
        }
        case "ArrowDown": {
          if (onDownArrow) {
            event.preventDefault();
            onDownArrow(event);
          }
          break;
        }
        case "ArrowRight": {
          if (onRightArrow) {
            event.preventDefault();
            onRightArrow(event);
          }
          break;
        }
        case "ArrowLeft": {
          if (onLeftArrow) {
            event.preventDefault();
            onLeftArrow(event);
          }
          break;
        }
        case "Tab": {
          if (onTabNavigation) {
            event.preventDefault();
            onTabNavigation(event);
          }
          break;
        }
      }
    },
    ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "Tab"],
  );
}
