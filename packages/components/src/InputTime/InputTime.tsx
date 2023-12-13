import React from "react";
import { InputTimeProps } from "./InputTimeProps";
import { InternalInputTime } from "./InternalInputTime";
import { ClientOnly } from "../LightBox/ClientOnly";

const canUseDom = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

function InputTimeSafe(props: InputTimeProps) {
  return (
    <ClientOnly>
      <InternalInputTime {...props} />
    </ClientOnly>
  );
}

export const InputTime = canUseDom ? InputTimeSafe : () => null;
