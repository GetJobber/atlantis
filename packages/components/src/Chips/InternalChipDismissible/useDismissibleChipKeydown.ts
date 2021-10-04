import { KeyboardEvent } from "react";

export interface KeyDownCallBacks {
  [key: string]: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export function useDismissibleChipKeydown(callbacks: KeyDownCallBacks) {
  return (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.shiftKey) return;

    Object.entries(callbacks).forEach(([key, callback]) => {
      if (event.key === key) {
        event.preventDefault();
        callback(event);
      }
    });
  };
}
