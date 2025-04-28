/**
 * Checks if the event is a plain left click
 * @param evt - The event to check
 * @returns True if the event is a plain left click, false otherwise
 */
export function isNormalClick(evt: React.MouseEvent<HTMLElement>) {
  return (
    evt.button === 0 &&
    !evt.metaKey &&
    !evt.ctrlKey &&
    !evt.shiftKey &&
    !evt.altKey
  );
}
