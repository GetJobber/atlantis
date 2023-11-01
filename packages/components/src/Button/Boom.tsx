import React, { useEffect, useState } from "react";
import { Particle } from "./Particle";
import { OutParticle } from "./OutParticle";

export const Boom = ({
  enabled,
  particles = 50,
  boomType = "firework",
  scheme = "all",
}: {
  readonly enabled: boolean;
  readonly particles: number;
  readonly boomType?: string;
  readonly scheme?: string;
}) => {
  const [particleAmount] = useState(particles);
  const [particlesEnabled, setParticlesEnabled] = useState(false);
  const [loopArray] = useState(Array.from({ length: particleAmount }));
  useEffect(() => {
    if (enabled) {
      requestAnimationFrame(() => {
        setParticlesEnabled(true);
      });
    } else {
      setParticlesEnabled(false);
    }
  }, [enabled]);

  return (
    <>
      {enabled &&
        loopArray.map((_, index) => {
          console.log("BOOMT!", boomType);

          return boomType === "firework" ? (
            <Particle key={index} enabled={particlesEnabled} scheme={scheme} />
          ) : (
            <OutParticle
              key={index}
              enabled={particlesEnabled}
              scheme={scheme}
            />
          );
        })}
    </>
  );
};
