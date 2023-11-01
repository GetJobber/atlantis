import React, { useMemo } from "react";
import classnames from "classnames";
import styles from "./Particle.css";

const schemes: Record<string, string[]> = {
  all: [
    `var(--color-brand)`,
    `var(--color-indigo)`,
    `var(--color-blue)`,
    `var(--color-yellow)`,
    `var(--color-red)`,
    `var(--color-lightBlue)`,
    `var(--color-pink)`,
    `var(--color-teal)`,
    `var(--color-orange)`,
  ],
  strongBrand: [
    `var(--color-brand)`,
    `var(--color-indigo)`,
    `var(--color-blue)`,
  ],
  redIsh: [`var(--color-orange)`, `var(--color-yellow)`, `var(--color-red)`],
};

export const Particle = ({
  enabled,
  scheme,
  boomType,
}: {
  readonly enabled: boolean;
  readonly scheme: string;
  readonly boomType: string;
}) => {
  const fireworkProps = () => {
    const xDirection = Math.random() * 250;
    const yDirection = Math.random() * 250 + 75;
    const xFlip = Math.random() > 0.5 ? -1 : 1;
    const yFlip = 1;

    return { xDirection, yDirection, xFlip, yFlip, scale: 1 };
  };

  const confettiProps = () => {
    const xDirection = Math.random() * 150;
    const yDirection = Math.random() * 100;
    const xFlip = Math.random() > 0.5 ? -1 : 1;
    const yFlip = Math.random() > 0.5 ? -1 : 1;
    const scale = Math.random() * 10;

    return { xDirection, yDirection, xFlip, yFlip, scale };
  };
  const particleProps = useMemo(() => {
    const colors = schemes[scheme];
    const colorPick = Math.floor(Math.random() * colors?.length);
    const particleID = "id" + Math.floor(Math.random() * 100000);
    const { xDirection, yDirection, xFlip, yFlip, scale } =
      boomType === "confetti" ? confettiProps() : fireworkProps();

    return {
      x: xDirection * xFlip,
      y: yDirection * (boomType === "confetti" ? yFlip : -1),
      color: colors[colorPick],
      scale,
      id: particleID,
    };
  }, []);
  const classes = classnames(styles.particle, {
    [`cl-${particleProps.id}`]: enabled,
  });

  return (
    <>
      <style>
        {`
            .cl-${particleProps.id} {
                animation: ${particleProps.id};
            }
            @keyframes ${particleProps.id} {
                 0% {
                      transform: translateX(0px) translateY(-5px) translateZ(0px);
                      opacity:0;
                      background-color:${particleProps.color};
                    }
                        1% {
                            opacity:1;
                        }
                        50% {
                            transform: translateZ(${particleProps.x}px) translateY(${particleProps.y}px) scale(${particleProps.scale});
                        }
                        61% {
                            opacity:0;
                        }
                       100% {
                            opacity:0;
                            transform: translate(0,-25px);
                        }
                    }
                `}
      </style>
      <div
        className={classes}
        style={{
          animationDuration: "1.2s",
          opacity: 0,
          backgroundColor: particleProps.color,
        }}
      ></div>
    </>
  );
};
