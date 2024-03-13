import { useEffect, useState } from "react";

/**
 * Announce a message on voice over whenever you do an action. This is
 * especially helpful when you have an action that adds or deletes an element
 * from the screen.
 */
export function useLiveAnnounce() {
  const [announcedMessage, setAnnouncedMessage] = useState("");

  useEffect(() => {
    let target: HTMLElement;

    if (announcedMessage) {
      target = createAnnouncedElement();
      setTimeout(() => target.append(announcedMessage), 100);
    }

    return () => target?.remove();
  }, [announcedMessage]);

  return {
    liveAnnounce: (message: string) => {
      setAnnouncedMessage(message);
    },
  };
}

// eslint-disable-next-line max-statements
function createAnnouncedElement() {
  const el = document.createElement("div");

  el.style.position = "absolute";
  el.style.width = "1px";
  el.style.height = "1px";
  el.style.overflow = "hidden";
  el.style.clipPath = " inset(100%)";
  el.style.whiteSpace = " nowrap";
  el.style.top = "0";
  el.setAttribute("role", "status");
  el.setAttribute("aria-atomic", "true");
  el.setAttribute("aria-live", "assertive");

  document.body.appendChild(el);

  return el;
}
