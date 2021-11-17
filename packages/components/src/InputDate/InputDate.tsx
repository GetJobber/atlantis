import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { omit } from "lodash";
import styles from "./InputDate.css";
import { DatePicker } from "../DatePicker";
import { InputText } from "../InputText";
import { ActivatorProps } from "../DatePicker/DatePicker";

interface InputDateProps {
  /**
   * Styles the text bold and uppercased
   * @default false
   */
  readonly loud?: boolean;

  /**
   * Text to display.
   */
  readonly text: string;

  /**
   * Click handler.
   */
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;
}

export function InputDate({ loud = false, text, onClick }: InputDateProps) {
  const [ref, setRef] = useState<HTMLElement | null>();
  const [selected, setSelected] = useState(new Date(1, 1, 20));

  return (
    <div ref={setRef}>
      <DatePicker
        selected={selected}
        onChange={setSelected}
        activator={generateActivator}
      />
    </div>
  );

  function generateActivator(props: ActivatorProps) {
    const [eventState, setEventState] = useState<Event>();
    const newProps = omit(props, ["onChange"]);
    useEffect(() => {
      const input = ref?.querySelector("input");
      if (props.onChange) {
        input?.addEventListener("keydown", e => {
          console.log("IT'S THERE");
          setEventState(e);
        });
      }

      // return () => {
      //   console.log("FIRED!");
      //   if (props.onChange) {
      //     input?.removeEventListener("change", props.onChange);
      //   }
      // };
    }, [ref]);

    return (
      <InputText
        {...newProps}
        onChange={() =>
          props.onChange && eventState && props.onChange(eventState)
        }
      />
    );
  }
}
