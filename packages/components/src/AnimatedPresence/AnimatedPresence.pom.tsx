import React, { useState } from "react";
import { render as renderComponent, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { AnimatedPresence } from "./AnimatedPresence";

const visibleNowText = "Visible Now";
const visibleLaterText = "Visible Later";

export function render() {
  return renderComponent(<ConditionalComponent />);
}

export async function toggle() {
  await userEvent.click(screen.getByRole("button"));
}

export function alwaysVisibleElement() {
  return screen.getByText(visibleNowText);
}

export function sometimesVisibleElement() {
  return screen.queryByText(visibleLaterText);
}

function ConditionalComponent() {
  const [visible, setVisible] = useState(false);

  return (
    <AnimatedPresence>
      {visible && <div>{visibleLaterText}</div>}

      <div>{visibleNowText}</div>

      <button onClick={() => setVisible(!visible)} type="button">
        Toggle
      </button>
    </AnimatedPresence>
  );
}
