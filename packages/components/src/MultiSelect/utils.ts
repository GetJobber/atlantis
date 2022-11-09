export function handleKeyboardShortcut(
  setupKeyListeners: (key: string) => void,
) {
  function callback(event: KeyboardEvent) {
    const { metaKey, ctrlKey, key, target } = event;
    if (!open) return;

    const shouldTriggerShortcut =
      target instanceof HTMLButtonElement ? metaKey || ctrlKey : true;

    if (!shouldTriggerShortcut) return;

    event.preventDefault();
    event.stopPropagation();
    setupKeyListeners(key);
  }

  return { callback };
}
