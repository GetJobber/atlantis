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

export const OutParticle = ({
  enabled,
  scheme,
  boomType,
}: {
  readonly enabled: boolean;
  readonly scheme: string;
  readonly boomType: string;
}) => {
  const confettiProps = () => {
    const xDirection = Math.random() * 200;
    const yDirection = Math.random() * 150;
    const xFlip = Math.random() > 0.5 ? -1 : 1;
    const yFlip = Math.random() > 0.5 ? -1 : 1;
    const scale = Math.random() * 20;

    return { xDirection, yDirection, xFlip, yFlip, scale };
  };
  const particleProps = useMemo(() => {
    const colors = schemes[scheme];
    const colorPick = Math.floor(Math.random() * colors?.length);
    const particleID = "id" + Math.floor(Math.random() * 100000);
    const { xDirection, yDirection, xFlip, yFlip, scale } = confettiProps();

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
                            transform: translateX(0px) translateY(0px) scale(0);
                      opacity:0;
                      background-color:${particleProps.color};
                    }
                        1% {
                            opacity:1;
                        }
                        20% {
                            transform: translateX(${
                              particleProps.x / 1.05
                            }px) translateY(${
          particleProps.y / 1.05
        }px) scale(${particleProps.scale - 0.1});
                        }
                        60% {
                            transform: translateX(${
                              particleProps.x
                            }px) translateY(${particleProps.y}px) scale(${
          particleProps.scale
        });
                        }
                        61% {
                          opacity:0;
                        }
                       100% {
                            opacity:0;
                        }
                    }
                `}
      </style>
      <div
        className={classes}
        style={{
          animationDuration: "2.2s",
          animationTimingFunction: "ease-in-out",
          backgroundColor: particleProps.color,
        }}
      ></div>
    </>
  );
};
