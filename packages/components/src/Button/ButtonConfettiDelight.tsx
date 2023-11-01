import React, { useRef, useState } from "react";
import classnames from "classnames";
import styles from "./ButtonConfetti.css";
import { TagProps } from "./Button.types";
import { Boom } from "./Boom";

interface ButtonConfettiProps extends TagProps {
  readonly children?: React.ReactNode;
  readonly onClick?: (
    e: React.MouseEvent<HTMLButtonElement> | undefined,
  ) => void;
  readonly href?: string;
}

export const ButtonConfettiDelight = (props: ButtonConfettiProps) => {
  const delightfulButton = useRef<HTMLButtonElement>(null);
  const [shrink, setShrink] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const delightfulClick = () => {
    setConfetti(false);
    setShrink(true);
    setTimeout(() => {
      setShrink(false);
      setConfetti(true);
      setTimeout(() => {
        setConfetti(false);
      }, 2300);
    }, 150);
  };
  const classes = classnames(props.className, {
    [styles.shrink]: shrink,
  });

  return (
    <div>
      <button
        {...props}
        onClick={delightfulClick}
        type="button"
        ref={delightfulButton}
        className={classes}
      >
        <Boom
          enabled={confetti}
          particles={30}
          boomType="confetti"
          scheme="strongBrand"
        />

        {props.children}
      </button>
    </div>
  );
};
