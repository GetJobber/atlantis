import React, { useRef, useState } from "react";
import classnames from "classnames";
import { TagProps } from "./Button.types";
import styles from "./ButtonDelightful.css";
import { Boom } from "./Boom";

interface ButtonDelightProps extends TagProps {
  readonly children?: React.ReactNode;
  readonly onClick?: (
    e: React.MouseEvent<HTMLButtonElement> | undefined,
  ) => void;
  readonly href?: string;
}

export const ButtonDelight = (props: ButtonDelightProps) => {
  const [delightOn, setDelightOn] = useState(false);
  const [explodeOn, setExplodeOn] = useState(false);
  const [boomEnabled, setBoomEnabled] = useState(false);
  const [splitWord, setSplitWord] = useState<string[]>([]);
  const delightfulButton = useRef<HTMLButtonElement>(null);

  const goGoDelight = async () => {
    const elem: HTMLButtonElement | null = delightfulButton.current;

    if (elem && splitWord.length === 0) {
      const words = elem.innerText;
      const letters = words.split("");
      setSplitWord(letters);
      requestAnimationFrame(() => {
        setDelightOn(true);
      });
      const delay = letters.length * 30;
      setTimeout(() => {
        setDelightOn(false);
        setExplodeOn(true);
        setTimeout(() => {
          setBoomEnabled(true);
          setTimeout(() => {
            setBoomEnabled(false);
          }, 1300);
        }, 20);
        setTimeout(() => {
          setExplodeOn(false);
          setTimeout(() => {
            setSplitWord([]);
          }, 200);
        }, delay);
      }, delay);
    }
  };

  const delightfulClick = (
    e: React.MouseEvent<HTMLButtonElement> | undefined,
  ) => {
    goGoDelight();
    setTimeout(() => {
      if (props.onClick && !props.href) {
        props.onClick(e);
      } else if (props.onClick && props.href) {
        window.location.href = props.href;
      }
    }, 1500);
  };

  return (
    <button
      {...props}
      onClick={delightfulClick}
      type="button"
      ref={delightfulButton}
    >
      <Boom enabled={boomEnabled} particles={150} boomType="firework" />
      {splitWord.length === 0
        ? props.children
        : splitWord.map((letter, index) => {
            const spanClassNames = classnames(styles.span, {
              [styles.space]: letter === " ",
              [styles.drop]: delightOn,
              [styles.explode]: explodeOn,
            });

            return (
              <span
                key={index}
                className={spanClassNames}
                style={{
                  transitionDelay: delightOn ? String(index / 100) + "s" : "0s",
                }}
              >
                {letter}
              </span>
            );
          })}
    </button>
  );
};
