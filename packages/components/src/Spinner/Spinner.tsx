import React from "react";
import classnames from "classnames";
import styles from "./Spinner.css";
import arboristGif from "./assets/Jobber_Arborist.gif";
import hvacGif from "./assets/Jobber_PressureGauge.gif";
import workVanGif from "./assets/Jobber_WorkVan.gif";
import landscapingGif from "./assets/Jobber_Bobcat.gif";
import chainsawGif from "./assets/Jobber_Chainsaw.gif";
import plumbingGif from "./assets/Jobber_PipeWrench.gif";
import powerdrillGif from "./assets/Jobber_PowerDrill.gif";
import windowCleaningGif from "./assets/Jobber_WaterLogo.gif";

interface SpinnerProps {
  /**
   * Specifies the size of the spinner
   *
   * @default "base"
   */
  readonly size?: "small" | "base";

  /**
   * Spinner becomes an inline element when true,
   * otherwise it is a block element
   */
  readonly inline?: boolean;

  /**
   * Uses an industry gif instead of the default spinner
   */
  readonly hasDelight?:
    | "arborist"
    | "pressureGauge"
    | "workVanGif"
    | "landscaping"
    | "chainsaw"
    | "plumbing"
    | "powerdrill"
    | "windowCleaning";
}

export function Spinner({ size = "base", inline, hasDelight }: SpinnerProps) {
  let selectedGif;

  switch (hasDelight) {
    case "arborist":
      selectedGif = arboristGif;
      break;
    case "pressureGauge":
      selectedGif = hvacGif;
      break;
    case "workVanGif":
      selectedGif = workVanGif;
      break;
    case "landscaping":
      selectedGif = landscapingGif;
      break;
    case "chainsaw":
      selectedGif = chainsawGif;
      break;
    case "plumbing":
      selectedGif = plumbingGif;
      break;
    case "powerdrill":
      selectedGif = powerdrillGif;
      break;
    case "windowCleaning":
      selectedGif = windowCleaningGif;
      break;
  }

  if (hasDelight) {
    return (
      <img
        src={selectedGif}
        alt="Loading"
        className={styles.industryGif}
        role="alert"
        aria-busy={true}
        aria-label="loading"
      />
    );
  }

  const spinnerStyles = classnames(styles.spinner, {
    [styles.small]: size === "small",
    [styles.inline]: inline,
  });

  return (
    <div
      className={spinnerStyles}
      role="alert"
      aria-busy={true}
      aria-label="loading"
    />
  );
}
